using System;

namespace Glimpse
{
    [AttributeUsage(AttributeTargets.Property, AllowMultiple = false)]
    public class PromoteToAttribute : Attribute
    {
        public PromoteToAttribute(string key)
        {
            Key = key;
        }

        public string Key { get; private set; }
    }
}