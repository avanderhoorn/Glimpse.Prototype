using System.Threading.Tasks;
using Glimpse.Server.Resources;
using Microsoft.AspNet.Http;

namespace Glimpse.Server.Internal.Resources
{
    public class NullResponse : IResponse
    {
        public async Task Respond(HttpContext context)
        {
            // TODO: Use Task.CompletedTask when it's available.
            // See https://github.com/aspnet/Home/issues/337 for more details
            await Task.FromResult(false);
        }
    }
}