using System.Threading.Tasks;
using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Http;
using System.Collections.Generic;
using Glimpse.Initialization;
using Glimpse.Server.Configuration;
using Glimpse.Server.Internal;
using Glimpse.Server.Resources;
using Microsoft.Extensions.Options;

namespace Glimpse.Server
{
    public class GlimpseServerMiddleware
    {
        private readonly IResourceStartupRuntimeManager _resourceStartupRuntimeManager;
        private readonly IResourceRuntimeManager _resourceRuntimeManager;
        private readonly GlimpseServerOptions _serverOptions;
        private readonly RequestDelegate _next;
        private readonly RequestDelegate _branch;

        public GlimpseServerMiddleware(RequestDelegate next, IApplicationBuilder app, IResourceStartupRuntimeManager resourceStartupRuntimeManager, IResourceRuntimeManager resourceRuntimeManager, IResourceManager resourceManager, IOptions<GlimpseServerOptions> serverOptions)
        {
            _resourceStartupRuntimeManager = resourceStartupRuntimeManager;
            _resourceRuntimeManager = resourceRuntimeManager;
            _serverOptions = serverOptions.Value;

            _next = next;
            _branch = BuildBranch(app);
        }
        
        public async Task Invoke(HttpContext context)
        {
            await _branch(context);
        }

        public RequestDelegate BuildBranch(IApplicationBuilder app)
        {
            var branchApp = app.New();
            branchApp.Map($"/{_serverOptions.BasePath}", glimpseApp =>
            {
                // resource startups
                _resourceStartupRuntimeManager.Setup(glimpseApp);

                // resources
                _resourceRuntimeManager.Register();
                glimpseApp.Run(async context => { await _resourceRuntimeManager.ProcessRequest(context); });
            });
            branchApp.Use(subNext => { return async ctx => await _next(ctx); });

            return branchApp.Build();
        }
    }
}