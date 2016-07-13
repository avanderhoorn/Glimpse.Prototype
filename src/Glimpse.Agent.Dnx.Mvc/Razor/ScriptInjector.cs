using System;
using Glimpse.Common;
using Glimpse.Configuration;
using Glimpse.Initialization;
using Glimpse.Platform;
using Microsoft.AspNet.Razor.TagHelpers;

namespace Glimpse.Agent.Razor
{
    [HtmlTargetElement("body")]
    public class ScriptInjector : TagHelper
    {
        private readonly Guid _requestId;
        private readonly ResourceOptions _resourceOptions;

        public ScriptInjector(IGlimpseContextAccessor context, IResourceOptionsProvider resourceOptionsProvider)
        {
            _requestId = context.RequestId;
            _resourceOptions = resourceOptionsProvider.BuildInstance();
        }

        public override int Order => int.MaxValue;

        public override void Process(TagHelperContext context, TagHelperOutput output)
        {
            output.PostContent.AppendHtml(
                $@"<script src=""{_resourceOptions.HudScriptTemplate}"" id=""__glimpse_hud"" data-request-id=""{_requestId.ToString("N")}"" data-client-template=""{_resourceOptions.ClientScriptTemplate}"" data-context-template=""{_resourceOptions.ContextTemplate}"" data-metadata-template=""{_resourceOptions.MetadataTemplate}"" async></script>
                   <script src=""{_resourceOptions.BrowserAgentScriptTemplate}"" id=""__glimpse_browser_agent"" data-request-id=""{_requestId.ToString("N")}"" data-message-ingress-template=""{_resourceOptions.MessageIngressTemplate}"" async></script>");
        }
    }
}
