using System;
using System.Reactive.Concurrency;
using System.Reactive.Linq;
using System.Reactive.Subjects;
using Glimpse.Server.Storage;

namespace Glimpse.Server
{
    public class DefaultServerBroker : IServerBroker
    {
        private readonly ISubject<IMessage> _offRecieverThreadSubject;
        private readonly ISubject<IMessage> _offRecieverThreadInternalSubject;
        private readonly IStorage _storage;
        
        public DefaultServerBroker(IStorage storage)
        {
            _storage = storage;

            _offRecieverThreadSubject = new Subject<IMessage>();
            _offRecieverThreadInternalSubject = new Subject<IMessage>();

            OffRecieverThread = new ServerBrokerObservations(_offRecieverThreadSubject);

            // ensure off-request data is observed onto a different thread
            _offRecieverThreadInternalSubject.Subscribe(payload => Observable.Start(() => _offRecieverThreadSubject.OnNext(payload), TaskPoolScheduler.Default));
        }

        /// <summary>
        /// Off the reciever thread and is not blocking
        /// </summary>
        public ServerBrokerObservations OffRecieverThread { get; }
        
        public void SendMessage(IMessage message)
        {
            // non-blocking
            _offRecieverThreadInternalSubject.OnNext(message);

            // TODO: This could probably be altered to be a listener of OffRecieverThread
            // blocking
            _storage.Persist(message); 
        }
    }
}