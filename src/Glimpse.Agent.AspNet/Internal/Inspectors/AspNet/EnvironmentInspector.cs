using System;
using System.Runtime.InteropServices;
using Glimpse.Agent.AspNet.Messages;
using Glimpse.Agent.Inspectors;
using Microsoft.AspNetCore.Http;

namespace Glimpse.Agent.Internal.Inspectors
{
    public class EnvironmentInspector : Inspector
    {
        private readonly IAgentBroker _broker;
        private EnvironmentMessage _message;

        public EnvironmentInspector(IAgentBroker broker)
        {
            _broker = broker;
        }

        public override void Before(HttpContext context)
        {
            if (_message == null)
            {
                var time = DateTimeOffset.Now;
                var timeZoneInfo = TimeZoneInfo.Local;
                var isDaylightSavingTime = timeZoneInfo.IsDaylightSavingTime(time);

                _message = new EnvironmentMessage
                {
                    ServerName = Environment.MachineName,
                    ServerTime = time.ToString("yyyy'-'MM'-'dd'T'HH':'mm':'ss'.'fff"),
                    ServerTimezoneOffset = time.ToString("zzz"),
                    ServerDaylightSavingTime = isDaylightSavingTime,
                    FrameworkDescription = RuntimeInformation.FrameworkDescription,
                    ProcessArchitecture = RuntimeInformation.ProcessArchitecture.ToString(),
                    OSDescription = RuntimeInformation.OSDescription,
                    OSArchitecture = RuntimeInformation.OSArchitecture.ToString()
                };
            }
            
            _broker.SendMessage(_message);
        }
    }
}
