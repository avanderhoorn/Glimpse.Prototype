using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Glimpse.Internal;
using Microsoft.Extensions.DependencyInjection;

namespace Glimpse.Platform
{
    public class DefaultTypeActivator : ITypeActivator
    {
        private readonly IServiceProvider _serviceProvider;

        public DefaultTypeActivator(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        public object CreateInstance(Type instanceType, params object[] parameters)
        { 
            var activated = ActivatorUtilities.CreateInstance(_serviceProvider, instanceType, parameters);

            return activated;
        }

        public T CreateInstance<T>(params object[] parameters)
        {
            var activated = ActivatorUtilities.CreateInstance(_serviceProvider, typeof(T), parameters);

            return (T)activated;
        }

        public IEnumerable<object> CreateInstances(IEnumerable<TypeInfo> types)
        {
            var activated = types.Select(CreateInstance).Where(o => o != null);

            return activated;
        }

        public IEnumerable<T> CreateInstances<T>(IEnumerable<TypeInfo> types)
        {
            var activated = types.Select(t => (T)CreateInstance(t)).Where(o => o != null);

            return activated;
        }

        private object CreateInstance(TypeInfo type)
        {
            try
            {
                return ActivatorUtilities.CreateInstance(_serviceProvider, type.AsType());
            }
            catch (Exception)
            {
                // TODO: Notify user of failure somehow
                return null;
            }
        }
    }
}