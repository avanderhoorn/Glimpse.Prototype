using System;
using System.Collections.Generic;

namespace Glimpse.Agent.Messages
{
    public class ActionViewNotFoundMessage : ActionViewFoundMessage
    {
        public IEnumerable<string> ViewSearchedLocations { get; set; }
    }
}