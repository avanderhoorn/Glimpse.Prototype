using Glimpse;
using Glimpse.Initialization;
using Glimpse.Internal;
using Glimpse.Internal.Serialization;
using Glimpse.Platform;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Newtonsoft.Json;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class GlimpseCoreServiceCollectionExtensions
    {
        public static IGlimpseCoreBuilder AddGlimpseCore(this IServiceCollection services)
        {
            return services.AddGlimpseCore(true);
        }

        public static IGlimpseCoreBuilder AddGlimpseCore(this IServiceCollection services, bool autoRegisterComponents)
        {
            //
            // Platform
            //
            services.AddTransient<ITypeActivator, DefaultTypeActivator>();
            services.AddTransient<ITypeSelector, DefaultTypeSelector>();
            services.AddTransient<ITypeService, DefaultTypeService>();
            services.AddSingleton<IExtensionProvider<IRegisterServices>, DefaultExtensionProvider<IRegisterServices>>();
            services.AddSingleton(typeof(IContextData<>), typeof(ContextData<>));
            services.AddSingleton<IGlimpseContextAccessor, DefaultGlimpseContextAccessor>();

            //
            // Internal
            //
            services.AddTransient<JsonSerializer, JsonSerializer>();
            services.AddSingleton<IJsonSerializerProvider, DefaultJsonSerializerProvider>();

            //
            // Dynamic
            //
            if (autoRegisterComponents)
            {
                // run all other service registrations (i.e. agent and server)
                var extensionProvider = services.BuildServiceProvider().GetService<IExtensionProvider<IRegisterServices>>();
                foreach (var registration in extensionProvider.Instances)
                {
                    registration.RegisterServices(services);
                }
            }

            return new GlimpseBuilder(services);
        } 
    }
}