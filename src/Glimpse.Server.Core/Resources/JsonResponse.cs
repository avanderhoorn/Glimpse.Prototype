using System.Threading.Tasks;
using Glimpse.Internal.Extensions;
using Microsoft.AspNet.Http;
using Newtonsoft.Json;

namespace Glimpse.Server.Resources
{
    public class JsonResponse : IResponse
    {
        private readonly object _obj;
        private readonly string _contentType;

        public JsonResponse(object obj) 
            : this(obj, "application/json")
        {
        }

        public JsonResponse(object obj, string contentType)
        {
            _obj = obj;
            _contentType = contentType;
        }

        public async Task Respond(HttpContext context)
        {
            var jsonSerializer = new JsonSerializer();
            jsonSerializer.Configure();

            var json = jsonSerializer.Serialize(_obj);

            var response = new RawJsonResponse(json, _contentType);
            await response.Respond(context);
        }
    }
}