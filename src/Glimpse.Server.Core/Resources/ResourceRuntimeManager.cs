using System.Collections.Generic;
using System.Threading.Tasks;
using Glimpse.Initialization;
using Glimpse.Server.Internal;
using Glimpse.Platform;
using Microsoft.AspNet.Http;

namespace Glimpse.Server.Resources
{
    public class ResourceRuntimeManager : IResourceRuntimeManager
    {
        private readonly IEnumerable<IResource> _resources;
        private readonly IResourceManager _resourceManager;
        private readonly IResourceAuthorization _resourceAuthorization;

        public ResourceRuntimeManager(IExtensionProvider<IResource> resourceProvider, IResourceManager resourceManager, IResourceAuthorization resourceAuthorization)
        {
            _resources = resourceProvider.Instances;
            _resourceManager = resourceManager;
            _resourceAuthorization = resourceAuthorization;
        }

        public void Register()
        {
            foreach (var resource in _resources)
            {
                _resourceManager.Register(resource.Name, resource.Parameters?.GenerateUriTemplate(), resource.Type, resource.Invoke);
            }
        }

        public async Task ProcessRequest(HttpContext context)
        {
            var result = _resourceManager.Match(context);
            if (result != null)
            {
                if (_resourceAuthorization.CanExecute(context, result.Type))
                {
                    await result.Resource(context, result.Paramaters);
                }
                else
                {
                    // TODO: Review, do we want a 401, 404 or continue users pipeline 
                    context.Response.StatusCode = 401;
                }
            }
        }
    }
}