using Microsoft.AspNet.Http;

namespace Glimpse.Agent.Configuration
{
    public interface IRequestIgnorerManager
    {
        bool ShouldIgnore();

        bool ShouldIgnore(HttpContext context);
    }
}
