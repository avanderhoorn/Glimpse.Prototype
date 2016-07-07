#if DNX
using Microsoft.AspNet.Http;

namespace Glimpse.Agent.Internal.Inspectors.Mvc.Proxies
{
    public interface IActionContext
    {
        object ActionDescriptor { get; }
        HttpContext HttpContext { get; }
        IRouteData RouteData { get; }
    }
}
#endif