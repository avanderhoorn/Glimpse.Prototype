using System.Collections;

namespace Glimpse.Agent.AspNet.Messages
{
    public class EnvironmentMessage
    {
        public string ServerName { get; set; }

        public string ServerTime { get; set; }

        public string ServerTimezoneOffset { get; set; }

        public bool ServerDaylightSavingTime { get; set; }

        public string ServerOperatingSystem { get; set; }

        public string RuntimeVersion { get; set; }

        public string RuntimeType { get; set; }

        public string RuntimeArchitecture { get; set; }
    }
}
