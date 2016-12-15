using System.Collections.Generic;
using System.Reflection;

namespace Glimpse.Internal
{
    public interface ITypeSelector
    {
        IEnumerable<TypeInfo> FindTypes(IEnumerable<Assembly> targetAssmblies, TypeInfo targetTypeInfo);
    }
}