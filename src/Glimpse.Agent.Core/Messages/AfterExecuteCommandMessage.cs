using System;

namespace Glimpse.Agent.Messages
{
    public class AfterExecuteCommandMessage
    {
        public bool CommandHadException { get; set; }

        public DateTime CommandEndTime { get; set; }

        public TimeSpan CommandDuration { get; set; }
        
        public TimeSpan? CommandOffset { get; set; }
    }

    public class AfterExecuteCommandExceptionMessage : AfterExecuteCommandMessage
    {
        // TODO: Need to decide what I want to pull out here
        //public bool CommandHadException { get; set; }
    }
}
