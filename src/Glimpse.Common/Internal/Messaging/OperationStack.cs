using System;
using Glimpse.Common.Internal.Messaging;

namespace Glimpse.Internal
{
    public class OperationStack
    {
        private static readonly ContextData<OperationChain> _chainContext = new ContextData<OperationChain>();
        private static readonly ContextData<OperationOffset> _offsetContext = new ContextData<OperationOffset>();

        public OperationStack()
        {
        }

        public static void StartOffset()
        {
            StartOffset(DateTime.UtcNow);
        }
        public static void StartOffset(DateTime startTime)
        {
            var operationOffset = new OperationOffset(startTime);
            _offsetContext.Value = operationOffset;
        }

        public static TimeSpan GetOffset()
        {
            return _offsetContext.Value != null ? _offsetContext.Value.Elapsed : TimeSpan.Zero;
        }

        public static void PushOperation(object item)
        {
            PushOperation(item, DateTime.UtcNow);
        }

        public static void PushOperation(object item, DateTime dateTime)
        {
            var offset = _offsetContext.Value?.Elapsed;
            var operation = new Operation(item, dateTime, offset);

            var next = new OperationChain()
            {
                Operation = operation,
                Next = _chainContext.Value
            };

            _chainContext.Value = next;
        }

        public static OperationTiming<T> PopOperation<T>()
        {
            var current = _chainContext.Value;
            _chainContext.Value = current?.Next;

            // TODO: this should never be null... so need to log this out
            return current == null ? null : new OperationTiming<T>(current.Operation);
        }

        private class OperationChain
        {
            public Operation Operation { get; set; }

            public OperationChain Next { get; set; }
        }
    }
}
