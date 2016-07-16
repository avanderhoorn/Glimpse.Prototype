using System.ComponentModel;
using System.Globalization;
using System.IO;
using System.Text;
using Glimpse.Internal.Serialization;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using GuidConverter = Glimpse.Internal.Serialization.GuidConverter;
using TimeSpanConverter = Glimpse.Internal.Serialization.TimeSpanConverter;

namespace Glimpse.Internal.Extensions
{
    public static class JsonSerializerExtensions
    {
        // TODO: Can we make this more performant? What about with better allocations?
        [EditorBrowsable(EditorBrowsableState.Never)]
        public static string Serialize(this JsonSerializer jsonSerializer, object data)
        {
            // Brought across from - https://github.com/JamesNK/Newtonsoft.Json/blob/master/Src/Newtonsoft.Json/JsonConvert.cs#L635
            var stringBuilder = new StringBuilder(256);
            using (var stringWriter = new StringWriter(stringBuilder, CultureInfo.InvariantCulture))
            using (var jsonWriter = new JsonTextWriter(stringWriter))
            {
                jsonSerializer.Serialize(jsonWriter, data, data.GetType());

                return stringWriter.ToString();
            }
        }

        public static void Configure(this JsonSerializer jsonSerializer)
        {
            jsonSerializer.ContractResolver = new CamelCasePropertyNamesContractResolver();
            jsonSerializer.Converters.Add(new TimeSpanConverter());
            jsonSerializer.Converters.Add(new StringValuesConverter());
            jsonSerializer.Converters.Add(new GuidConverter());
        }
    }
}