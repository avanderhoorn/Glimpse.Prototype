using System.Collections.Generic;
using Glimpse.Initialization;
using Glimpse.Server.Configuration;
using Glimpse.Platform;
using Microsoft.AspNet.Http;

namespace Glimpse.Server.Resources
{
    public class ResourceAuthorization : IResourceAuthorization
    {
        private readonly IEnumerable<IAllowClientAccess> _authorizeClients;
        private readonly IEnumerable<IAllowAgentAccess> _authorizeAgents;

        public ResourceAuthorization(IExtensionProvider<IAllowClientAccess> authorizeClientProvider, IExtensionProvider<IAllowAgentAccess> authorizeAgentProvider)
        {
            _authorizeClients = authorizeClientProvider.Instances;
            _authorizeAgents = authorizeAgentProvider.Instances;
        }

        public bool CanExecute(HttpContext context, ResourceType type)
        {
            return ResourceType.Agent == type ? AllowAgentAccess(context) : AllowClientAccess(context);
        }

        private bool AllowClientAccess(HttpContext context)
        {
            foreach (var authorizeClient in _authorizeClients)
            {
                var allowed = authorizeClient.AllowUser(context);
                if (!allowed)
                {
                    return false;
                }
            }

            return true;
        }

        private bool AllowAgentAccess(HttpContext context)
        {
            foreach (var authorizeAgent in _authorizeAgents)
            {
                var allowed = authorizeAgent.AllowAgent(context);
                if (!allowed)
                {
                    return false;
                }
            }

            return true;
        }
    }
}