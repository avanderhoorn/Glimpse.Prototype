using System;

namespace Glimpse.Agent.Messages
{
    public class AfterActionInvokedMessage
    {
        public string ActionId { get; set; }

        public string ActionName { get; set; }

        public string ActionControllerName { get; set; }

        public DateTime ActionInvokedEndTime { get; set; }

        public TimeSpan ActionInvokedDuration { get; set; }

        public TimeSpan? ActionInvokedOffset { get; set; }
    }
}