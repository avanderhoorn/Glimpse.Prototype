using System;
using System.Collections.Generic;
using Microsoft.Extensions.Primitives;

namespace Glimpse.Agent.Messages
{
    public class WebRequestMessage
    {
        [PromoteToUrl]
        public string Url { get; set; }

        [PromoteToMethod]
        public string Method { get; set; }

        public IReadOnlyDictionary<string, StringValues> Headers { get; set; }

        [PromoteToDateTime]
        public DateTime StartTime { get; set; }

        public bool IsAjax { get; set; }
    }
}