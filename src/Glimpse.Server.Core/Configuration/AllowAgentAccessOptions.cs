using System;
using Glimpse.Server;
using Microsoft.AspNet.Http;
using Microsoft.Extensions.Options;

namespace Glimpse.Server.Configuration
{
    public class AllowAgentAccessOptions : IAllowAgentAccess
    {
        private readonly Func<HttpContext, bool> _allowAgentAccess;

        public AllowAgentAccessOptions(IOptions<GlimpseServerOptions> optionsAccessor)
        {
            _allowAgentAccess = optionsAccessor.Value.AllowAgentAccess;
        }

        public bool AllowAgent(HttpContext context)
        {
            return _allowAgentAccess != null ? _allowAgentAccess(context) : true;
        }
    }
}