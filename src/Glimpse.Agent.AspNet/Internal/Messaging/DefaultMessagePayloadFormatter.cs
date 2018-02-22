using System.Linq;
using Glimpse.Common.Internal.Serialization;
using Glimpse.Internal.Extensions;
using Newtonsoft.Json;

namespace Glimpse.Agent.Internal.Messaging
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

            return $"{{\"id\":\"{message.Id.ToString("N")}\",\"ordinal\":{message.Ordinal},\"types\":{messageTypes},\"payload\":{content},\"context\":{messageContext},\"offset\":{message.Offset},\"agent\":{{\"source\":\"{message.Agent.Soruce}\"}}}}";
        }

        public virtual string SerializeCore(object payload)
        {
            return _jsonSerializer.Serialize(payload);
        }
    }
}