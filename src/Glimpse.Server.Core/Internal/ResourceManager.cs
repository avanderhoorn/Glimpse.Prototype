using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading.Tasks;
using Glimpse.Server.Resources;
using Microsoft.AspNet.Http;
using Glimpse.Internal.Extensions;
using Tavis.UriTemplates;

namespace Glimpse.Server.Internal
{
    public class ResourceManager : IResourceManager
    {
        private IDictionary<string, string> _templateTable = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);
        private IDictionary<string, ResourceManagerItem> _resourceTable = new Dictionary<string, ResourceManagerItem>(StringComparer.OrdinalIgnoreCase);

        public void Register(string name, string uriTemplate)
        {
            _templateTable.Add(name, uriTemplate);
        }

        public void Register(string name, string uriTemplate, ResourceType type, Func<HttpContext, IDictionary<string, string>, Task> resource)
        {
            Register(name, uriTemplate);

            _resourceTable.Add(name, new ResourceManagerItem(name, type, uriTemplate, resource));
        }

        public ResourceManagerResult Match(HttpContext context)
        {
            var request = context.Request;
            var url = $"{request.Scheme}://{request.Host}{request.PathBase}{request.Path}{request.QueryString}";
            var path = request.Path;
            var remainingPath = (PathString)null;
            var startingSegment = path.StartingSegment(out remainingPath);
            var parameters = (IDictionary<string, string>)null;
            var managerItem = (ResourceManagerItem)null;
            
            if (!string.IsNullOrEmpty(startingSegment)
                && _resourceTable.TryGetValue(startingSegment, out managerItem)
                && MatchUriTemplate(managerItem.UriTemplate, url, out parameters))
            {
                return new ResourceManagerResult(parameters, managerItem.Resource, managerItem.Type);
            }
            
            return null;
        }

        public IReadOnlyDictionary<string, string> RegisteredUris => new ReadOnlyDictionary<string, string>(_templateTable);

        private bool MatchUriTemplate(UriTemplate uriTemplate, string url, out IDictionary<string, string> parameters)
        {
            if (uriTemplate == null || string.IsNullOrEmpty(url))
            {
                parameters = new Dictionary<string, string>();
            }
            else
            {
                var parsed = uriTemplate.GetParameters(new Uri(url));
                parameters = parsed.ToDictionary(kvp => kvp.Key, kvp => kvp.Value.ToString());
            }

            return true;
        }

        private class ResourceManagerItem
        {
            public ResourceManagerItem(string name, ResourceType type, string uriTemplate, Func<HttpContext, IDictionary<string, string>, Task> resource)
            {
                Type = type;
                UriTemplate = uriTemplate != null ? new UriTemplate(name + "/" + uriTemplate) : null;
                Resource = resource;
            }

            public ResourceType Type { get; set; }

            public UriTemplate UriTemplate { get; }

            public Func<HttpContext, IDictionary<string, string>, Task> Resource { get; }
        }
    }
}