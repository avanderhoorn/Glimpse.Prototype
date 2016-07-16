namespace Glimpse.Agent.Messaging
{
    // TODO: Review as I don't love passing IMessage into this, but
    //       not sure if there is a better way of doing it.
    public interface IMessagePayloadFormatter
    {
        string Serialize(IMessage message, object payload);

        string SerializeCore(object payload);
    }
}