using System;
using System.Collections.Generic;
using System.Reflection;

namespace Glimpse.Platform
{
    public interface ITypeActivator
    {
        object CreateInstance(Type instanceType, params object[] parameters);

        T CreateInstance<T>(params object[] parameters);

        IEnumerable<object> CreateInstances(IEnumerable<TypeInfo> types);

        IEnumerable<T> CreateInstances<T>(IEnumerable<TypeInfo> types);
    }
}