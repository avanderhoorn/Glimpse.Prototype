using Glimpse.Agent.Configuration;

namespace Glimpse.Agent
{
    public class GlimpseAgent : IGlimpseAgent
    {
        public GlimpseAgent(IAgentBroker broker, IRequestIgnorerManager requestIgnorerManager)
        {
            Broker = broker;
            RequestIgnorerManager = requestIgnorerManager;
        }

        private IRequestIgnorerManager RequestIgnorerManager { get; }

        public IAgentBroker Broker { get; }

        public bool IsEnabled()
        {
            return !RequestIgnorerManager.ShouldIgnore();
        }
    }
}
