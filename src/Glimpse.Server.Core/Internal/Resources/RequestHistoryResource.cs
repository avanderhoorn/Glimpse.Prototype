using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Glimpse.Server.Internal.Extensions;
using Glimpse.Server.Resources;
using Glimpse.Server.Storage;
using Microsoft.AspNet.Http;

namespace Glimpse.Server.Internal.Resources
{
    public class RequestHistoryResource : IResource
    {
        private readonly IQueryRequests _requests;

        public RequestHistoryResource(IStorage storage)
        {
            if (!storage.Supports<IQueryRequests>())
                throw new ArgumentException($"IStorage implementation of type '{storage.GetType().FullName}' does not support IQueryRequests.", nameof(storage));

            _requests = storage.As<IQueryRequests>();
        }

        public async Task Invoke(HttpContext context, IDictionary<string, string> parameters)
        {
            var filters = GetFilters(parameters);

            IEnumerable<string> list;
            var types = parameters.ParseEnumerable("types").ToArray();
            if (types.Length > 0)
            {
                list = await _requests.Query(filters, types);
            }
            else
            {
                list = await _requests.Query(filters);
            }

            await context.RespondWith(
                new RawJsonResponse(list.ToJsonArray()));
        }

        public string Name => "request-history";

        public IEnumerable<ResourceParameter> Parameters => new[] {
            ResourceParameter.Custom("dmin"),
            ResourceParameter.Custom("dmax"),
            ResourceParameter.Custom("url"),
            ResourceParameter.Custom("methods"),
            ResourceParameter.Custom("smin"),
            ResourceParameter.Custom("smax"),
            ResourceParameter.Custom("tags"),
            ResourceParameter.Custom("before"),
            ResourceParameter.Custom("userId"),
            ResourceParameter.Custom("types")};

        public ResourceType Type => ResourceType.Client;

        private RequestFilters GetFilters(IDictionary<string, string> parameters)
        {
            return new RequestFilters
            {
                DurationMinimum = parameters.ParseFloat("dmin"),
                DurationMaximum = parameters.ParseFloat("dmax"),
                UrlContains = parameters.ParseString("url"),
                MethodList = parameters.ParseEnumerable("methods"),
                StatusCodeMinimum = parameters.ParseInt("smin"),
                StatusCodeMaximum = parameters.ParseInt("smax"),
                TagList = parameters.ParseEnumerable("tags"),
                UserId = parameters.ParseString("userId"),
                RequesTimeBefore = parameters.ParseDateTime("before")
            };
        }
    }
}
