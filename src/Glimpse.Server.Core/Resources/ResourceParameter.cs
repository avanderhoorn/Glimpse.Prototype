namespace Glimpse.Server.Resources
{
    public class ResourceParameter
    {
        // Example parameters, not the final list
        public static ResourceParameter Hash = new ResourceParameter("hash");
        public static ResourceParameter Url = new ResourceParameter("url");
        public static ResourceParameter Version = new ResourceParameter("version");
        public static ResourceParameter RequestId = new ResourceParameter("requestid");
        public static ResourceParameter Timestamp = new ResourceParameter("stamp");
        public static ResourceParameter Callback = new ResourceParameter("callback");

        public ResourceParameter(string name) : this(name, false)
        {
        }

        public ResourceParameter(string name, bool isRequired)
        {
            Name = name;
            IsRequired = isRequired;
        }

        public static ResourceParameter Custom(string name)
        {
            return new ResourceParameter(name);
        }

        public static ResourceParameter Custom(string name, bool isRequired)
        {
            return new ResourceParameter(name, isRequired);
        }

        public string Name { get; private set; }
        public bool IsRequired { get; private set; }

        public static ResourceParameter operator -(ResourceParameter resourceParameter)
        {
            return new ResourceParameter(resourceParameter.Name, false);
        }

        public static ResourceParameter operator +(ResourceParameter resourceParameter)
        {
            return new ResourceParameter(resourceParameter.Name, true);
        }
    }
}