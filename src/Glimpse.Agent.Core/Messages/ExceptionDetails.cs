using System;
using System.Collections.Generic;

namespace Glimpse.Agent.Messages
{
    public class ExceptionDetails
    {
        public Type Type { get; set; }

        public string TypeName { get; set; }

        public string Message { get; set; }

        public string RawException { get; set; }

        /// <summary>
        /// The generated stack frames
        /// </summary>
        public IEnumerable<StackFrame> StackFrames { get; set; }
    }
}