using System.Collections.Generic;

namespace Glimpse.Agent.Messaging
{
    public interface IMessageTypeProcessor
    {
        IEnumerable<string> Derive(object payload);
    }
}