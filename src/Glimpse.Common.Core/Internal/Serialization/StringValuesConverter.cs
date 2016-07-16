using System;
using Microsoft.Extensions.Primitives;
using Newtonsoft.Json;

namespace Glimpse.Internal.Serialization
{
    public class StringValuesConverter : JsonConverter
    {
        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            writer.WriteValue(value?.ToString());
        }

        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            return reader.Value;
        }

        public override bool CanConvert(Type objectType)
        {
            return objectType == typeof(StringValues);
        }
    }
}
