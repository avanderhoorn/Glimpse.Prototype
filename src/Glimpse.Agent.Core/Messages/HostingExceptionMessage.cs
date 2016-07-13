using System.Collections.Generic;

namespace Glimpse.Agent.Messages
{
    public class HostingExceptionMessage : EndRequestMessage, IExceptionMessage
    {
        public bool ExceptionIsHandelled { get; set; }

        public string ExceptionTypeName { get; set; }

        public string ExceptionMessage { get; set; }

        public IEnumerable<ExceptionDetails> ExceptionDetails { get; set; }
    }
}
