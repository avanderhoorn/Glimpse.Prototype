using System;
using System.Collections.Generic;

namespace Glimpse.Agent.Messages
{
    public class ActionViewFoundMessage
    {
        public string ActionId { get; set; }

        public string ActionName { get; set; }

        public string ActionControllerName { get; set; }

        public string ViewName { get; set; }
        
        public DateTime ViewSearchedTime { get; set; }

        public bool ViewDidFind { get; set; }
    }
}