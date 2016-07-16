using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Reflection;

namespace Glimpse.Internal.Extensions
{
    [EditorBrowsable(EditorBrowsableState.Never)]
    public static class ReflectionExtensions
    {
        public static IEnumerable<Type> BaseTypes(this TypeInfo typeInfo, bool includeSelf = false)
        {
            if (includeSelf)
                yield return typeInfo.AsType();

            var baseType = typeInfo.BaseType;

            while (baseType != null)
            {
                yield return baseType;

                baseType = baseType.GetTypeInfo().BaseType;
            }
        }

        public static string KebabCase(this Type type)
        {
            var result = type.Name.KebabCase();
            
            if (type.GetTypeInfo().IsInterface && result[0] == 'i')
                return result.Substring(1); // Handle IFooBar -> foo-bar case

            return result;
        }
    }
}
