using System.Linq;
using Glimpse.Configuration;
using Glimpse.Initialization;
using Glimpse.Server;
using Glimpse.Server.Configuration;
using Glimpse.Server.Internal;
using Glimpse.Server.Resources;
using Glimpse.Server.Storage;
using Glimpse.Platform;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Options;

namespace Glimpse.DependencyInjection
{
    public class ServerRegisterServices : IRegisterServices
    {
        public void RegisterServices(IServiceCollection services)
        {
            services.AddOptions();

            //
            // Common
            //
            services.AddSingleton<IServerBroker, DefaultServerBroker>();
            services.AddSingleton<IStorage, InMemoryStorage>();
            services.AddSingleton<IResourceManager, ResourceManager>();
            services.TryAddSingleton<IMessagePublisher, InProcessPublisher>();
            services.AddSingleton<IResourceAuthorization, ResourceAuthorization>();
            services.AddSingleton<IResourceRuntimeManager, ResourceRuntimeManager>();
            
            //
            // Options
            //
            services.AddTransient<IConfigureOptions<GlimpseServerOptions>, GlimpseServerOptionsSetup>();
            services.AddTransient<IExtensionProvider<IAllowClientAccess>, DefaultExtensionProvider<IAllowClientAccess>>();
            services.AddTransient<IExtensionProvider<IAllowAgentAccess>, DefaultExtensionProvider<IAllowAgentAccess>>();
            services.AddTransient<IExtensionProvider<IResource>, DefaultExtensionProvider<IResource>>();
            services.AddSingleton<IAllowRemoteProvider, DefaultAllowRemoteProvider>();
            services.AddSingleton<IMetadataProvider, DefaultMetadataProvider>();
            
            // this is done as we don't know the order in which things will be defined
            if (services.Any(s => s.ServiceType == typeof(IResourceOptionsProvider)))
            {
                services.Replace(new ServiceDescriptor(typeof(IResourceOptionsProvider), typeof(DefaultResourceOptionsProvider), ServiceLifetime.Singleton));
            }
            else
            {
                services.AddSingleton<IResourceOptionsProvider, DefaultResourceOptionsProvider>();
            }
        }
    }
}