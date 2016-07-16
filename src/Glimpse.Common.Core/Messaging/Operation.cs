using System;
using System.Diagnostics;

namespace Glimpse.Messaging
{
    public class Operation
    {
        public Operation(object item, DateTime start, TimeSpan? offset)
        {
            Item = item;
            Start = start;
            Offset = offset;
            Timer = Stopwatch.StartNew();
        }

        public object Item { get; set; }

        public DateTime Start { get; }

        public TimeSpan? Offset { get; set; }

        public Stopwatch Timer { get; }
    }
}
