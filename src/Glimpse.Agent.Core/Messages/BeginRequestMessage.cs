using System;
using System.Collections.Generic;
using Microsoft.Extensions.Primitives;

namespace Glimpse.Agent.Messages
{
    public class BeginRequestMessage
    {
        [PromoteToUrl]
        public string RequestUrl { get; set; }

        public string RequestPath { get; set; }

        public string RequestQueryString { get; set; }

        [PromoteToMethod]
        public string RequestMethod { get; set; }

        public IReadOnlyDictionary<string, StringValues> RequestHeaders { get; set; }

        public long? RequestContentLength { get; set; }

        public string RequestContentType { get; set; }

        [PromoteToDateTime]
        public DateTime RequestStartTime { get; set; }

        public bool RequestIsAjax { get; set; }
    }
}