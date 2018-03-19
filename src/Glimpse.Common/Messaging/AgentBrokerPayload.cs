using System;

namespace Glimpse.Agent
{
    public class AgentBrokerPayload
    {
        public object Payload { get; set; }

        public MessageContext Context { get; set; }

        public int Ordinal { get; set; }

        public TimeSpan Offset { get; set; }
    }
}