using System;

namespace Glimpse.Agent.Messages
{
    public class AfterActionResultMessage
    {
        public string ActionId { get; set; }

        public string ActionName { get; set; }

        public string ActionControllerName { get; set; }

        public DateTime ActionResultEndTime { get; set; }

        public TimeSpan ActionResultDuration { get; set; }

        public TimeSpan? ActionResultOffset { get; set; }
    }
}