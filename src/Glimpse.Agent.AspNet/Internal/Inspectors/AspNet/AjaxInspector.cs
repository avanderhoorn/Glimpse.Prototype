using Glimpse.Agent.Inspectors;
using Glimpse.Common;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Primitives;

namespace Glimpse.Agent.AspNet.Internal.Inspectors.AspNet
{
    public class AjaxInspector : Inspector
    {
        private readonly IGlimpseContextAccessor _context;

        public AjaxInspector(IGlimpseContextAccessor context)
        {
            _context = context;
        }

        public override void Before(HttpContext context)
        {
            var isAjax = StringValues.Empty;
            if (context.Request.Headers.TryGetValue("__glimpse-isAjax", out isAjax) && isAjax == "true")
            {
                context.Response.Headers.Add("__glimpse-id", _context.RequestId.ToString("N"));
            }
        }
    }
}
