using System.Collections.Generic;
using Glimpse.Initialization;
using Glimpse.Internal.Extensions;
using Glimpse.Server.Internal.Extensions;
using Tavis.UriTemplates;

namespace Glimpse.Server.Configuration
{
    public class DefaultResourceOptionsProvider : IResourceOptionsProvider
    {
        private readonly IMetadataProvider _metadataProvider;

        public DefaultResourceOptionsProvider(IMetadataProvider metadataProvider)
        {
            _metadataProvider = metadataProvider;
        }

        public ResourceOptions BuildInstance()
        {
            var metadata = _metadataProvider.BuildInstance();
            var resources = metadata.Resources;
            var supportedParameters = new Dictionary<string, object>{ {"hash", metadata.Hash} };

            var browserAgentScriptTemplate = new UriTemplate(resources.GetValueOrDefault("agent", string.Empty), true);
            var httpMessageTemplate = new UriTemplate(resources.GetValueOrDefault("message-ingress", string.Empty), true);
            var hudScriptTemplate = new UriTemplate(resources.GetValueOrDefault("hud", string.Empty), true);
            var contextTemplate = new UriTemplate(resources.GetValueOrDefault("context", string.Empty), true);
            var contextSummaryTemplate = new UriTemplate(resources.GetValueOrDefault("context-summary", string.Empty), true);
            var metadataTemplate = new UriTemplate(resources.GetValueOrDefault("metadata", string.Empty), true);
            var clientScriptTemplate = new UriTemplate(resources.GetValueOrDefault("client", string.Empty), true);

            return new ResourceOptions
            {
                BrowserAgentScriptTemplate = browserAgentScriptTemplate.ResolveWith(supportedParameters),
                MessageIngressTemplate = httpMessageTemplate.ResolveWith(supportedParameters),
                HudScriptTemplate = hudScriptTemplate.ResolveWith(supportedParameters),
                ContextTemplate = contextTemplate.ResolveWith(supportedParameters),
                ContextSummaryTemplate = contextSummaryTemplate.ResolveWith(supportedParameters),
                MetadataTemplate = metadataTemplate.ResolveWith(supportedParameters),
                ClientScriptTemplate = clientScriptTemplate.ResolveWith(supportedParameters)
            };
        }
    }
}
