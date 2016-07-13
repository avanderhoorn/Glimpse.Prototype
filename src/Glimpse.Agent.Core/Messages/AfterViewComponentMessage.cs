using System;

namespace Glimpse.Agent.Messages
{
    public class AfterViewComponentMessage
    {
        public string ComponentId { get; set; }
        public string ComponentDisplayName { get; set; }
        public string ComponentName { get; set; }
        public DateTime ComponentEndTime { get; set; }
        public TimeSpan ComponentDuration { get; set; }
        public TimeSpan? ComponentOffset { get; set; }
    }
}