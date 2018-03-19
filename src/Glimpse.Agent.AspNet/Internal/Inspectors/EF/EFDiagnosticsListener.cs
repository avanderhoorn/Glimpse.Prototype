using System;
using System.Collections.Generic;
using System.Linq;
using Glimpse.Agent.Internal.Inspectors.EF.Proxies;
using Glimpse.Agent.Messages;
using Microsoft.Extensions.DiagnosticAdapter;
using Microsoft.Extensions.Logging;

namespace Glimpse.Agent.Internal.Inspectors
{
    public partial class WebDiagnosticsListener
    {
        [DiagnosticName("Microsoft.EntityFrameworkCore.BeforeExecuteCommand")]
        public void OnBeforeExecuteCommand(IDbCommand command, string executeMethod, bool isAsync)
        {
            var startDateTime = DateTime.UtcNow;

            var message = new BeforeExecuteCommandMessage
            {
                CommandMethod = executeMethod,
                CommandIsAsync = isAsync,
                CommandText = command.CommandText,
                //CommandType = command.CommandType,
                //CommandParameters = command.Parameters,
                CommandStartTime = startDateTime
            };

            _broker.BeginLogicalOperation(message, startDateTime);
            _broker.SendMessage(message);
        }

        [DiagnosticName("Microsoft.EntityFrameworkCore.AfterExecuteCommand")]
        public void OnAfterExecuteCommand(IDbCommand command, string executeMethod, bool isAsync)
        {
            var timing = _broker.EndLogicalOperation<BeforeExecuteCommandMessage>();
            if (timing != null)
            {
                var message = new AfterExecuteCommandMessage
                {
                    CommandHadException = false,
                    CommandDuration = timing.Elapsed,
                    CommandEndTime = timing.End,
                    CommandOffset = timing.Offset
                };

                _broker.SendMessage(message);
            }
            else
            {
                _logger.LogCritical("OnAfterExecuteCommand: Couldn't publish `AfterExecuteCommandMessage` as `BeforeExecuteCommandMessage` wasn't found in stack");
            }
        }

        [DiagnosticName("Microsoft.EntityFrameworkCore.CommandExecutionError")]
        public void OnAfterExecuteCommand(IDbCommand command, string executeMethod, bool isAsync, Exception exception)
        {
            var timing = _broker.EndLogicalOperation<BeforeExecuteCommandMessage>();
            if (timing != null)
            {
                var message = new AfterExecuteCommandExceptionMessage
                {
                    //Exception = exception,
                    CommandHadException = true,
                    CommandDuration = timing.Elapsed,
                    CommandEndTime = timing.End,
                    CommandOffset = timing.Offset
                };

                _broker.SendMessage(message);
            }
            else
            {
                _logger.LogCritical("OnAfterExecuteCommand: Couldn't publish `AfterExecuteCommandExceptionMessage` as `BeforeExecuteCommandMessage` wasn't found in stack");
            }
        }
    }
}
