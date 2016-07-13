using System;
using System.Collections.Generic;

namespace Glimpse.Agent.Messaging
{
    public class DefaultMessageConverter : IMessageConverter
    {
        public DefaultMessageConverter(IMessagePayloadFormatter payloadFormatter, IMessageIndexProcessor indexProcessor, IMessageTypeProcessor typeProcessor)
        {
            PayloadFormatter = payloadFormatter;
            IndexProcessor = indexProcessor;
            TypeProcessor = typeProcessor;
        }

        private IMessagePayloadFormatter PayloadFormatter { get; }

        private IMessageIndexProcessor IndexProcessor { get; }

        private IMessageTypeProcessor TypeProcessor { get; }

        public IMessage ConvertMessage(object payload, MessageContext context, int ordinal)
        {
            var message = new Message
            {
                Id = Guid.NewGuid(),
                Ordinal = ordinal,
                Types = GetTypes(payload),
                Context = context,
                Indices = GetIndices(payload)
            };

            message.Payload = GetPayload(message, payload);
            
            return message;
        }

        private string GetPayload(Message message, object payload)
        {
            return PayloadFormatter.Serialize(message, payload);
        }

        private IReadOnlyDictionary<string, object> GetIndices(object payload)
        {
            return IndexProcessor.Derive(payload);
        }

        private IEnumerable<string> GetTypes(object payload)
        {
            return TypeProcessor.Derive(payload);
        }
    }
}