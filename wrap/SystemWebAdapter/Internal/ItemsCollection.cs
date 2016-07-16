using System;
using System.Collections;
using System.Collections.Generic;

namespace SystemWebAdapter.Internal
{
    public class ItemsCollection : ICollection<object>
    {
        public ItemsCollection(ICollection items)
        {
            Items = items;
        }

        public ICollection Items { get; }

        IEnumerator<object> IEnumerable<object>.GetEnumerator()
        {
            throw new NotImplementedException();
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return Items.GetEnumerator();
        }

        void ICollection<object>.Add(object item)
        {
            throw new NotImplementedException();
        }

        void ICollection<object>.Clear()
        {
            throw new NotImplementedException();
        }

        bool ICollection<object>.Contains(object item)
        {
            throw new NotImplementedException();
        }

        void ICollection<object>.CopyTo(object[] array, int arrayIndex)
        {
            Items.CopyTo(array, arrayIndex);
        }

        bool ICollection<object>.Remove(object item)
        {
            throw new NotImplementedException();
        }

        int ICollection<object>.Count
        {
            get { return Items.Count; }
        }

        bool ICollection<object>.IsReadOnly
        {
            get { throw new NotImplementedException(); }
        }
    }
}