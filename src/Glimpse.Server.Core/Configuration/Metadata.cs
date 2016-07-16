using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using Glimpse.Internal.Extensions;

namespace Glimpse.Server.Configuration
{
    public class Metadata
    {
        public Metadata(IDictionary<string, string> resources)
        {
            Resources = new ReadOnlyDictionary<string, string>(resources);
        }

        public IReadOnlyDictionary<string, string> Resources { get; set; }

        public string Hash
        {
            get { return string.Join("&", Resources.Select(r => $"{r.Key}={r.Value}")).Crc32().ToLower(); }
        }
    }
}