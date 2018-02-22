using System;
using Glimpse.Common.Internal.Messaging;
using Glimpse.Internal;

namespace Glimpse.Agent
{
    public static class AgentBrokerExtensions
    {
        public static void StartOffsetOperation(this IAgentBroker broker)
        {
            OperationStack.StartOffset();
        }
        public static void StartOffsetOperation(this IAgentBroker broker, DateTime startTime)
        {
            OperationStack.StartOffset(startTime);
        }

        public static TimeSpan GetOffset(this IAgentBroker broker)
        {
            return OperationStack.GetOffset();
        }

        public static void BeginLogicalOperation(this IAgentBroker broker, object message)
        {
            OperationStack.PushOperation(message);
        }

        public static void BeginLogicalOperation(this IAgentBroker broker, object message, DateTime dateTime)
        {
            OperationStack.PushOperation(message, dateTime);
        }

        public static OperationTiming<T> EndLogicalOperation<T>(this IAgentBroker broker)
        {
            var timing = OperationStack.PopOperation<T>();
            return timing;
        }
    }
}
