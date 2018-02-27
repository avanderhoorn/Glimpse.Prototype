using System.Collections.Generic;
using Microsoft.Extensions.DiagnosticAdapter.Internal;

namespace Glimpse.Agent.Internal.Inspectors.Mvc.Proxies
{
    public class ProxyAdapter
    {
        private static readonly ProxyFactory Factory = new ProxyFactory();

        private HashSet<string> Listener { get; } = new HashSet<string>();

        public void Register(string typeName)
        {
            Listener.Add(typeName);
        }

        public T Process<T>(string typeName, object target)
        {
            if (!Listener.Contains(typeName))
            {
                return default(T);
            }

            return Factory.CreateProxy<T>(target);
        }
    }
}