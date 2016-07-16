using System;
using System.Threading.Tasks;
using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Http;

namespace Glimpse.Agent.Inspectors
{
    public class InspectorFunctionBuilder : IInspectorFunctionBuilder
    {
        public InspectorFunctionBuilder(IApplicationBuilder app)
        {
            AppBuilder = app;
        }

        public IApplicationBuilder AppBuilder { get; }
        
        public IInspectorFunctionBuilder Use(Func<HttpContext, Func<Task>, Task> middleware)
        {
            var newAppBuilder = AppBuilder.Use(middleware);
            return (newAppBuilder != AppBuilder) ? new InspectorFunctionBuilder(newAppBuilder) : this;
        }
    }
}