using System;
using Newtonsoft.Json;

namespace Glimpse.Internal.Serialization
{
    public class TimeSpanConverter : JsonConverter
    {
        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            var result = 0.0;
            
            var convertedNullable = value as TimeSpan?; 
            if (convertedNullable.HasValue)
            {
                result = Math.Round(convertedNullable.Value.TotalMilliseconds, 2);
            }
            
            writer.WriteRawValue(result.ToString());
        }

        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            return reader.Value;
        }

        public override bool CanConvert(Type objectType)
        {
            return objectType == typeof(TimeSpan) || objectType == typeof(TimeSpan?);
        }
    }
}
