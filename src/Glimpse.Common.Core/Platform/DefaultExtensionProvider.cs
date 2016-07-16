using System.Collections.Generic;
using System.Linq;
using Glimpse.Initialization;
using Glimpse.Internal;

namespace Glimpse.Platform
{
    public class DefaultExtensionProvider<T> : IExtensionProvider<T>
        where T : class
    {
        private readonly ITypeService _typeService;

        public DefaultExtensionProvider(ITypeService typeService)
        {
            _typeService = typeService;
        }

        public IEnumerable<T> Instances
        {
            get { return _typeService.Resolve<T>().ToArray(); }
        }
    }
}
