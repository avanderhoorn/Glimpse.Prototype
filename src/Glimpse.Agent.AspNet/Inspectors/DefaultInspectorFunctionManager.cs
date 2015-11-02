using System.Collections.Generic;
using Glimpse.Initialization;
using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Http;

namespace Glimpse.Agent.Inspectors
{
    public class DefaultInspectorFunctionManager : IInspectorFunctionManager
    {
        public DefaultInspectorFunctionManager(IExtensionProvider<IInspectorFunction> inspectorStartupProvider)
        {
            InspectorStartups = inspectorStartupProvider.Instances;
        }

        private IEnumerable<IInspectorFunction> InspectorStartups { get; }

        public RequestDelegate BuildInspectorBranch(RequestDelegate next, IApplicationBuilder app)
        {
            return BuildInspectorBranch(next, app, InspectorStartups);
        }

        public RequestDelegate BuildInspectorBranch(RequestDelegate next, IApplicationBuilder app, IEnumerable<IInspectorFunction> inspectorStartups)
        {
            // create new pipeline
            var branchBuilder = app.New();
            foreach (var middlewareProfiler in inspectorStartups)
            {
                middlewareProfiler.Configure(new InspectorFunctionBuilder(branchBuilder));
            }
            branchBuilder.Use(subNext => { return async ctx => await next(ctx); });

            return branchBuilder.Build();
        }
    }
}