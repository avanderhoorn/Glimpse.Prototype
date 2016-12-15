using System;
using System.Diagnostics;

namespace Glimpse.Internal
{
    public class OperationTiming<T>
    {
        public OperationTiming(Operation operation)
            : this((T)operation.Item, operation.Start, DateTime.UtcNow, operation.Timer, operation.Offset)
        {
        }

        public OperationTiming(T item, DateTime start, DateTime end, Stopwatch timer, TimeSpan? offset)
        {
            timer.Stop();

            Item = item;
            Offset = offset;
            Start = start;
            End = end;
            Elapsed = timer.Elapsed;

            timer.Stop();
        }

        public T Item { get; }

        public TimeSpan? Offset { get; }

        public DateTime Start { get; }

        public DateTime End { get; }

        public TimeSpan Elapsed { get; }
    }
}
