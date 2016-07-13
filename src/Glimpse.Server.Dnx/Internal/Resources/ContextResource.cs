using System.Linq;
using Glimpse.Server.Resources;
using Glimpse.Server.Internal.Extensions;
using Glimpse.Server.Storage;
using Microsoft.AspNet.Http;
using Microsoft.Net.Http.Headers;

namespace Glimpse.Server.Internal.Resources
{
    public class ContextResource : IResourceStartup
    {
        private readonly IStorage _storage;

        public ContextResource(IStorage storage)
        {
            _storage = storage;
        }

        public void Configure(IResourceBuilder resourceBuilder)
        {
            resourceBuilder.Register("context", "?contextId={contextId}{&types}", ResourceType.Client, async (context, parameters) =>
            {
                var contextId = parameters.ParseGuid("contextId");

                if (!contextId.HasValue)
                {
                    await context.RespondWith(new MissingParameterProblemResponse("contextId")
                        .EnableCaching()
                        .EnableCors());
                    return;
                }

                var types = parameters.ParseEnumerable("types").ToArray();

                var list = await _storage.RetrieveByContextId(contextId.Value, types);

                await context.RespondWith(
                    new RawJsonResponse(list.ToJsonArray())
                    .EnableCaching()
                    .EnableCors());
            });
        }

        public ResourceType Type => ResourceType.Client;
    }
}