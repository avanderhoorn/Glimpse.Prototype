using System.Collections.Generic;
using System.ComponentModel;
using Tavis.UriTemplates;

namespace Glimpse.Server.Internal.Extensions
{
    [EditorBrowsable(EditorBrowsableState.Never)]
    public static class UriTemplateExtensions
    {
        public static string ResolveWith(this UriTemplate uriTemplate, IDictionary<string, object> parameters)
        {
            uriTemplate.AddParameters(parameters);
            return uriTemplate.Resolve();
        }
    }
}
