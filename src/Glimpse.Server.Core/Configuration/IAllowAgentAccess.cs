using Microsoft.AspNet.Http;

namespace Glimpse.Server.Configuration
{
    public interface IAllowAgentAccess
    {
        bool AllowAgent(HttpContext context);
    }
}
