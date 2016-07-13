using Glimpse.Agent;
using Microsoft.AspNet.Http;

namespace Glimpse.AgentServer.Dnx.Mvc.Sample.Framework
{
    // TODO: Delete me. This tab isn't intended to stick around, it's just a sample of a Tab.
    public class HeadersTab : Tab
    {
        public override string Name => "Headers";

        public override object GetData(HttpContext context)
        {
            return new
            {
                Request = context.Request.Headers,
                Response = context.Response.Headers
            };
        }
    }
}
