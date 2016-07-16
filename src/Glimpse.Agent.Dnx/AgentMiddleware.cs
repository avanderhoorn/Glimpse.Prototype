using Glimpse.Common.Initialization;
using Glimpse.Initialization;
using Microsoft.AspNet.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace Glimpse.Agent
{
    public class AgentMiddleware : IRegisterMiddleware
    {
        public void RegisterMiddleware(IApplicationBuilder appBuilder)
        {
            var manager = appBuilder.ApplicationServices.GetRequiredService<IAgentStartupManager>();
            manager.Run(new StartupOptions(appBuilder.ApplicationServices));

            appBuilder.UseMiddleware<GlimpseAgentMiddleware>(appBuilder);
        }
    }
}