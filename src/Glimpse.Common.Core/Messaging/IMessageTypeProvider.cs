using System.Collections.Generic;

namespace Glimpse.Messaging
{
    public interface IMessageTypeProvider
    {
        IEnumerable<string> Types { get; }
    }
}