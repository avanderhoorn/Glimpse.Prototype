using Glimpse.Agent.Inspectors;
using Glimpse.Agent.Internal.Inspectors;
using Glimpse.Common.Initialization;
using Glimpse.Initialization;
using Glimpse.Platform;
using Microsoft.Extensions.DependencyInjection;

namespace Glimpse.DependencyInjection
{
    public class AgentDnxRegisterServices : IRegisterServices
    {
        public void RegisterServices(IServiceCollection services)
        {
            //
            // Common
            //
            services.AddTransient<IInspectorFunctionManager, DefaultInspectorFunctionManager>();
            services.AddTransient<WebDiagnosticsInspector>();
            // TODO: make work outside of DNX
            services.AddTransient<IExceptionProcessor, ExceptionProcessor>();
            
            //
            // Options
            //
            services.AddSingleton<IExtensionProvider<IInspectorFunction>, DefaultExtensionProvider<IInspectorFunction>>();
        }
    }
}
