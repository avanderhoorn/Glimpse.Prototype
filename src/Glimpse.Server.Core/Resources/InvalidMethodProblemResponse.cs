using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNet.Http;
using Microsoft.Net.Http.Headers;

namespace Glimpse.Server.Resources
{
    public class InvalidMethodProblemResponse : ProblemResponse
    {
        private readonly IEnumerable<string> _allowedMethods;
        private readonly string _attemptedMethod;

        public InvalidMethodProblemResponse(string attemptedMethod, params string[] allowedMethods)
        {
            if (allowedMethods.Length == 0)
                throw new ArgumentException("At least one method must be allowed.", nameof(allowedMethods));

            _allowedMethods = allowedMethods.Select(m => m.ToUpper());
            _attemptedMethod = attemptedMethod;

            Extensions["AllowedMethods"] = _allowedMethods;
        }

        public override Task Respond(HttpContext context)
        {
            context.Response.Headers[HeaderNames.Allow] = string.Join(", ", _allowedMethods);
            return base.Respond(context);
        }

        public override Uri Type => new Uri("http://getglimpse.com/Docs/Troubleshooting/InvalidMethod");

        public override string Title => "Method Not Allowed";

        public override string Details => $"The method '{_attemptedMethod}' is not allowed on this resource.";

        public override int StatusCode => (int)HttpStatusCode.MethodNotAllowed;
    }
}