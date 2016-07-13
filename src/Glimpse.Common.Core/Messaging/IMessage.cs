using System;
using System.Collections.Generic;

namespace Glimpse
{
    public interface IMessage
    {
        Guid Id { get; }

        IEnumerable<string> Types { get; }

        string Payload { get; }

        int Ordinal { get; }

        MessageContext Context { get; }
        
        IReadOnlyDictionary<string, object> Indices { get; }
    }
}
