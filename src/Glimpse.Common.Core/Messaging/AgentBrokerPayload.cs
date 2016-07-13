namespace Glimpse.Agent
{
    public class AgentBrokerPayload
    {
        public AgentBrokerPayload(object payload, MessageContext context, int ordinal)
        {
            Payload = payload;
            Context = context;
            Ordinal = ordinal;
        }

        public object Payload { get; set; }

        public MessageContext Context { get; set; }

        public int Ordinal { get; set; }
    }
}