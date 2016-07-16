using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using Microsoft.AspNet.Http;

namespace Glimpse.Agent
{
    public class GlimpseAgentOptions
    {
        public GlimpseAgentOptions()
        {
            IgnoredUris = new List<Regex>();
            IgnoredStatusCodes = new List<int>();
            IgnoredContentTypes = new List<string>();
        }

        public IList<Regex> IgnoredUris { get; }

        public IList<int> IgnoredStatusCodes { get; }

        public IList<string> IgnoredContentTypes { get; }

        public Func<HttpContext, bool> ShouldIgnore { get; set; }
    }
}