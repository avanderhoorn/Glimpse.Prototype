#if SystemWeb
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace Glimpse.Internal
{
    public class DefaultAssemblyProvider : IAssemblyProvider
    {
        public IEnumerable<Assembly> GetCandidateAssemblies(string coreLibrary)
        {
            return AppDomain.CurrentDomain.GetAssemblies().Where(x => !ReflectionBlackList.IsBlackListed(x));
        }
    }
}
#endif