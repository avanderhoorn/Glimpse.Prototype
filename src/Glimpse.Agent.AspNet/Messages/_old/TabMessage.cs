using System.Collections.Generic;
using System.Linq;
using Glimpse.Common.Messaging;

namespace Glimpse.Agent.AspNet.Messages
{
    public class TabMessage : IMessageTypeProvider
    {
        public TabMessage(string name, object data)
        {
            Name = name;
            Data = data;
        }

        public string Name { get; }

        public object Data { get; }

        public IEnumerable<string> Types => string.IsNullOrWhiteSpace(Name) ? Enumerable.Empty<string>() : new[] { Name };
    }
}
