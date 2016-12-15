
using System;

namespace Glimpse.Agent.Messages
{
    public class AfterActionMessage
    {
        public string ActionId { get; set; }

        public string ActionName { get; set; }

        public string ActionControllerName { get; set; }

        public DateTime ActionEndTime { get; set; }

        public TimeSpan ActionDuration { get; set; }

        public TimeSpan? ActionOffset { get; set; }
    }
}