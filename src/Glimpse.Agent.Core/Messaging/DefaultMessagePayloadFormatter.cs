using System.Linq;
using Glimpse.Internal.Extensions;
using Glimpse.Internal.Serialization;
using Newtonsoft.Json;

namespace Glimpse.Agent.Messaging
{
    public class DefaultMessagePayloadFormatter : IMessagePayloadFormatter
    {
        private readonly JsonSerializer _jsonSerializer;

        public DefaultMessagePayloadFormatter(IJsonSerializerProvider serializerProvider)
        {
            _jsonSerializer = serializerProvider.GetJsonSerializer();
        }
        
        public virtual string Serialize(IMessage message, object payload)
        {
            var content = SerializeCore(payload);

            // NOTE: Manually seralize things here as we can be 
            //       faster for what we need to do
            var messageTypes = "[" + string.Join(",", message.Types.Select(s => "\"" + s + "\"")) + "]";
            var messageContext = $"{{\"id\":\"{message.Context.Id.ToString("N")}\",\"type\":\"{message.Context.Type}\"}}";

            return $"{{\"id\":\"{message.Id.ToString("N")}\",\"ordinal\":{message.Ordinal},\"types\":{messageTypes},\"payload\":{content},\"context\":{messageContext}}}";
        }

        public virtual string SerializeCore(object payload)
        {
            return _jsonSerializer.Serialize(payload);
        }
    }
}