using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Glimpse.Server.Resources;
using Glimpse.Server.Storage;
using Glimpse.Server.Internal.Extensions;
using Microsoft.AspNet.Http;
using Microsoft.Net.Http.Headers;

namespace Glimpse.Server.Internal.Resources
{
    public class MessageHistoryResource : IResource
    {
        private readonly IStorage _store;

        public MessageHistoryResource(IStorage storage)
        {
            _store = storage;
        }

        public async Task Invoke(HttpContext context, IDictionary<string, string> parameters)
        {
            var types = parameters.ParseEnumerable("types").ToArray();

            if (types.Length == 0)
            {
                await context.RespondWith(
                    new MissingParameterProblemResponse("types")
                    .EnableCaching());
                return;
            }

            var list = await _store.RetrieveByType(types);
            await context.RespondWith(new RawJsonResponse(list.ToJsonArray()));
        }

        public string Name => "message-history";
        
        public IEnumerable<ResourceParameter> Parameters => new[] { +ResourceParameter.Custom("types") };

        public ResourceType Type => ResourceType.Client;
    }
}