using System.Threading.Tasks;
using Microsoft.AspNet.Http;

namespace Glimpse.Server.Resources
{
    public interface IResourceRuntimeManager
    {
        void Register();

        Task ProcessRequest(HttpContext context);
    }
}
