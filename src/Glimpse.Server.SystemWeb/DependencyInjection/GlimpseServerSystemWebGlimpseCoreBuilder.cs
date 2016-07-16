using System;
using Glimpse.DependencyInjection;
using Glimpse.Server;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class GlimpseServerSystemWebGlimpseCoreBuilder
    {
        public static IGlimpseCoreBuilder RunningServerWeb(this IGlimpseCoreBuilder builder)
        {
            return builder.RunningServerWeb(null);
        }

        public static IGlimpseCoreBuilder RunningServerWeb(this IGlimpseCoreBuilder builder, Action<GlimpseServerOptions> setupAction)
        {
            // TODO: switch over to static internal 
            var serverServices = new ServerRegisterServices();
            serverServices.RegisterServices(builder.Services);

            // TODO: switch over to static internal
            var serverSystemWebServices = new ServerSystemWebRegisterServices();
            serverSystemWebServices.RegisterServices(builder.Services);

            if (setupAction != null)
            {
                builder.Services.Configure(setupAction);
            }

            return builder;
        }
    }
}