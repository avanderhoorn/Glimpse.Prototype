#if DNX
using Glimpse.Common.Initialization;
using Glimpse.Initialization;
using Microsoft.AspNet.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace Glimpse
{
    public static class ApplicationBuilderExtensions
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
#endif