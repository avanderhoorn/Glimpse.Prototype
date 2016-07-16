using Microsoft.AspNet.Http;

namespace Glimpse.Server.Configuration
{
    public interface IAllowClientAccess
    {
        bool AllowUser(HttpContext context);
    }
}