﻿using Microsoft.AspNet.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Microsoft.AspNet.Builder;

namespace Glimpse.Server.Web
{
    public class HttpClientChannelResource : IMiddlewareResourceComposer
    {
        private readonly InMemoryStorage _store;
        private readonly JsonSerializer _jsonSerializer;

        public HttpClientChannelResource(IStorage storage, JsonSerializer jsonSerializer)
        {
            // TODO: This hack is needed to get around signalr problem
            jsonSerializer.ContractResolver = new CamelCasePropertyNamesContractResolver();

            // TODO: Really shouldn't be here 
            _store = (InMemoryStorage)storage;
            _jsonSerializer = jsonSerializer;
        }
        
        public void Register(IApplicationBuilder appBuilder)
        {
            appBuilder.Map("/data/history", chuldApp => chuldApp.Run(async context =>
            {
                var response = context.Response;

                response.Headers.Set("Content-Type", "application/json");

                var list = _store.AllMessages;
                var output = _jsonSerializer.Serialize(list);

                await response.WriteAsync(output);
            }));
        }
    }
}