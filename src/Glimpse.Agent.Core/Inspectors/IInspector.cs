using Microsoft.AspNet.Http;

namespace Glimpse.Agent.Inspectors
{
    public interface IInspector
    {
        void Before(HttpContext context);

        void After(HttpContext context);
    }
}
