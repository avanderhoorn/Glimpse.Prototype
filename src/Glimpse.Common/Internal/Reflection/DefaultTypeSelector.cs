using System;
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
                .SelectMany(GetLoadableTypes)
                .Where(t => t.IsClass &&
                        !t.IsAbstract &&
                        !t.ContainsGenericParameters &&
                        targetTypeInfo.IsAssignableFrom(t));

            return types;
        }

        private static IEnumerable<TypeInfo> GetLoadableTypes(Assembly assembly)
        {
            try
            {
                return assembly.DefinedTypes;
            }
            catch (ReflectionTypeLoadException e)
            {
                return e.Types.Where(t => t != null).Select(t => t.GetTypeInfo());
            }
            catch (Exception)
            {
                return Enumerable.Empty<TypeInfo>();
            }
        }
    }
}