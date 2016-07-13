using System;
using Glimpse.Agent;
using Glimpse.DependencyInjection;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class GlimpseAgentSystemWebGlimpseCoreBuilder
    {
        public static IGlimpseCoreBuilder RunningAgentWeb(this IGlimpseCoreBuilder builder)
        {
            return builder.RunningAgentWeb(null);
        }
         
        public static IGlimpseCoreBuilder RunningAgentWeb(this IGlimpseCoreBuilder builder, Action<GlimpseAgentOptions> setupAction)
        {
            // TODO: switch over to static internal 
            var agentServices = new AgentRegisterServices();
            agentServices.RegisterServices(builder.Services);

            // TODO: switch over to static internal
            var agentSystemWebServices = new AgentSystemWebRegisterServices();
            agentSystemWebServices.RegisterServices(builder.Services);

            if (setupAction != null)
            {
                builder.Services.Configure(setupAction);
            }

            return builder;
        }
    }
}