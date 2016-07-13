using System.Collections.Generic;
using System.Threading.Tasks;
using Glimpse.Server.Configuration;
using Glimpse.Server.Resources;
using Microsoft.AspNet.Http;

namespace Glimpse.Server.Internal.Resources
{
    public class MetadataResource : IResource
    {
        private readonly IMetadataProvider _metadataProvider;
        private Metadata _metadata;

        public MetadataResource(IMetadataProvider metadataProvider)
        {
            _metadataProvider = metadataProvider;
        }

        public async Task Invoke(HttpContext context, IDictionary<string, string> parameters)
        {
            var metadata = GetMetadata();

            await context.RespondWith(new JsonResponse(metadata));
        }

        private Metadata GetMetadata()
        {
            if (_metadata != null)
                return _metadata;

            _metadata = _metadataProvider.BuildInstance();
            return _metadata;
        }

        public string Name => "metadata";
        public IEnumerable<ResourceParameter> Parameters => new [] { +ResourceParameter.Hash };
        public ResourceType Type => ResourceType.Client;
    }
}
