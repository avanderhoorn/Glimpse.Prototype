using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNet.Http;

namespace Glimpse.Agent.Configuration
{
    public class RequestIgnorerStatusCode : IRequestIgnorer
    {
        private readonly IReadOnlyCollection<int> _statusCodes;

        public RequestIgnorerStatusCode(IRequestIgnorerStatusCodeProvider requestIgnorerStatusCodeProvider)
        {
            _statusCodes = requestIgnorerStatusCodeProvider.StatusCodes;
        }

        public bool ShouldIgnore(HttpContext context)
        {
            return _statusCodes.Contains(context.Response.StatusCode);
        }
    }
}