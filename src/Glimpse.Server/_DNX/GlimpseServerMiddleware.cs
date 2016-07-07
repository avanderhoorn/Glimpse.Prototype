#if DNX
using System.Threading.Tasks;
using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Http;
using System.Collections.Generic;
using Glimpse.Initialization;
using Glimpse.Server.Configuration;
using Glimpse.Server.Internal;
using Glimpse.Server.Resources;
using Microsoft.Extensions.OptionsModel;

namespace Glimpse.Server
{
    public class GlimpseServerMiddleware
    {
        private readonly IEnumerable<IAllowClientAccess> _authorizeClients;
        private readonly IEnumerable<IAllowAgentAccess> _authorizeAgents;
        private readonly GlimpseServerOptions _serverOptions;
        private readonly RequestDelegate _next;
        private readonly RequestDelegate _branch;

        public GlimpseServerMiddleware(RequestDelegate next, IApplicationBuilder app, IExtensionProvider<IAllowClientAccess> authorizeClientProvider, IExtensionProvider<IAllowAgentAccess> authorizeAgentProvider, IExtensionProvider<IResourceStartup> resourceStartupsProvider, IExtensionProvider<IResource> resourceProvider, IResourceManager resourceManager, IOptions<GlimpseServerOptions> serverOptions)
        {
            _authorizeClients = authorizeClientProvider.Instances;
            _authorizeAgents = authorizeAgentProvider.Instances;
            _serverOptions = serverOptions.Value;

            _next = next;
            _branch = BuildBranch(app, resourceStartupsProvider.Instances, resourceProvider.Instances, resourceManager);
        }
        
        public async Task Invoke(HttpContext context)
        {
            await _branch(context);
        }

        public RequestDelegate BuildBranch(IApplicationBuilder app, IEnumerable<IResourceStartup> resourceStartups, IEnumerable<IResource> resources, IResourceManager resourceManager)
        {
            var branchApp = app.New();
            branchApp.Map($"/{_serverOptions.BasePath}", glimpseApp =>
            {
                // REGISTER: resource startups
                foreach (var resourceStartup in resourceStartups)
                {
                    var startupApp = glimpseApp.New();

                    var resourceBuilderStartup = new ResourceBuilder(startupApp, resourceManager);
                    resourceStartup.Configure(resourceBuilderStartup);

                    glimpseApp.Use(next =>
                    {
                        startupApp.Run(next);

                        var startupBranch = startupApp.Build();

                        return context =>
                        {
                            if (CanExecute(context, resourceStartup.Type))
                            {
                                return startupBranch(context);
                            }

                            return next(context);
                        };
                    });
                }

                // REGISTER: resources
                var resourceBuilder = new ResourceBuilder(glimpseApp, resourceManager);
                foreach (var resource in resources)
                {
                    resourceBuilder.Run(resource.Name, resource.Parameters?.GenerateUriTemplate(), resource.Type, resource.Invoke);
                }

                glimpseApp.Run(async context =>
                {
                    // RUN: resources
                    var result = resourceManager.Match(context);
                    if (result != null)
                    {
                        if (CanExecute(context, result.Type))
                        {
                            await result.Resource(context, result.Paramaters);
                        }
                        else
                        {
                            // TODO: Review, do we want a 401, 404 or continue users pipeline 
                            context.Response.StatusCode = 401;
                        }
                    }
                });
            });
            branchApp.Use(subNext => { return async ctx => await _next(ctx); });

            return branchApp.Build();
        }

        public bool CanExecute(HttpContext context, ResourceType type)
        {
            return ResourceType.Agent == type ? AllowAgentAccess(context) : AllowClientAccess(context);
        }
        
        private bool AllowClientAccess(HttpContext context)
        {
            foreach (var authorizeClient in _authorizeClients)
            {
                var allowed = authorizeClient.AllowUser(context);
                if (!allowed)
                {
                    return false;
                }
            }

            return true;
        }
        
        private bool AllowAgentAccess(HttpContext context)
        {
            foreach (var authorizeAgent in _authorizeAgents)
            {
                var allowed = authorizeAgent.AllowAgent(context);
                if (!allowed)
                {
                    return false;
                }
            }

            return true;
        }
    }
}
#endif