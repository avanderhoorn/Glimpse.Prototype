using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Glimpse.Agent.Messages
{
    public class MiddlewareEndExceptionMessage : MiddlewareEndMessage, IExceptionMessage
    {
        public bool ExceptionIsHandelled { get; set; }

        public string ExceptionTypeName { get; set; }

        public string ExceptionMessage { get; set; }

        public IEnumerable<ExceptionDetails> ExceptionDetails { get; set; }
    }
}
