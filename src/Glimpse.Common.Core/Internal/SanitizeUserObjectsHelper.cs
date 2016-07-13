using System;
using System.Collections.Generic;
using System.Reflection;

namespace Glimpse.Internal
{
    public class SanitizeUserObjectsHelper
    {
        public static int _maxLength = 100;
        public static HashSet<Type> _safeTypes = new HashSet<Type>
            {
                typeof(Decimal),
                typeof(DateTime),
                typeof(DateTimeOffset),
                typeof(TimeSpan),
                typeof(Guid)
            }; 

        public static object GetSafeObject(object item)
        {
            if (item == null)
            {
                return null;
            }

            var type = item.GetType();

            var typeInfo = type.GetTypeInfo();
            if (typeInfo.IsPrimitive || _safeTypes.Contains(type))
            {
                return item;
            }

            if (type == typeof(string))
            {
                var stringItem = item.ToString();
                
                return stringItem.Length <= _maxLength ? stringItem : stringItem.Substring(0, _maxLength);
            }

            return TypeNameHelper.GetTypeDisplayName(item);
        }
    }
}
