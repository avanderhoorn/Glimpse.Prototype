using System.Collections.Generic;
using Microsoft.AspNetCore.Http;

namespace Glimpse.Agent.Internal.Inspectors.Mvc.Proxies
{
    public interface IViewContext
    {
        object ActionDescriptor { get; }
        HttpContext HttpContext { get; }
        IRouteData RouteData { get; }
        IDictionary<string, object> TempData { get; }
        IDictionary<string, object> ViewData { get; }
    }
}
