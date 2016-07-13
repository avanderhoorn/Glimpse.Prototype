using Newtonsoft.Json;

namespace Glimpse.Internal.Serialization
{
    public interface IJsonSerializerProvider
    {
        JsonSerializer GetJsonSerializer();
    }
}
