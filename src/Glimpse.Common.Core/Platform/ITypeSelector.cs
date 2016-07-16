using System;
using System.Collections.Generic;
using System.Reflection;

namespace Glimpse.Platform
{
    public interface ITypeSelector
    {
        IEnumerable<TypeInfo> FindTypes(IEnumerable<Assembly> targetAssmblies, TypeInfo targetTypeInfo);
    }
}