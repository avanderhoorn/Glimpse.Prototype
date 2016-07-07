#if DNX
using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Http;

namespace Glimpse.Agent.Inspectors
{
    public interface IInspectorFunctionManager
    {
        RequestDelegate BuildInspectorBranch(RequestDelegate next, IApplicationBuilder app);
    }
}
#endif