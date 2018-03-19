using System.Collections.Generic;

namespace Glimpse.Agent.Messages
{
    public interface IActionContentMessage
    {
        IReadOnlyList<BindingData> Binding { get; }
    }
}