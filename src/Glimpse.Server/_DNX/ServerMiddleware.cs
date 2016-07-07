#if DNX
using Glimpse.Common.Initialization;
using Microsoft.AspNet.Builder;

namespace Glimpse.Server
{
    public class ServerMiddleware : IRegisterMiddleware
    {
        public void RegisterMiddleware(IApplicationBuilder appBuilder)
        {
            appBuilder.UseMiddleware<GlimpseServerMiddleware>(appBuilder);
        }
    }
}
#endif