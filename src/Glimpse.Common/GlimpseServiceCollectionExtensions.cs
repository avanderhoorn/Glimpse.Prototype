using Glimpse.Common.Initialization;
using Glimpse.Initialization;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace Glimpse
{
    public static class GlimpseServiceCollectionExtensions
    {
        public static GlimpseServiceCollectionBuilder AddGlimpse(this IServiceCollection services)
        {
            return services.AddGlimpse(true);
        }

        public static GlimpseServiceCollectionBuilder AddGlimpse(this IServiceCollection services, bool autoRegisterComponents)
        {
            // load in default services
            services.TryAdd(CommonServices.GetDefaultServices());
            
            // run all other service registrations (i.e. agent and server)
            if (autoRegisterComponents)
            {
                var extensionProvider = services.BuildServiceProvider().GetService<IExtensionProvider<IRegisterServices>>();
                foreach (var registration in extensionProvider.Instances)
                {
                    registration.RegisterServices(services);
                }
            }

            return new GlimpseServiceCollectionBuilder(services);
        } 
    }
}