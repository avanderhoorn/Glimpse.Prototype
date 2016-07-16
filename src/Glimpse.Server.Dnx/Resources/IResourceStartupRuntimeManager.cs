using Microsoft.AspNet.Builder;

namespace Glimpse.Server.Resources
{
    public interface IResourceStartupRuntimeManager
    {
        void Setup(IApplicationBuilder app);
    }
}