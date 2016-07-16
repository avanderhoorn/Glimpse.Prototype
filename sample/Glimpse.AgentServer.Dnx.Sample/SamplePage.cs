using System.Threading.Tasks;
using Microsoft.AspNet.Http;
using Microsoft.Net.Http.Headers;
using Glimpse.Platform;

namespace Glimpse.AgentServer.Dnx.Sample
{
    public class SamplePage
    {
        private readonly ContextData<MessageContext> _context;

        public SamplePage()
        {
            _context = new ContextData<MessageContext>();
        }

        public async Task Invoke(HttpContext context)
        {
            var response = context.Response;

            response.Headers[HeaderNames.ContentType] = "text/html";

            await response.WriteAsync($"<html><body><h1>Agent Test</h1><script src='/Glimpse/Browser/Agent' id='glimpse' data-glimpse-id='{_context?.Value?.Id}'></script></body></html>");
        }
    }
}