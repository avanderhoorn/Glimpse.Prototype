using System.IO;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Options;
using Glimpse.Agent;
using Glimpse.Agent.Configuration;
using Glimpse.Agent.Inspectors;
using Glimpse.Initialization;
using System.Linq;
using Glimpse.Agent.Messaging;
using Glimpse.Configuration;
using Glimpse.Platform;

namespace Glimpse.DependencyInjection
{
    public class AgentRegisterServices : IRegisterServices
    {
        public void RegisterServices(IServiceCollection services)
        {
            services.AddOptions();

            RegisterPublisher(services);

            //
            // Broker
            //
            services.AddSingleton<IAgentBroker, DefaultAgentBroker>();

            //
            // Options
            //
            services.AddTransient<IConfigureOptions<GlimpseAgentOptions>, GlimpseAgentOptionsSetup>();
            services.AddSingleton<IRequestIgnorerUriProvider, DefaultRequestIgnorerUriProvider>();
            services.AddSingleton<IRequestIgnorerStatusCodeProvider, DefaultRequestIgnorerStatusCodeProvider>();
            services.AddSingleton<IRequestIgnorerContentTypeProvider, DefaultRequestIgnorerContentTypeProvider>();
            services.AddSingleton<IExtensionProvider<IRequestIgnorer>, DefaultExtensionProvider<IRequestIgnorer>>();
            services.AddSingleton<IExtensionProvider<IInspector>, DefaultExtensionProvider<IInspector>>();
            services.AddSingleton<IExtensionProvider<IAgentStartup>, DefaultExtensionProvider<IAgentStartup>>();

            //
            // Messages.
            //
            services.AddSingleton<IMessageConverter, DefaultMessageConverter>();
            services.AddTransient<IMessagePayloadFormatter, DefaultMessagePayloadFormatter>();
            services.AddTransient<IMessageIndexProcessor, DefaultMessageIndexProcessor>();
            services.AddTransient<IMessageTypeProcessor, DefaultMessageTypeProcessor>();

            //
            // Common
            //
            services.AddTransient<IAgentStartupManager, DefaultAgentStartupManager>();
            services.AddTransient<IRequestIgnorerManager, DefaultRequestIgnorerManager>();
            services.TryAddSingleton<IResourceOptionsProvider, OptionsResourceOptionsProvider>();
        }
        
        private void RegisterPublisher(IServiceCollection services)
        {
            var configurationBuilder = new ConfigurationBuilder();
            var path = Path.Combine(configurationBuilder.GetBasePath(), "glimpse.json");

            if (File.Exists(path))
            {
                var configuration = configurationBuilder.AddJsonFile("glimpse.json").Build();
                var section = configuration.GetSection("resources");
                services.Configure<ResourceOptions>(section);

                services.Replace(new ServiceDescriptor(typeof(IMessagePublisher), typeof(HttpMessagePublisher), ServiceLifetime.Transient));
            }

            // TODO: If I reach this line, than Glimpse has no way to send data from point A to B. Should we blow up?
        }
    }
}