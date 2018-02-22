using Glimpse.Initialization;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Glimpse.Agent.Internal.Inspectors
{
    public class AgentStartupLoggingProvider : IAgentStartup
    {
        public AgentStartupLoggingProvider(ILoggerFactory factory, IGlimpseAgent agent)
        {
            Factory = factory;
            Agent = agent;
        }

        private ILoggerFactory Factory { get; }

        private IGlimpseAgent Agent { get; }

        public void Run(IStartupOptions options)
        {
            Factory.AddProvider(new LoggerProvider(Agent, (cat, level) => true));
        }
    }
}
