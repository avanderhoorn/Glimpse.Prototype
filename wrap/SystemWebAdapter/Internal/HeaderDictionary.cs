using System;
using System.Collections;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using Microsoft.AspNet.Http;
using Microsoft.Extensions.Primitives;

namespace SystemWebAdapter.Internal
{
    public class HeaderDictionary : IHeaderDictionary
    {
        public HeaderDictionary(NameValueCollection headers)
        {
            Headers = headers;
        }
        private NameValueCollection Headers { get; set; }

        private KeyValuePair<string, StringValues> Convert(KeyValuePair<string, string[]> item) => new KeyValuePair<string, StringValues>(item.Key, item.Value);

        private KeyValuePair<string, string[]> Convert(KeyValuePair<string, StringValues> item) => new KeyValuePair<string, string[]>(item.Key, item.Value);

        private StringValues Convert(string[] item) => item;

        private string[] Convert(StringValues item) => item;

        public IEnumerator<KeyValuePair<string, StringValues>> GetEnumerator()
        {
            for (var i = 0; i < Headers.Count; i++)
            {
                yield return new KeyValuePair<string, StringValues>(Headers.Keys[i], Headers.GetValues(i));
            }
        }

        IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();

        public void Add(string key, StringValues value) => Headers.Add(key, value);

        public void Add(KeyValuePair<string, StringValues> item) => Headers.Add(item.Key, item.Value);

        public void Clear() => Headers.Clear();

        public bool Contains(KeyValuePair<string, StringValues> item)
        {
            StringValues value;
            return TryGetValue(item.Key, out value) && item.Value == value;
        }

        public void CopyTo(KeyValuePair<string, StringValues>[] array, int arrayIndex)
        {
            if (array == null)
            {
                throw new ArgumentNullException("array");
            }
            if (arrayIndex > Count - array.Length)
            {
                throw new ArgumentOutOfRangeException("arrayIndex", arrayIndex, string.Empty);
            }

            foreach (var item in this)
            {
                array[arrayIndex++] = item;
            }
        }

        public bool Remove(string key)
        {
            if (ContainsKey(key))
            {
                Headers.Remove(key);
                return true;
            }
            return false;
        }

        public bool Remove(KeyValuePair<string, StringValues> item)
        {
            if (Contains(item))
            {
                Headers.Remove(item.Key);
                return true;
            }
            return false;
        }

        public int Count => Headers.Count;

        public bool IsReadOnly => false;

        public bool ContainsKey(string key) => Keys.Contains(key, StringComparer.OrdinalIgnoreCase);

        public bool TryGetValue(string key, out StringValues value)
        {
            value = Headers.GetValues(key);
            return value != default(StringValues);
        }
        
        StringValues IHeaderDictionary.this[string key]
        {
            get
            {
                StringValues values;
                return TryGetValue(key, out values) ? values : default(StringValues);
            }
            set { Headers[key] = value; }
        }

        StringValues IDictionary<string, StringValues>.this[string key]
        {
            get { return Headers[key]; }
            set { Headers[key] = value; }
        }

        public ICollection<string> Keys => Headers.AllKeys;

        public ICollection<StringValues> Values => Headers.AllKeys.Select(key => Convert(Headers.GetValues(key))).ToList(); 
    }
}