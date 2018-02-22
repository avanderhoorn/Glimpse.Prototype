using Glimpse.Agent.Messages;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Glimpse.Agent.Internal.Inspectors
{
    public class Logger : ILogger
    {
        public Logger(string name, IGlimpseAgent agent, Func<string, LogLevel, bool> filter)
        {
            CategoryName = name;
            Agent = agent;
            Filter = filter;
        }

        private string CategoryName { get; }

        private IGlimpseAgent Agent { get; }

        private Func<string, LogLevel, bool> Filter { get; }

        public IDisposable BeginScope<TState>(TState state)
        {
            return null;
        }
        
        public bool IsEnabled(LogLevel logLevel)
        {
            return Filter(CategoryName, logLevel) && Agent.IsEnabled();
        }
        
        public void Log<TState>(LogLevel logLevel, EventId eventId, TState state, Exception exception, Func<TState, Exception, string> formatter)
        {
            if (IsEnabled(logLevel))
            {
                var message = new LogWriteMessage();
                message.Level = logLevel.ToString(); // TODO: validate that this gives us the correct value
                message.Category = CategoryName;
                message.Message = formatter(state, exception); // TODO: need to work on breaking out formatting

                //var structure = state as IEnumerable<KeyValuePair<string, object>>;
                //if (structure != null)
                //{
                //    message.Message = new[] { message.Message, structure };
                //}

                Agent.Broker.SendMessage(message);
            }
        }
    }
}
