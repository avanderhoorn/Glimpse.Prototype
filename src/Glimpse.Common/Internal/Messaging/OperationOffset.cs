using System;
using System.Diagnostics;

namespace Glimpse.Common.Internal.Messaging
{
    public class OperationOffset
    {
        private Stopwatch _timer;

        public OperationOffset()
            : this(DateTime.UtcNow)
        {
        }

        public OperationOffset(DateTime startTime)
        {
            StartTime = startTime;
            _timer = new Stopwatch();
            _timer.Start();
        }

        public TimeSpan Elapsed => _timer.Elapsed;

        public DateTime StartTime { get; set; }
    }
}
