using System.Collections.Generic;
using Glimpse.Initialization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;

namespace Glimpse.Agent.Inspectors
{
    public class DefaultInspectorFunctionManager : IInspectorFunctionManager
    {
        public DefaultInspectorFunctionManager(IExtensionProvider<IInspectorFunction> inspectorFunctionsProvider)
        {
            InspectorFunctions = inspectorFunctionsProvider.Instances;
        }

        private IEnumerable<IInspectorFunction> InspectorFunctions { get; }

        public RequestDelegate BuildInspectorBranch(RequestDelegate next, IApplicationBuilder app)
        {
            return BuildInspectorBranch(next, app, InspectorFunctions);
        }

        public RequestDelegate BuildInspectorBranch(RequestDelegate next, IApplicationBuilder app, IEnumerable<IInspectorFunction> inspectorFunctions)
        {
            // create new pipeline
            var branchBuilder = app.New();
            foreach (var inspectorFunction in inspectorFunctions)
            {
                inspectorFunction.Configure(new InspectorFunctionBuilder(branchBuilder));
            }
            branchBuilder.Use(subNext => { return async ctx => await next(ctx); });

            return branchBuilder.Build();
        }
    }
}