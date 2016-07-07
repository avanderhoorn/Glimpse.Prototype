using System;
using Microsoft.AspNet.Http;
using Microsoft.Extensions.OptionsModel;

namespace Glimpse.Agent.Configuration
{
    public class RequestIgnorerOptionsShouldIgnore : IRequestIgnorer
    {
        private readonly Func<HttpContext, bool> _shouldIgnore;

        public RequestIgnorerOptionsShouldIgnore(IOptions<GlimpseAgentOptions> optionsAccessor)
        {
            _shouldIgnore = optionsAccessor.Value.ShouldIgnore;
        }
        
        public bool ShouldIgnore(HttpContext context)
        {
            return _shouldIgnore != null ? _shouldIgnore(context) : false;
        }
    }
}