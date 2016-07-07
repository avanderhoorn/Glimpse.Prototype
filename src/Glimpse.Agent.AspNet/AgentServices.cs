using System.IO;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.OptionsModel;
using Glimpse.Agent;
using Glimpse.Agent.Internal.Messaging;
using Glimpse.Agent.Configuration;
using Glimpse.Agent.Inspectors;
using Glimpse.Common.Initialization;
using Glimpse.Initialization;
using System.Linq;
#if DNX
using Glimpse.Agent.Internal.Inspectors;
#endif

namespace Glimpse
{
    public class AgentServices : IRegisterServices
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
#if DNX
            services.AddSingleton<IExtensionProvider<IInspectorFunction>, DefaultExtensionProvider<IInspectorFunction>>();
#endif

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
#if DNX
            services.AddTransient<IInspectorFunctionManager, DefaultInspectorFunctionManager>();
            // TODO: make work outside of DNX
            services.AddTransient<IExceptionProcessor, ExceptionProcessor>();
            services.AddTransient<WebDiagnosticsInspector>();
#endif

            // TODO: switch to tryadd 
            if (!services.Any(s => s.ServiceType == typeof (IResourceOptionsProvider)))
            {
                services.AddSingleton<IResourceOptionsProvider, OptionsResourceOptionsProvider>();
            }
        }
        
        private void RegisterPublisher(IServiceCollection services)
        {
            var configurationBuilder = new ConfigurationBuilder();
            var path = Path.Combine(configurationBuilder.GetBasePath(), "glimpse.json");

            if (File.Exists(path))
            {
                var configuration = configurationBuilder.AddJsonFile("glimpse.json").Build();
                services.Configure<ResourceOptions>(configuration.GetSection("resources"));

                services.Replace(new ServiceDescriptor(typeof(IMessagePublisher), typeof(HttpMessagePublisher), ServiceLifetime.Transient));
            }

            // TODO: If I reach this line, than Glimpse has no way to send data from point A to B. Should we blow up?
        }
    }
}