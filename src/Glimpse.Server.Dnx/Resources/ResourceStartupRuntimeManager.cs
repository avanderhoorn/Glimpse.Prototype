using System.Collections.Generic;
using Glimpse.Initialization;
using Glimpse.Server.Internal;
using Glimpse.Platform;
using Microsoft.AspNet.Builder;

namespace Glimpse.Server.Resources
{
    public class ResourceStartupRuntimeManager : IResourceStartupRuntimeManager
    {
        private readonly IEnumerable<IResourceStartup> _resourceStartups;
        private readonly IResourceManager _resourceManager;
        private readonly IResourceAuthorization _resourceAuthorization;

        public ResourceStartupRuntimeManager(IExtensionProvider<IResourceStartup> resourceExtensionProvider, IResourceManager resourceManager, IResourceAuthorization resourceAuthorization)
        {
            _resourceStartups = resourceExtensionProvider.Instances;
            _resourceManager = resourceManager;
            _resourceAuthorization = resourceAuthorization;
        }

        public void Setup(IApplicationBuilder app)
        {
            foreach (var resourceStartup in _resourceStartups)
            {
                var startupApp = app.New();

                // let resource play with its own appBuilder
                var resourceBuilderStartup = new ResourceBuilder(startupApp, _resourceManager);
                resourceStartup.Configure(resourceBuilderStartup);

                // setup the new appBuilder in the pipeline making sure its locked down
                app.Use(next =>
                {
                    startupApp.Run(next);

                    var startupBranch = startupApp.Build();

                    return context =>
                    {
                        if (_resourceAuthorization.CanExecute(context, resourceStartup.Type))
                        {
                            return startupBranch(context);
                        }

                        return next(context);
                    };
                });
            }
        }
    }
}