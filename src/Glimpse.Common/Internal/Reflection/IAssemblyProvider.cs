using System.Collections.Generic;
using System.Reflection;

namespace Glimpse.Internal
{
    public interface IAssemblyProvider
    {
        IEnumerable<Assembly> GetCandidateAssemblies(string coreLibrary);
    }
}