using Glimpse.Agent.Inspectors;
using Glimpse.Initialization;
using Microsoft.Extensions.DependencyInjection;

namespace Glimpse.DependencyInjection
{
    public class AgentSystemWebRegisterServices : IRegisterServices
    {
        public void RegisterServices(IServiceCollection services)
        {
            //
            // Common
            //
            services.AddSingleton<IInspectorRuntimeManager, InspectorRuntimeManager>();
        }
    }
}
