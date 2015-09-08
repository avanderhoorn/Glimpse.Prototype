﻿using Microsoft.AspNet.Http;
using Microsoft.AspNet.Http.Features;

namespace Glimpse.Server.Web
{
    public class AuthorizeClientAllowRemote : IAuthorizeClient
    {
        private readonly IAllowRemoteProvider _allowRemoteProvider;

        public AuthorizeClientAllowRemote(IAllowRemoteProvider allowRemoteProvider)
        {
            _allowRemoteProvider = allowRemoteProvider;
        }

        public bool AllowUser(HttpContext context)
        {
            var connectionFeature = context.Features.Get<IHttpConnectionFeature>();
            return _allowRemoteProvider.AllowRemote || (connectionFeature != null && connectionFeature.IsLocal);
        }
    }
}