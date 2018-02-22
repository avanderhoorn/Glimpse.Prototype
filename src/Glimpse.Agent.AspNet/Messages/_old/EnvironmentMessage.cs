using System.Collections;

namespace Glimpse.Agent.AspNet.Messages
{
    public class EnvironmentMessage
    {
        public string ServerName { get; set; }

        public string ServerTime { get; set; }

        public string ServerTimezoneOffset { get; set; }

        public bool ServerDaylightSavingTime { get; set; }
        
        public string FrameworkDescription { get; set; }

        public string ProcessArchitecture { get; set; }

        public string OSDescription { get; set; }

        public string OSArchitecture { get; set; }
    }
}
