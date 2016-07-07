using System.Collections.Generic;
using Glimpse.Common;
using Glimpse.Common.Initialization;
using Glimpse.Common.Internal.Serialization;
using Glimpse.Initialization;
using Microsoft.Extensions.DependencyInjection;
using Glimpse.Internal;
using Newtonsoft.Json;

namespace Glimpse
{
    public class CommonServices
    {
        public static IEnumerable<ServiceDescriptor> GetDefaultServices()
        {
            var services = new ServiceCollection();

            //
            // Discovery & Reflection.
            //
            // TODO: consider making above singleton 
            services.AddTransient<IAssemblyProvider, DefaultAssemblyProvider>();
            services.AddTransient<ITypeActivator, DefaultTypeActivator>();
            services.AddTransient<ITypeSelector, DefaultTypeSelector>();
            services.AddTransient<ITypeService, DefaultTypeService>();

            //
            // Extensions
            //
            services.AddSingleton<IExtensionProvider<IRegisterServices>, DefaultExtensionProvider<IRegisterServices>>();
#if DNX
            services.AddSingleton<IExtensionProvider<IRegisterMiddleware>, DefaultExtensionProvider<IRegisterMiddleware>>();
#endif

            //
            // Context.
            //
            services.AddSingleton(typeof(IContextData<>), typeof(ContextData<>)); 
            services.AddSingleton<IGlimpseContextAccessor, DefaultGlimpseContextAccessor>(); 

            //
            // JSON.Net.
            //
            services.AddTransient<JsonSerializer, JsonSerializer>();
            services.AddSingleton<IJsonSerializerProvider, DefaultJsonSerializerProvider>();

            return services;
        }
    }
}