using System;

namespace Glimpse.Agent.Messages
{
    public class MiddlewareStartMessage : CorrelationBeginMessage
    {
        public string Name { get; set; }

        public string PackageName { get; set; }

        public string DisplaName { get; set; }
    }
}
