using System;
using System.ComponentModel;
using System.Threading.Tasks;
using Glimpse.Server.Internal.Resources;
using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Http;
using Microsoft.Net.Http.Headers;

namespace Glimpse.Server.Resources
{
    public static class HttpContextExtensions
    {
        public static IApplicationBuilder ModifyResponseWith(this IApplicationBuilder builder, Func<IResponse, IResponse> useFunc)
        {
            var nullImpl = new NullResponse();
            var response = useFunc(nullImpl);

            builder.Use(async (ctx, next) =>
            {
                await response.Respond(ctx);
                await next();
            });

            return builder;
        }

        public async static Task<T> RespondWith<T>(this HttpContext context, T response) where T : IResponse
        {
            await response.Respond(context);
            return await Task.FromResult(response);
        }

        public static IResponse AsFile(this IResponse response, string filename)
        {
            return new ResponseDecorator(response, ctx => ctx.Response.Headers[HeaderNames.ContentDisposition] = $"attachment; filename = {filename}");
        }

        public static IResponse EnableCors(this IResponse response)
        {
            return new ResponseDecorator(response, ctx =>
            {
                ctx.Response.Headers["Access-Control-Allow-Origin"] = "*"; // TODO: This can be improved!
            });
        }

        public static IResponse EnableCaching(this IResponse response, TimeSpan? timeSpan = null)
        {
            return new ResponseDecorator(response, ctx =>
            {
#if !DEBUG
                var cacheControl = new CacheControlHeaderValue
                {
                    Public = true,
                    MaxAge = timeSpan ?? TimeSpan.FromDays(150)
                };
#else
                var cacheControl = new CacheControlHeaderValue
                {
                    NoCache = true,
                };
#endif
                ctx.Response.Headers[HeaderNames.CacheControl] = cacheControl.ToString();
            });
        }
    }

    public class ServerSentEventResponse : IResponse
    {
        private HttpResponse _response;

        [EditorBrowsable(EditorBrowsableState.Never)]
        public async Task Respond(HttpContext context)
        {
            _response = context.Response;
            _response.ContentType = "text/event-stream";
            await Task.FromResult(false);
        }

        public async Task SetRetry(TimeSpan timeSpan)
        {
            await _response.WriteAsync($"retry: {timeSpan.TotalMilliseconds}\n\n");
            await Flush();
        }

        public async Task SendComment(string comment)
        {
            await _response.WriteAsync($": {comment}\n\n");
            await Flush();
        }

        public async Task SendData(params string[] data)
        {
            await SendData(null, null, data);
        }

        public async Task SendData(string id = null, string @event = null, params string[] data)
        {
            if (data == null || data.Length == 0)
                throw new ArgumentException("SendData must contain at least one value.", nameof(data));

            if (!string.IsNullOrWhiteSpace(id))
                await _response.WriteAsync($"id: {id}\n");

            if (!string.IsNullOrWhiteSpace(@event))
                await _response.WriteAsync($"event: {@event}\n");

            foreach (var item in data)
            {
                await _response.WriteAsync($"data: {item}\n");
            }
            await _response.WriteAsync("\n");
            await Flush();
        }

        private async Task Flush()
        {
            await _response.Body.FlushAsync();
        }
    }
}
