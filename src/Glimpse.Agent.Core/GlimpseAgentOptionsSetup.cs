using Glimpse.Agent.Configuration;
using Microsoft.Extensions.Options;

namespace Glimpse.Agent
{
    public class GlimpseAgentOptionsSetup : ConfigureOptions<GlimpseAgentOptions>
    {
        public GlimpseAgentOptionsSetup() : base(ConfigureGlimpseAgentWebOptions)
        {
        }

        public static void ConfigureGlimpseAgentWebOptions(GlimpseAgentOptions options)
        {
            // Set up IgnoredUris
            options.IgnoredUris.AddCompiled("^/__browserLink/requestData");
            options.IgnoredUris.AddCompiled("^/Glimpse"); // TODO: Need to make sure this honor overridden basePath's
            options.IgnoredUris.AddCompiled("^/favicon.ico");
        }
    }
}