namespace Glimpse.Agent
{
    public interface IAgentBroker
    {
        /// <summary>
        /// On the sender thread and is blocking
        /// </summary>
        AgentBrokerObservations OnSenderThread { get; }

        /// <summary>
        /// Off the sender thread and is not blocking
        /// </summary>
        AgentBrokerObservations OffSenderThread { get; }

        void SendMessage(object message);
    }
}
