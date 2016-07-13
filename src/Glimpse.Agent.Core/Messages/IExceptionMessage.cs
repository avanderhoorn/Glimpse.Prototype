using System.Collections.Generic;

namespace Glimpse.Agent.Messages
{
    public interface IExceptionMessage
    {
        bool ExceptionIsHandelled { get; set; }

        string ExceptionTypeName { get; set; }

        string ExceptionMessage { get; set; }

        IEnumerable<ExceptionDetails> ExceptionDetails { get; set; }
    }
}