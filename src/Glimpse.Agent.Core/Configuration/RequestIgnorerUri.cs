using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using Microsoft.AspNet.Http;

namespace Glimpse.Agent.Configuration
{
    public class RequestIgnorerUri : IRequestIgnorer
    {
        private readonly IReadOnlyCollection<Regex> _ignoredUris;

        public RequestIgnorerUri(IRequestIgnorerUriProvider requestIgnorerUriProvider)
        {
            _ignoredUris = requestIgnorerUriProvider.IgnoredUris;
        }

        public bool ShouldIgnore(HttpContext context)
        {

            try
            {
                if (_ignoredUris.Count > 0)
                {  
                    // TODO: look to see if there is a better way of pulling this out
                    var uri = $"{context.Request.Path}{context.Request.QueryString}";

                    if (_ignoredUris.Any(regex => regex.IsMatch(uri)))
                    {
                        return true;
                    }
                }

                return false;
            }
            catch (Exception)
            {
                // TODO: Log this occurance
                // return true;
                throw;
            }
        }
    }
}