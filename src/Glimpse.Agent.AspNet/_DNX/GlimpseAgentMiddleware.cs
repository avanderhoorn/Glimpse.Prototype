#if DNX
using System.Threading.Tasks;
using Glimpse.Agent.Configuration;
using Glimpse.Agent.Inspectors;
using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Http;

namespace Glimpse.Agent
{
    public class GlimpseAgentMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly RequestDelegate _branch;
        private readonly IRequestIgnorerManager _requestIgnorerManager;

        public GlimpseAgentMiddleware(RequestDelegate next, IApplicationBuilder app, IRequestIgnorerManager requestIgnorerManager, IInspectorFunctionManager inspectorFunctionManager)
        {
            _next = next;
            _requestIgnorerManager = requestIgnorerManager;
            _branch = inspectorFunctionManager.BuildInspectorBranch(next, app);
        }
        
        public async Task Invoke(HttpContext context)
        {
            if (!_requestIgnorerManager.ShouldIgnore(context))
            {
                await _branch(context);
            }
            else
            {
                await _next(context);
            }
        }
    }
}
#endif