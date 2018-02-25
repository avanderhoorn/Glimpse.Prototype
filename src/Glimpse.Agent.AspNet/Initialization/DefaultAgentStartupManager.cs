using System.Collections.Generic;
using System.Linq;

namespace Glimpse.Initialization
{
    public class DefaultAgentStartupManager : IAgentStartupManager
    {
        public DefaultAgentStartupManager(IExtensionProvider<IAgentStartup> startupProvider)
        {
            Startups = startupProvider.Instances;
        }

        private IEnumerable<IAgentStartup> Startups { get; }

        public void Run(IStartupOptions options)
        {
            if (Startups.Any())
            {
                foreach (var startup in Startups)
                {
                    startup.Run(options);
                }
            }
        }
    }
}