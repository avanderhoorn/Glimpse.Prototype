using System;
using System.Reactive.Linq;
using System.Reflection;

namespace Glimpse.Agent
{
    public class AgentBrokerObservations
    {
        private readonly IObservable<AgentBrokerPayload> _observable;

        public AgentBrokerObservations(IObservable<AgentBrokerPayload> observable)
        {
            _observable = observable;
        }

        public IObservable<AgentBrokerPayload> Listen<T>()
        {
            return _observable.Where(opts => typeof(T).GetTypeInfo().IsAssignableFrom(opts.Payload.GetType().GetTypeInfo()));
        }

        public IObservable<AgentBrokerPayload> ListenAll()
        {
            return _observable;
        }
    }
}