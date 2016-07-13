using System;
using System.Linq;
using System.Reactive.Linq;

namespace Glimpse.Server
{
    public class ServerBrokerObservations
    {
        private readonly IObservable<IMessage> _observable;

        public ServerBrokerObservations(IObservable<IMessage> observable)
        {
            _observable = observable;
        }

        public IObservable<IMessage> Listen(string type)
        {
            return _observable.Where(opts => opts.Types.Contains(type));
        }

        public IObservable<IMessage> ListenAll()
        {
            return _observable;
        }
    }
}