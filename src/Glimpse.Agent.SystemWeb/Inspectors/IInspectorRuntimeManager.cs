using Microsoft.AspNet.Http;

namespace Glimpse.Agent.Inspectors
{
    public interface IInspectorRuntimeManager
    {
        void BeginRequest(HttpContext context);

        void EndRequest(HttpContext context);
    }
}