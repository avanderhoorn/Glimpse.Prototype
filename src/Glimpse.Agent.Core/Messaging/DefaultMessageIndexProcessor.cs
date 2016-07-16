using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;

namespace Glimpse.Agent.Messaging
{
    public class DefaultMessageIndexProcessor : IMessageIndexProcessor
    {
        private static readonly Type _objectType = typeof(object);
        private static readonly Type _dictionaryType = typeof(Dictionary<string, object>);
        private static readonly MethodInfo _addMethodInfo = _dictionaryType.GetMethod("Add", new[] { typeof(string), typeof(object) });
        private static readonly ConstructorInfo _constructorInfo = typeof(ReadOnlyDictionary<string, object>).GetConstructor(new[] { _dictionaryType });
        private static readonly ConcurrentDictionary<Type, Func<object, IReadOnlyDictionary<string, object>>> _methodCache = new ConcurrentDictionary<Type, Func<object, IReadOnlyDictionary<string, object>>>();

        public virtual IReadOnlyDictionary<string, object> Derive(object payload)
        {
            var payloadType = payload.GetType();

            var indicesCreator = _methodCache.GetOrAdd(payloadType, GenerateIndicesCreator);

            return indicesCreator(payload);
        }

        private static Func<object, IReadOnlyDictionary<string, object>> GenerateIndicesCreator(Type messageType)
        {
            /* Creates a func that looks something like this:
            ** Func<object, IReadOnlyDictionary<string, object>> lambda = message =>
            ** {
            **     var casted = (<Message Type>) message;
            **     return new ReadOnlyDictionary<string, object>(new Dictionary<string, object>
            **     {
            **         { "<PromoteToAttribute.Key>", message.<Property Name> },
            **         ... // Repeat as many times as necessary
            **     });
            ** };
            */

            var parameter = Expression.Parameter(_objectType, "message");
            var variable = Expression.Variable(messageType, "casted");
            var cast = Expression.Assign(variable, Expression.Convert(parameter, messageType));
            var items = new List<ElementInit>();

            foreach (var property in messageType.GetProperties())
            {
                var attribute = property.GetCustomAttributes(typeof(PromoteToAttribute), true)
                    .Cast<PromoteToAttribute>()
                    .SingleOrDefault();
                if (attribute != null)
                {
                    items.Add(Expression.ElementInit(_addMethodInfo, Expression.Constant(attribute.Key),
                        Expression.Convert(Expression.Property(variable, property.Name), _objectType)));
                }
            }

            var ctor = Expression.New(_dictionaryType);

            var initItems = items.Count > 0;
            ListInitExpression init = null;
            if (initItems)
            {
                init = Expression.ListInit(ctor, items);
            }

            var wrapped = Expression.New(_constructorInfo, initItems ? (Expression)init : ctor);

            var code = Expression.Block(new[] { variable }, cast, initItems ? (Expression)init : ctor, wrapped);

            var lambda = Expression.Lambda<Func<object, IReadOnlyDictionary<string, object>>>(code, parameter);

            return lambda.Compile();
        }
    }
}