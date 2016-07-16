using System.Collections.Generic;

namespace Glimpse.Agent.Internal.Inspectors.Mvc.Proxies
{
    public interface IViewComponentContext
    {
        IViewComponentDescriptor ViewComponentDescriptor { get; }

        IDictionary<string, object> Arguments { get; }
    }
}