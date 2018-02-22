using System;
using System.Collections.Generic;

namespace Glimpse.Agent.Messages
{
    public class BeforeViewComponentMessage
    {
        public string ComponentId { get; set; }
        public string ComponentDisplayName { get; set; }
        public string ComponentName { get; set; }
        public DateTime ComponentStartTime { get; set; }
        public IReadOnlyList<ArgumentData> Arguments { get; set; }
    }
}
