using System;
using Glimpse.Internal;

namespace Glimpse.Agent
{
    public static class AgentBrokerExtensions
    {
        public static void StartOffsetOperation(this IAgentBroker broker)
        {
            var operations = new OperationStack();
            operations.StartOffset();
        }
        public static void StartOffsetOperation(this IAgentBroker broker, DateTime startTime)
        {
            var operations = new OperationStack();
            operations.StartOffset(startTime);
        }

        public static void BeginLogicalOperation(this IAgentBroker broker, object message)
        {
            var operations = new OperationStack();
            operations.PushOperation(message);
        }

        public static void BeginLogicalOperation(this IAgentBroker broker, object message, DateTime dateTime)
        {
            var operations = new OperationStack();
            operations.PushOperation(message, dateTime);
        }

        public static OperationTiming<T> EndLogicalOperation<T>(this IAgentBroker broker)
        {
            var operations = new OperationStack();
            var timing = operations.PopOperation<T>();
            return timing;
        }
    }
}
