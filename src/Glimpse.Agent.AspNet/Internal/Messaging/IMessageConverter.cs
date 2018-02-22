using System;

namespace Glimpse.Agent.Internal.Messaging
{
    public interface IMessageConverter
    {
        IMessage ConvertMessage(object payload, MessageContext context, int ordinal, TimeSpan offset);
    }
}