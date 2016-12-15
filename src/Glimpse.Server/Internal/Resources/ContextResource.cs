using System.Linq;
using Glimpse.Server.Resources;
using Glimpse.Server.Internal.Extensions;
using Glimpse.Server.Storage;

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
            resourceBuilder.Run("context", "?contextId={contextId}{&types}", ResourceType.Client, async (context, parameters) =>
            {
                var contextId = parameters.ParseGuid("contextId");

                if (!contextId.HasValue)
                {
                    await context.RespondWith(new MissingParameterProblem("contextId")
                        .EnableCaching()
                        .EnableCors());
                    return;
                }

                var types = parameters.ParseEnumerable("types").ToArray();

                var list = await _storage.RetrieveByContextId(contextId.Value, types);

                await context.RespondWith(
                    new RawJson(list.ToJsonArray())
                    .EnableCaching()
                    .EnableCors());
            });
        }

        public ResourceType Type => ResourceType.Client;
    }
}
