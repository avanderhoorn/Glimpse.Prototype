using System;
using System.Collections.Generic;
using System.Reflection;
using Glimpse.Internal;

namespace Glimpse.Platform
{
    public class DefaultTypeService : ITypeService
    {
        private readonly ITypeActivator _typesActivator;
        private readonly ITypeSelector _typeDiscovery;
        private readonly IAssemblyProvider _assemblyProvider;
        private readonly string _defaultLibrary = "Glimpse.Common.Core";
         
        public DefaultTypeService(ITypeActivator typesActivator, ITypeSelector typeDiscovery, IAssemblyProvider assemblyProvider)
        {
            _typesActivator = typesActivator;
            _typeDiscovery = typeDiscovery;
            _assemblyProvider = assemblyProvider;
        }
        
        public IEnumerable<object> Resolve(Type targetType)
        {
            return Resolve(_defaultLibrary, targetType);
        }

        public IEnumerable<T> Resolve<T>()
        {
            return Resolve<T>(_defaultLibrary);
        }
        
        public IEnumerable<object> Resolve(string coreLibrary, Type targetType)
        {
            var types = ResolveTypes(coreLibrary, targetType);
            var instances = _typesActivator.CreateInstances(types);

            return instances;
        }

        public IEnumerable<T> Resolve<T>(string coreLibrary)
        {
            var types = ResolveTypes<T>(coreLibrary);
            var instances = _typesActivator.CreateInstances<T>(types);

            return instances;
        }

        public IEnumerable<object> Resolve(IEnumerable<Assembly> assemblies, Type targetType)
        {
            var types = ResolveTypes(assemblies, targetType);
            var instances = _typesActivator.CreateInstances(types);

            return instances;
        }

        public IEnumerable<T> Resolve<T>(IEnumerable<Assembly> assemblies)
        {
            var types = ResolveTypes<T>(assemblies);
            var instances = _typesActivator.CreateInstances<T>(types);

            return instances;
        }

        public IEnumerable<TypeInfo> ResolveTypes(Type targetType)
        {
            return ResolveTypes(_defaultLibrary, targetType);
        }

        public IEnumerable<TypeInfo> ResolveTypes<T>()
        {
            return ResolveTypes<T>(_defaultLibrary);
        }

        public IEnumerable<TypeInfo> ResolveTypes(string coreLibrary, Type targetType)
        {
            var assemblies = _assemblyProvider.GetCandidateAssemblies(coreLibrary);

            return ResolveTypes(assemblies, targetType);
        }

        public IEnumerable<TypeInfo> ResolveTypes<T>(string coreLibrary)
        {
            return ResolveTypes(coreLibrary, typeof(T));
        }

        public IEnumerable<TypeInfo> ResolveTypes(IEnumerable<Assembly> assemblies, Type targetType)
        {
            var types = _typeDiscovery.FindTypes(assemblies, targetType.GetTypeInfo());

            return types;
        }

        public IEnumerable<TypeInfo> ResolveTypes<T>(IEnumerable<Assembly> assemblies)
        {
            return ResolveTypes(assemblies, typeof(T));
        }
    }
}