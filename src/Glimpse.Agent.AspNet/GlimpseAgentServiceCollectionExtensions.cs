using Microsoft.Extensions.DependencyInjection;
using System;
using Glimpse.Agent;

namespace Glimpse
{
    public static class GlimpseAgentServiceCollectionExtensions
    {
        public static GlimpseAgentServiceCollectionBuilder RunningAgentWeb(this GlimpseServiceCollectionBuilder services)
        {
            return services.RunningAgentWeb(null);
        }
         
        public static GlimpseAgentServiceCollectionBuilder RunningAgentWeb(this GlimpseServiceCollectionBuilder services, Action<GlimpseAgentOptions> setupAction)
        {
            if (setupAction != null)
            {
                services.Configure(setupAction);
            }

            return new GlimpseAgentServiceCollectionBuilder(services);
        }
    }
}