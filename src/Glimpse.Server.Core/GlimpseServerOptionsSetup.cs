using Microsoft.Extensions.Options;

namespace Glimpse.Server
{
    public class GlimpseServerOptionsSetup : ConfigureOptions<GlimpseServerOptions>
    {
        public GlimpseServerOptionsSetup() : base(ConfigureGlimpseServerWebOptions)
        {
        }

        public static void ConfigureGlimpseServerWebOptions(GlimpseServerOptions options)
        {
            options.AllowRemote = true;  // Temp workaround for kestrel not implementing IHttpConnectionFeature
            options.BasePath = "glimpse";
            options.OverrideResources = _ => { };
        }
    }
}