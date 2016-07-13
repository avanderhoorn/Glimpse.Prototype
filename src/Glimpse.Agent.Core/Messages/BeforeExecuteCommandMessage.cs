using System;

namespace Glimpse.Agent.Messages
{
    public class BeforeExecuteCommandMessage
    {
        public string CommandText { get; set; }

        public object CommandType { get; set; }

        public object CommandParameters { get; set; }

        public string CommandMethod { get; set; }

        public bool CommandIsAsync { get; set; }

        public DateTime CommandStartTime { get; set; }
    }
}