using System;

namespace Glimpse.Messaging
{
    public struct Timing
    {
        public Timing(DateTime start, DateTime end, TimeSpan elapsed)
        {
            Start = start;
            End = end;
            Elapsed = elapsed;
        }

        public DateTime Start { get; set; }

        public DateTime End { get; set; }

        public TimeSpan Elapsed { get; set; }
    }
}
