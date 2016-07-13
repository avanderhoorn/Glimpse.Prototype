using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Glimpse.Server.Resources;
using Microsoft.AspNet.Http;

namespace Glimpse.Server.Internal
{
    public class ResourceManagerResult
    {
        public ResourceManagerResult(IDictionary<string, string> paramaters, Func<HttpContext, IDictionary<string, string>, Task> resource, ResourceType type)
        {
            Paramaters = paramaters;
            Resource = resource;
            Type = type;
        }

        public IDictionary<string, string> Paramaters { get; }

        public Func<HttpContext, IDictionary<string, string>, Task> Resource { get; }

        public ResourceType Type { get; }
    }
}