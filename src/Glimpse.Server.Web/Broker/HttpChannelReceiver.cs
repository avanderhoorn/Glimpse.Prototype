﻿using Glimpse.Web;
using Microsoft.AspNet.Http;
using Newtonsoft.Json;
using System.IO;
using System.Text;
using Microsoft.AspNet.Builder;

namespace Glimpse.Server.Web
{
    public class HttpChannelReceiver : IMiddlewareResourceComposer
    {
        private readonly IServerBroker _messageServerBus;

        public HttpChannelReceiver(IServerBroker messageServerBus)
        {
            _messageServerBus = messageServerBus;
        }
        
        public void Register(IApplicationBuilder appBuilder)
        {
            appBuilder.Map("/agent", chuldApp => chuldApp.Run(async context =>
            {
                var envelope = ReadMessage(context.Request);

                _messageServerBus.SendMessage(envelope);

                // TEST CODE ONLY!!!!
                var response = context.Response;

                response.Headers.Set("Content-Type", "text/plain");

                var data = Encoding.UTF8.GetBytes(envelope.Payload);
                await response.Body.WriteAsync(data, 0, data.Length);
                // TEST CODE ONLY!!!!
            }));
        }

        private Message ReadMessage(HttpRequest request)
        {
            var reader = new StreamReader(request.Body);
            var text = reader.ReadToEnd();

            var message = JsonConvert.DeserializeObject<Message>(text);

            return message;
        }
    }
}