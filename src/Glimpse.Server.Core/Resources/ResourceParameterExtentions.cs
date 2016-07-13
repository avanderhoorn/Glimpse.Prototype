using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Glimpse.Server.Resources
{
    public static class ResourceParameterExtentions
    {
        private static readonly ResourceParameter[] _emptyParameters = new ResourceParameter[0];

        public static string GenerateUriTemplate(this IEnumerable<ResourceParameter> resourceParameters)
        {
            var parameters = resourceParameters?.ToArray() ?? _emptyParameters;

            if (parameters.Length == 0)
                return string.Empty;

            var sb = new StringBuilder();

            var requiredParams = parameters.Where(p => p.IsRequired).ToArray();
            if (requiredParams.Length > 0)
            {
                sb.AppendFormat(@"?{0}={{{0}}}", requiredParams[0].Name);
                for (int i = 1; i < requiredParams.Length; i++)
                {
                    sb.AppendFormat(@"&{0}={{{0}}}", requiredParams[i].Name);
                }
            }

            var optionalParams = parameters.Where(p => !p.IsRequired).Select(p => p.Name).ToArray();
            if (optionalParams.Length > 0)
            {
                sb.Append(string.Format("{{{1}{0}}}", string.Join(",", optionalParams), requiredParams.Length > 0 ? "&" : "?"));
            }

            return sb.ToString();
        }
    }
}