using System.Linq;
using System.Text;
using Glimpse.Agent.Inspectors;
using System.IO;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Http;
using Microsoft.Net.Http.Headers;
using System;
using Glimpse.Agent.Messages;

namespace Glimpse.Agent.Internal.Inspectors
{
    public class BodyInsepector : IInspectorFunction
    {
        private const int MaxBodySize = 132000;
        private static Regex[] MineTypesToCapture = new[] {
            new Regex(@"^text\/"),
            new Regex(@"^application\/.*?xml"),
            new Regex(@"^application\/json"),
            new Regex(@"^application\/javascript")
        };
        private readonly IAgentBroker _broker;
        
        public BodyInsepector(IAgentBroker broker)
        {
            _broker = broker;
        }

        public void Configure(IInspectorFunctionBuilder builder)
        {
            builder.Use(async (httpContext, next) =>
            { 
                var request = httpContext.Request;
                var response = httpContext.Response;

                // request/response
                var requestContent = (string)null;
                var requestSize = 0L;
                var requestHeaders = request.GetTypedHeaders();
                var requestContentType = requestHeaders.ContentType;
                var requestShouldReadBody = ShouldReadBody(requestContentType, request.Body);
                var requestBodyStream = (Stream)null;
                var responseBodyStream = (Stream)null;

                // request setup/read - don't wrap unless we need to
                if (requestShouldReadBody && !request.Body.CanSeek)
                {
                    var newRequestBodyStream = new MemoryStream();
                    await request.Body.CopyToAsync(newRequestBodyStream);

                    requestBodyStream = request.Body;
                    request.Body = newRequestBodyStream;

                    requestSize = request.Body.Length;

                    request.Body.Seek(0, SeekOrigin.Begin);
                    requestContent = await new StreamReader(request.Body).ReadToEndAsync();
                    request.Body.Seek(0, SeekOrigin.Begin);
                }

                // request write 
                RequestWrite(request, requestContentType, requestSize, requestContent);

                // response setup - we don't yet know the content type
                if (!response.Body.CanSeek)
                {
                    responseBodyStream = response.Body;
                    response.Body = new MemoryStream();
                }

                await next();

                // response
                var responseContent = (string)null;
                var responseSize = 0L;
                var responseHeaders = response.GetTypedHeaders();
                var responseContentType = responseHeaders.ContentType;
                var responseShouldReadBody = ShouldReadBody(responseContentType, response.Body);

                // response read/teardown
                if (response.Body.CanSeek)
                {
                    responseSize = response.Body.Length;

                    response.Body.Seek(0, SeekOrigin.Begin);
                    if (responseShouldReadBody)
                    {
                        responseContent = await new StreamReader(response.Body).ReadToEndAsync();
                        response.Body.Seek(0, SeekOrigin.Begin);
                    }
                    
                    if (responseBodyStream != null)
                    {
                        await response.Body.CopyToAsync(responseBodyStream);
                    }
                }
                
                // response write 
                ResponseWrite(response, responseContentType, responseSize, responseContent, httpContext);
            });
        }

        private void RequestWrite(HttpRequest request, MediaTypeHeaderValue contentType, long size, string content)
        {
            var webBody = new WebRequestBody();
            ProcessBody(webBody, contentType, size, content);
            
            if (request.HasFormContentType)
            {
                webBody.Form = request.Form;
            }

            // TODO: need to build message
            //_broker.SendMessage(message);
        }

        private void ResponseWrite(HttpResponse response, MediaTypeHeaderValue contentType, long size, string content, HttpContext httpContext)
        {
            var webBody = new WebBody();
            ProcessBody(webBody, contentType, size, content);

            // TODO: TOTOAL HACK!!! need to find a better way of doing this.
            httpContext.Items.Add("__GlimpseWebBody", webBody);

            // TODO: need to build message
            //_broker.SendMessage(message);
        }

        private void ProcessBody(WebBody webBody, MediaTypeHeaderValue contentType, long size, string content)
        {
            webBody.Encoding = contentType?.Encoding?.WebName;
            webBody.Content = content;
            webBody.Size = size;

            if (!string.IsNullOrEmpty(webBody.Content)
                && webBody.Content.Length > MaxBodySize)
            {
                webBody.Content = webBody.Content.Substring(0, MaxBodySize);
                webBody.IsTruncated = true;
            }
        }

        private bool ShouldReadBody(MediaTypeHeaderValue contentType, Stream body)
        {
            return (body != null
                    && contentType != null
                    && (contentType.Encoding == Encoding.UTF8
                        || (contentType.MediaType.HasValue 
                            &&MineTypesToCapture.Any(regex => regex.IsMatch(contentType.MediaType.Value)))));
        }
    }
}
