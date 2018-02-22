using System;
using System.Reactive.Concurrency;
using System.Reactive.Linq;
using System.Reactive.Subjects;
using System.Threading;
using Glimpse.Agent.Internal.Messaging;
using Glimpse.Internal;

namespace Glimpse.Agent
{
    public class DefaultAgentBroker : IAgentBroker
    {
        private static int _ordinal = 0;
        private readonly IMessageConverter _messageConverter;
        private readonly IMessagePublisher _messagePublisher;
        private readonly ISubject<AgentBrokerPayload> _onSenderThreadSubject;
        private readonly ISubject<AgentBrokerPayload> _offSenderThreadSubject;
        private readonly ISubject<AgentBrokerPayload> _offSenderThreadInternalSubject;
        private readonly ISubject<AgentBrokerPayload> _publisherInternalSubject;
        private readonly IContextData<MessageContext> _context; 
        private static readonly MessageContext ApplicationMessageContext = new MessageContext { Id = Guid.NewGuid(), Type = "Application" };

        public DefaultAgentBroker(IMessagePublisher messagePublisher, IMessageConverter messageConverter, IContextData<MessageContext> context)
        {
            _messagePublisher = messagePublisher;
            _messageConverter = messageConverter;
            _context = context;

            _onSenderThreadSubject = new Subject<AgentBrokerPayload>();
            _offSenderThreadSubject = new Subject<AgentBrokerPayload>();
            _offSenderThreadInternalSubject = new Subject<AgentBrokerPayload>();
            _publisherInternalSubject = new Subject<AgentBrokerPayload>();

            OnSenderThread = new AgentBrokerObservations(_onSenderThreadSubject);
            OffSenderThread = new AgentBrokerObservations(_offSenderThreadSubject);

            // ensure off-request data is observed onto a different thread
            _offSenderThreadInternalSubject.Subscribe(payload => Observable.Start(() => _offSenderThreadSubject.OnNext(payload), TaskPoolScheduler.Default));
            _publisherInternalSubject.Subscribe(x => Observable.Start(() => PublishMessage(x), TaskPoolScheduler.Default));
        }

        /// <summary>
        /// On the sender thread and is blocking
        /// </summary>
        public AgentBrokerObservations OnSenderThread { get; }

        /// <summary>
        /// Off the sender thread and is not blocking
        /// </summary>
        public AgentBrokerObservations OffSenderThread { get; }
        
        public void SendMessage(object payload)
        {
            // need to fetch context data here as we are about to start switching threads
            var data = new AgentBrokerPayload
            {
                Payload = payload,
                Context = _context.Value,
                Ordinal = Interlocked.Increment(ref _ordinal),
                Offset = this.GetOffset() // TODO: this is a hack and i don't like it
            };
            
            // non-blocking
            _publisherInternalSubject.OnNext(data);

            // non-blocking
            _offSenderThreadInternalSubject.OnNext(data);

            // blocking
            _onSenderThreadSubject.OnNext(data);
        }

        private void PublishMessage(AgentBrokerPayload data)
        {
            var context = data.Context ?? ApplicationMessageContext;
            var message = _messageConverter.ConvertMessage(data.Payload, context, data.Ordinal, data.Offset);

            _messagePublisher.PublishMessage(message); // TODO: Hook into offThread
        }
    }
}
