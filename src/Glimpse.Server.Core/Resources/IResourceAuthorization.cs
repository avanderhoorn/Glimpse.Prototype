using Microsoft.AspNet.Http;

namespace Glimpse.Server.Resources
{
    public interface IResourceAuthorization
    {
        bool CanExecute(HttpContext context, ResourceType type);
    }
}