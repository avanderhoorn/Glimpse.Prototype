using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Glimpse.Agent.Messages
{
    public class WebBody
    {
        public long Size { get; set; }

        public string Content { get; set; }

        public string Encoding { get; set; }

        public bool IsTruncated { get; set; }
    }
}
