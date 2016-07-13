using System;
using System.Collections.Generic;
using System.Reflection;

namespace Glimpse.Platform
{
    public interface ITypeService
    {
        IEnumerable<object> Resolve(Type targetType);

        IEnumerable<T> Resolve<T>();

        IEnumerable<object> Resolve(string coreLibrary, Type targetType);

        IEnumerable<T> Resolve<T>(string coreLibrary);
    
        IEnumerable<object> Resolve(IEnumerable<Assembly> assemblies, Type targetType);

        IEnumerable<T> Resolve<T>(IEnumerable<Assembly> assemblies);

        IEnumerable<TypeInfo> ResolveTypes(Type targetType);

        IEnumerable<TypeInfo> ResolveTypes<T>();

        IEnumerable<TypeInfo> ResolveTypes(string coreLibrary, Type targetType);

        IEnumerable<TypeInfo> ResolveTypes<T>(string coreLibrary);

        IEnumerable<TypeInfo> ResolveTypes(IEnumerable<Assembly> assemblies, Type targetType);

        IEnumerable<TypeInfo> ResolveTypes<T>(IEnumerable<Assembly> assemblies);
    }
}