using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SystemWebAdapter.Internal
{
    public class ItemsDictionary : IDictionary<object, object>
    {
        public ItemsDictionary(IDictionary items)
        {
            Items = items;
        }

        public IDictionary Items { get; }

        // Replace the indexer with one that returns null for missing values
        object IDictionary<object, object>.this[object key]
        {
            get { return Items[key]; }
            set { Items[key] = value; }
        }

        void IDictionary<object, object>.Add(object key, object value)
        {
            Items.Add(key, value);
        }

        bool IDictionary<object, object>.ContainsKey(object key)
        {
            return Items.Contains(key);
        }

        private ICollection<object> _keys;
        ICollection<object> IDictionary<object, object>.Keys
        {
            get { return _keys ?? (_keys = new ItemsCollection(Items.Keys)); }
        }

        bool IDictionary<object, object>.Remove(object key)
        {
            if (Items.Contains(key))
            {
                Items.Remove(key);
                return true;
            }

            return false;
        }

        bool IDictionary<object, object>.TryGetValue(object key, out object value)
        {
            if (Items.Contains(key))
            {
                value = Items[key];
                return true;
            }

            value = null;
            return false;
        }

        private ICollection<object> _values;
        ICollection<object> IDictionary<object, object>.Values
        {
            get { return _values ?? (_values = new ItemsCollection(Items.Values)); }
        }

        void ICollection<KeyValuePair<object, object>>.Add(KeyValuePair<object, object> item)
        {
            Items.Add(item.Key, item.Value);
        }

        void ICollection<KeyValuePair<object, object>>.Clear()
        {
            Items.Clear();
        }

        bool ICollection<KeyValuePair<object, object>>.Contains(KeyValuePair<object, object> item)
        {
            return Items.Contains(item);
        }

        void ICollection<KeyValuePair<object, object>>.CopyTo(KeyValuePair<object, object>[] array, int arrayIndex)
        {
            Items.CopyTo(array, arrayIndex);
        }

        int ICollection<KeyValuePair<object, object>>.Count
        {
            get { return Items.Count; }
        }

        bool ICollection<KeyValuePair<object, object>>.IsReadOnly
        {
            get { return Items.IsReadOnly; }
        }

        bool ICollection<KeyValuePair<object, object>>.Remove(KeyValuePair<object, object> item)
        {
            object value;
            if (Items.Contains(item.Key))
            {
                value = Items[item.Key];
                if (Equals(item.Value, value))
                {
                    Items.Remove(item.Key);
                    return true;
                }
            }
            return false;
        }

        IEnumerator<KeyValuePair<object, object>> IEnumerable<KeyValuePair<object, object>>.GetEnumerator()
        {
            throw new NotImplementedException();
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return Items.GetEnumerator();
        }
    }
}
