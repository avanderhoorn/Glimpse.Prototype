using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Reflection;

namespace Glimpse.Internal.Extensions
{
    [EditorBrowsable(EditorBrowsableState.Never)]
    public static class TypeExtension
    {
        public static IEnumerable<Type> GetInheritancHierarchy(this Type target)
        {
            for (var next = target; next != null; next = next.GetTypeInfo().BaseType)
            {
                yield return next;
            }
        }
    }
}
