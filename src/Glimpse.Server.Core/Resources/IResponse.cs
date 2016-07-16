using System.Threading.Tasks;
using Microsoft.AspNet.Http;

namespace Glimpse.Server.Resources
{
    public interface IResponse
    {
        Task Respond(HttpContext context);
    }
}