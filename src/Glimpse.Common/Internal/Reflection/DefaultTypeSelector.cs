using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace Glimpse.Internal
{
    public class DefaultTypeSelector : ITypeSelector
    {
        public IEnumerable<TypeInfo> FindTypes(IEnumerable<Assembly> targetAssmblies, TypeInfo targetTypeInfo)
        {
            var types = targetAssmblies
                .SelectMany(a => a.DefinedTypes)
                .Where(t => t.IsClass &&
                        !t.IsAbstract &&
                        !t.ContainsGenericParameters &&
                        targetTypeInfo.IsAssignableFrom(t));

            return types;
        }
    }
}