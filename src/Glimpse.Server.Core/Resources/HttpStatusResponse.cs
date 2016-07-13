using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNet.Http;
using Microsoft.Net.Http.Headers;

namespace Glimpse.Server.Resources
{
    public class HttpStatusResponse : IResponse
    {
        private readonly int _statusCode;
        private readonly string _message;

        public HttpStatusResponse(HttpStatusCode statusCode) 
            : this((int)statusCode, null)
        {
        }

        public HttpStatusResponse(HttpStatusCode statusCode, string message) 
            : this((int)statusCode, message)
        {
        }

        public HttpStatusResponse(int statusCode) : this(statusCode, null)
        {
        }

        public HttpStatusResponse(int statusCode, string message)
        {
            _statusCode = statusCode;
            _message = message;
        }

        public async Task Respond(HttpContext context)
        {
            var response = context.Response;
            response.StatusCode = _statusCode;
            if (!string.IsNullOrWhiteSpace(_message))
            {
                response.Headers[HeaderNames.ContentType] = "text/plain";
                await response.WriteAsync(_message);
            }
        }
    }
}