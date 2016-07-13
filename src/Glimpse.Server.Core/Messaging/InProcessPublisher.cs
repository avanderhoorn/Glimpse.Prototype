namespace Glimpse.Server
{
    public class InProcessPublisher : IMessagePublisher
    {
        private readonly IServerBroker _messageBus;

        public InProcessPublisher(IServerBroker messageBus)
        {
            _messageBus = messageBus;
        }

        public void PublishMessage(IMessage message)
        {
            _messageBus.SendMessage(message);
        }
    }
}