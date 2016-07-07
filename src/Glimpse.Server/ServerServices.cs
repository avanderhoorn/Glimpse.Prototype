using System.Linq;
using Glimpse.Common.Initialization;
using Glimpse.Initialization;
using Glimpse.Server;
using Glimpse.Server.Configuration;
using Glimpse.Server.Internal;
using Glimpse.Server.Resources;
using Glimpse.Server.Storage;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.OptionsModel;

namespace Glimpse
{
    public class ServerServices : IRegisterServices
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

            //
            // Options
            //
            services.AddTransient<IConfigureOptions<GlimpseServerOptions>, GlimpseServerOptionsSetup>();
            services.AddTransient<IExtensionProvider<IAllowClientAccess>, DefaultExtensionProvider<IAllowClientAccess>>();
            services.AddTransient<IExtensionProvider<IAllowAgentAccess>, DefaultExtensionProvider<IAllowAgentAccess>>();
            services.AddTransient<IExtensionProvider<IResource>, DefaultExtensionProvider<IResource>>();
            services.AddTransient<IExtensionProvider<IResourceStartup>, DefaultExtensionProvider<IResourceStartup>>();
            services.AddSingleton<IAllowRemoteProvider, DefaultAllowRemoteProvider>();
            services.AddSingleton<IMetadataProvider, DefaultMetadataProvider>();

            // TODO: switch to TryAdd
            if (!services.Any(s => s.ServiceType == typeof (IMessagePublisher)))
            {
                services.AddSingleton<IMessagePublisher, InProcessPublisher>();
            }

            // TODO: switch to TryAdd
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