using System.Linq;
using Glimpse.Server.Internal;
using Glimpse.Internal.Extensions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace Glimpse.Server.Configuration
{
    public class DefaultMetadataProvider : IMetadataProvider
    {
        private readonly IResourceManager _resourceManager;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly GlimpseServerOptions _serverOptions;
        private Metadata _metadata;

        public DefaultMetadataProvider(IResourceManager resourceManager, IHttpContextAccessor httpContextAccessor, IOptions<GlimpseServerOptions> serverOptions)
        {
            _resourceManager = resourceManager;
            _httpContextAccessor = httpContextAccessor;
            _serverOptions = serverOptions.Value;
        }

        public Metadata BuildInstance()
        {
            if (_metadata != null)
                return _metadata;

            var request = _httpContextAccessor.HttpContext.Request;
            var baseUrl = $"{request.Scheme}://{request.Host}/{_serverOptions.BasePath}/";
            var resources = _resourceManager.RegisteredUris.ToDictionary(kvp => kvp.Key.KebabCase(), kvp => $"{baseUrl}{kvp.Key}/{kvp.Value}");

            if (_serverOptions.OverrideResources != null)
                _serverOptions.OverrideResources(resources);

            _metadata = new Metadata(resources);

            return _metadata;
        }
    }
}