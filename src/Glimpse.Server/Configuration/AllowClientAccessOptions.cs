using System;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace Glimpse.Server.Configuration
{
    public class AllowClientAccessOptions : IAllowClientAccess
    {
        private readonly Func<HttpContext, bool> _allowAccess;

        public AllowClientAccessOptions(IOptions<GlimpseServerOptions> optionsAccessor)
        {
            _allowAccess = optionsAccessor.Value.AllowClientAccess;
        }

        public bool AllowUser(HttpContext context)
        {
            return _allowAccess != null ? _allowAccess(context) : true;
        }
    }
}
