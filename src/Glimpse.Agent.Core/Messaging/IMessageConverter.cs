namespace Glimpse.Agent.Messaging
{
    public interface IMessageConverter
    {
        IMessage ConvertMessage(object payload, MessageContext context, int ordinal);
    }
}