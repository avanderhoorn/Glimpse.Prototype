using Microsoft.Extensions.PlatformAbstractions;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace Glimpse.Platform
{
    public class LibraryManagerAssemblyProvider : IAssemblyProvider
    {
        private readonly ILibraryManager _manager;

        public LibraryManagerAssemblyProvider(ILibraryManager manager)
        {
            _manager = manager;
        }

        public IEnumerable<Assembly> GetCandidateAssemblies(string coreLibrary)
        {
            var libraries = _manager.GetReferencingLibraries(coreLibrary);
            var assemblyNames = libraries.SelectMany(l => l.Assemblies);
            var assemblies = assemblyNames.Select(x => Assembly.Load(x));

            return assemblies;
        }
    }
}