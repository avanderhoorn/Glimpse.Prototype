using System.Collections.Generic;
using System.Linq;
using Glimpse.Initialization;

namespace Glimpse.Platform
{
    public class FixedExtensionProvider<T> : IExtensionProvider<T>
        where T : class
    {
        public FixedExtensionProvider()
            : this(Enumerable.Empty<T>())
        {
        }

        public FixedExtensionProvider(IEnumerable<T> extensionTypes)
        {
            Instances = new List<T>(extensionTypes);
        }

        public IList<T> Instances { get; }

        IEnumerable<T> IExtensionProvider<T>.Instances => Instances;
    }
}
