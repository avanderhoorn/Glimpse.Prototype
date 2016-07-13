namespace Glimpse.Server
{
    public interface IServerBroker
    {
        /// <summary>
        /// Off the reciever thread and is not blocking
        /// </summary>
        ServerBrokerObservations OffRecieverThread { get; }

        void SendMessage(IMessage message);
    }
}