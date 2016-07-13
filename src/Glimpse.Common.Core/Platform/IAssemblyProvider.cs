using System;
using System.Collections.Generic;
using System.Reflection;

namespace Glimpse.Platform
{
    public interface IAssemblyProvider
    {
        IEnumerable<Assembly> GetCandidateAssemblies(string coreLibrary);
    }
}