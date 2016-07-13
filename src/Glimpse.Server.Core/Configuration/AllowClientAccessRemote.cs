using Microsoft.AspNet.Http;
using Microsoft.AspNet.Http.Features;

namespace Glimpse.Server.Configuration
{
    public class AllowClientAccessRemote : IAllowClientAccess
    {
        private readonly IAllowRemoteProvider _allowRemoteProvider;

        public AllowClientAccessRemote(IAllowRemoteProvider allowRemoteProvider)
        {
            _allowRemoteProvider = allowRemoteProvider;
        }

        public bool AllowUser(HttpContext context)
        {
            var connectionFeature = context.Features.Get<IHttpConnectionFeature>();
            return _allowRemoteProvider.AllowRemote; // || (connectionFeature != null && connectionFeature.IsLocal); Is Local went away.
        }
    }
}