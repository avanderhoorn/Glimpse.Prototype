using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Glimpse.Server.Resources;
using Microsoft.AspNet.Http;

namespace Glimpse.Server.Internal
{
    public interface IResourceManager
    {
        void Register(string name, string uriTemplate);

        void Register(string name, string uriTemplate, ResourceType type, Func<HttpContext, IDictionary<string, string>, Task> resource);

        ResourceManagerResult Match(HttpContext context);

        IReadOnlyDictionary<string, string> RegisteredUris { get; }
    }
}