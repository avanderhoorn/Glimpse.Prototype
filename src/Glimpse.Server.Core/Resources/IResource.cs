using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNet.Http;

namespace Glimpse.Server.Resources
{
    public interface IResource
    {
        Task Invoke(HttpContext context, IDictionary<string, string> parameters);

        string Name { get; }

        IEnumerable<ResourceParameter> Parameters { get; }

        // This should usually be set to ResourceType.Client.
        ResourceType Type { get; }
    }
}