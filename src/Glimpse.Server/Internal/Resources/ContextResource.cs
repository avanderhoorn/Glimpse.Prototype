using System.Linq;
using Glimpse.Server.Resources;
using Glimpse.Server.Internal.Extensions;
using Glimpse.Server.Storage;
using Microsoft.AspNetCore.Http;
using Microsoft.Net.Http.Headers;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

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

    public class ContextSummaryResource : IResourceStartup
    {
        private readonly IStorage _storage;

        public ContextSummaryResource(IStorage storage)
        {
            _storage = storage;
        }

        public void Configure(IResourceBuilder resourceBuilder)
        {
            resourceBuilder.Run("context-summary", "?contextId={contextId}", ResourceType.Client, async (context, parameters) =>
            {
                var contextId = parameters.ParseGuid("contextId");

                if (!contextId.HasValue)
                {
                    await context.RespondWith(new MissingParameterProblem("contextId")
                        .EnableCaching()
                        .EnableCors());
                    return;
                }

                var requestDetails = new
                {
                    Summary = new
                    {
                        Server = new
                        {
                            Logs = new
                            {
                                TotalErrorCount = 10,
                                TotalWarnCount = 5,
                                TotalInfoCount = 1
                            },
                            WebServices = new
                            {
                                TotalCount = 10,
                                TotalTime = 100.7m,
                                Listing = new[]
                                {
                                    new
                                    {
                                        StatusCode = 200
                                    },
                                    new
                                    {
                                        StatusCode = 404
                                    }
                                }
                            },
                            DataStore = new
                            {
                                TotalCount = 15,
                                TotalTime = 94.5m,
                                Listing = new[]
                                {
                                    new
                                    {
                                        OperationCategory = "Read"
                                    },
                                    new
                                    {
                                        OperationCategory = "Create"
                                    }
                                }
                            }
                        }
                    }
                };

                var json = JsonConvert.SerializeObject(requestDetails, new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver()});

                await context.RespondWith(new RawJson(json).EnableCaching().EnableCors());
            });
        }

        public ResourceType Type => ResourceType.Client;
    }
}
