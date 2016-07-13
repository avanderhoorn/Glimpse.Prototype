using Glimpse.Common.Initialization;
using Glimpse.Initialization;
using Glimpse.Platform;
using Microsoft.AspNet.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace Microsoft.AspNet.Builder
{
    public static class GlimpseApplicationBuilderExtensions
    {
        public static IApplicationBuilder UseGlimpse(this IApplicationBuilder appBuilder)
        {
            var middlewareRegistrations = appBuilder.ApplicationServices.GetService<IExtensionProvider<IRegisterMiddleware>>();

            foreach (var instance in middlewareRegistrations.Instances)
            {
                instance.RegisterMiddleware(appBuilder);
            }

            return appBuilder;
        }
    }
}