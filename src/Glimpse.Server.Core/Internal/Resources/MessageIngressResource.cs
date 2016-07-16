using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Glimpse.Internal.Serialization;
using Glimpse.Server.Resources;
using Microsoft.AspNet.Http;
using Newtonsoft.Json;

namespace Glimpse.Server.Internal.Resources
{
    public class MessageIngressResource : IResource
    {
        private readonly IServerBroker _messageServerBus;
        private readonly JsonSerializer _jsonSerializer;

        public MessageIngressResource(IServerBroker messageServerBus, IJsonSerializerProvider serializerProvider)
        {
            _messageServerBus = messageServerBus;
            _jsonSerializer = serializerProvider.GetJsonSerializer();
        }

        public async Task Invoke(HttpContext context, IDictionary<string, string> parameters)
        {
            if (context.Request.Method.Equals("OPTIONS", StringComparison.OrdinalIgnoreCase))
            {
                // CORS - this is super basic...
                var headers = context.Response.Headers;
                headers["Access-Control-Allow-Origin"] = "*";
                headers["Access-Control-Allow-Methods"] = "POST";
                headers["Access-Control-Allow-Headers"] = context.Request.Headers["Access-Control-Request-Headers"];
                context.Response.StatusCode = 200;
                await context.Response.WriteAsync("");
                return;
            }

            IEnumerable<Message> messages = null;
            if (context.Request.Method.Equals("POST", StringComparison.OrdinalIgnoreCase))
            {
                try
                {
                    messages = ReadMessage(context.Request).ToArray();
                    foreach (var message in messages)
                    {
                        _messageServerBus.SendMessage(message);
                    }
                }
                catch (JsonReaderException exception)
                {
                    await context.RespondWith(new InvalidJsonProblemResponse(exception).EnableCors());
                    return;
                }
                catch (Exception exception)
                {
                    await context.RespondWith(new ExceptionProblemResponse(exception).EnableCors());
                    return;
                }

                await context.RespondWith(
                    new HttpStatusResponse(HttpStatusCode.Accepted, 
                    "Accepted: " + string.Join(", ", messages.Select(m => m.Id.ToString("N"))))
                    .EnableCors());
            }
            else
            {
                await context.RespondWith(
                    new InvalidMethodProblemResponse(context.Request.Method, "POST")
                    .EnableCors());
            }
        }

        public string Name => "message-ingress";

        public IEnumerable<ResourceParameter> Parameters => Enumerable.Empty<ResourceParameter>();

        public ResourceType Type => ResourceType.Agent;

        private IEnumerable<Message> ReadMessage(HttpRequest request)
        {
            IEnumerable<Message> messages = null;

            using (var sr = new StreamReader(request.Body))
            using (var tr = new JsonTextReader(sr))
            {
                messages = _jsonSerializer.Deserialize<IEnumerable<Message>>(tr);
            }

            return messages;
        }
    }
}