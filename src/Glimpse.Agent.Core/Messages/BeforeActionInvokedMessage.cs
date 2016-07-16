using System;
using System.Collections.Generic;

namespace Glimpse.Agent.Messages
{
    public class BeforeActionInvokedMessage : IActionContentMessage
    {
        public string ActionId { get; set; }

        public string ActionDisplayName { get; set; }

        public string ActionName { get; set; }

        public string ActionControllerName { get; set; }
        
        public string ActionTargetClass { get; set; }

        public string ActionTargetMethod { get; set; }

        public DateTime ActionInvokedStartTime { get; set; }

        public IReadOnlyList<BindingData> Binding { get; set; }
    }
}
