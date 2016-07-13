using System;
using System.Collections.Generic;
using Microsoft.Extensions.Primitives;

namespace Glimpse.Agent.Messages
{
    public class WebResponseMessage
    {
        [PromoteToUrl]
        public string Url { get; set; }

        [PromoteToContentType]
        public string ContentType { get; set; }

        [PromoteToStatusCode]
        public int StatusCode { get; set; }

        public IReadOnlyDictionary<string, StringValues> Headers { get; set; }

        [PromoteToDuration]
        public double? Duration { get; set; }

        public DateTime EndTime { get; set; }
    }
}