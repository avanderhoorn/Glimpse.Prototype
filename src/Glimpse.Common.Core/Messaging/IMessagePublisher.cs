namespace Glimpse
{
    public interface IMessagePublisher
    {
        void PublishMessage(IMessage message);
    }
}