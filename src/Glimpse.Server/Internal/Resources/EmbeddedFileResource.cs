 // ReSharper disable RedundantUsingDirective
using System;
// ReSharper restore RedundantUsingDirective
using System.Collections.Generic;
using System.Reflection;
using Glimpse.Server.Resources;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.FileProviders;

namespace Glimpse.Server.Internal.Resources
{
    public abstract class EmbeddedFileResource : IResourceStartup
    {
        public void Configure(IResourceBuilder resourceBuilder)
        {
            var appBuilder = resourceBuilder.AppBuilder;

            appBuilder.ModifyResponseWith(response => response.EnableCaching());

            appBuilder.ModifyResponseWith(res => res.EnableCors());

            appBuilder.UseFileServer(new FileServerOptions
            {
                RequestPath = "",
                EnableDefaultFiles = true,
                FileProvider =
                    new EmbeddedFileProvider(typeof (EmbeddedFileResource).GetTypeInfo().Assembly, BaseNamespace)
            });

            foreach (var registration in Register)
            {
                resourceBuilder.RegisterResource(registration.Key, registration.Value);
            }
        }

        public abstract ResourceType Type { get; }

        public abstract string BaseNamespace { get; }

        public abstract IDictionary<string, string> Register { get; }
    }

    public class ClientEmbeddedFileResource : EmbeddedFileResource
    {
        public override ResourceType Type => ResourceType.Client;

        public override string BaseNamespace => "Glimpse.Server.Internal.Resources.Embeded.Client";

        public override IDictionary<string, string> Register => new Dictionary<string, string>
        {
            { "client", "index.html?hash={hash}{&requestId,follow,metadataUri}"},
            { "hud", "hud.js?hash={hash}" }
        };
    }

    public class AgentEmbeddedFileResource : EmbeddedFileResource
    {
        public override ResourceType Type => ResourceType.Agent;

        public override string BaseNamespace => "Glimpse.Server.Internal.Resources.Embeded.Agent";

        public override IDictionary<string, string> Register => new Dictionary<string, string>
        {
            { "agent", "agent.js?hash={hash}"}
        };
    }
}