using System.Collections.Generic;

namespace Glimpse.Platform
{
    public interface IExtensionProvider<T>
        where T : class
    {
        IEnumerable<T> Instances { get; }
    }
}
