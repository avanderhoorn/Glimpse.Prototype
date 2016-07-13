using System;
using System.Collections.Generic;
using Microsoft.Extensions.DiagnosticAdapter.Internal;

namespace Glimpse.Agent.Internal.Inspectors.Mvc.Proxies
{
    public class ProxyAdapter
    {
        private static readonly ProxyTypeCache _cache = new ProxyTypeCache();

        public ProxyAdapter()
        {
            Listener = new Dictionary<string, Subscription>();
        }

        private IDictionary<string, Subscription> Listener { get; }

        public void Register(string typeName)
        {
            var subscription = new Subscription();

            Listener.Add(typeName, subscription);
        }

        public T Process<T>(string typeName, object target)
        {
            Subscription subscription;
            if (!Listener.TryGetValue(typeName, out subscription))
            {
                return default(T);
            }

            if (subscription.ProxiedType == null)
            {
                lock (subscription)
                {
                    if (subscription.ProxiedType == null)
                    {
                        var proxiedType = ProxyTypeEmitter.GetProxyType(_cache, typeof(T), target.GetType());

                        subscription.ProxiedType = proxiedType;
                    }
                }
            }

            var instance = (T)Activator.CreateInstance(subscription.ProxiedType, target);

            return instance;
        }

        private class Subscription
        {
            public Type ProxiedType { get; set; }
        }
    }
}