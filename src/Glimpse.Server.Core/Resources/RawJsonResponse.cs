using System.Threading.Tasks;
using Microsoft.AspNet.Http;

namespace Glimpse.Server.Resources
{
    public class RawJsonResponse : IResponse
    {
        private readonly string _json;
        private readonly string _contentType;

        public RawJsonResponse(string json) 
            : this(json, "application/json")
        {
        }

        public RawJsonResponse(string json, string contentType)
        {
            _json = json;
            _contentType = contentType;
        }

        public async Task Respond(HttpContext context)
        {
            var response = context.Response;
            response.ContentType = _contentType;
            await response.WriteAsync(_json);
        }
    }
}