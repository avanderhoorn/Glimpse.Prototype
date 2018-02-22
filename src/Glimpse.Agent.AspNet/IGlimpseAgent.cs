using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Glimpse.Agent
{
    public interface IGlimpseAgent
    {
        IAgentBroker Broker { get; }

        bool IsEnabled();
    }
}
