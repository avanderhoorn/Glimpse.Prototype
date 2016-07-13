using System;
using Newtonsoft.Json;

namespace Glimpse.Internal.Serialization
{
    public class GuidConverter : JsonConverter
    {
        private const string _guidFormat = "N";

        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            var guid = value as Guid?;

            if (guid.HasValue)
                writer.WriteValue(guid.Value.ToString(_guidFormat));
            else
                writer.WriteNull();
        }

        public override bool CanWrite => true;

        public override bool CanRead => false;

        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            throw new NotImplementedException("This method is not required.");
        }

        public override bool CanConvert(Type objectType)
        {
            return objectType == typeof(Guid) || objectType == typeof(Guid?);
        }
    }
}