using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;

namespace Glimpse
{
    public class Message : IMessage
    {
        // Default indices to avoid unecissary allocations
        private static readonly IReadOnlyDictionary<string, object> _defaultIndices = new ReadOnlyDictionary<string, object>(new Dictionary<string, object>());
        private IReadOnlyDictionary<string, object> _indices = _defaultIndices;

        public Guid Id { get; set; }

        public IEnumerable<string> Types { get; set; } = Enumerable.Empty<string>();

        public string Payload { get; set; }

        public int Ordinal { get; set; } = 0;

        public MessageContext Context { get; set; }
        
        public IReadOnlyDictionary<string, object> Indices
        {
            get { return _indices; }
            set { _indices = value; }
        }
    }
}