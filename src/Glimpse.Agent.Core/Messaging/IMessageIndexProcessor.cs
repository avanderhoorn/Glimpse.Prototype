using System.Collections.Generic;

namespace Glimpse.Agent.Messaging
{
    public interface IMessageIndexProcessor
    {
        IReadOnlyDictionary<string, object> Derive(object payload);
    }
}