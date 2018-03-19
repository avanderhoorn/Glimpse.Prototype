using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;

namespace Glimpse.Server.Internal.Extensions
{
    [EditorBrowsable(EditorBrowsableState.Never)]
    public static class ParameterExtensions
    {
        public static IEnumerable<string> ParseEnumerable(this IDictionary<string, string> parameters, string name)
        {
            if (parameters.ContainsKey(name) && !string.IsNullOrWhiteSpace(parameters[name]))
                return parameters[name].Split(',');

            return Enumerable.Empty<string>();
        }

        public static string ParseString(this IDictionary<string, string> parameters, string name)
        {
            if (parameters.ContainsKey(name))
                return parameters[name];

            return null;
        }

        public static float? ParseFloat(this IDictionary<string, string> parameters, string name)
        {
            float result;
            if (parameters.ContainsKey(name) && float.TryParse(parameters[name], out result))
                return result;

            return null;
        }

        public static int? ParseInt(this IDictionary<string, string> parameters, string name)
        {
            int result;
            if (parameters.ContainsKey(name) && int.TryParse(parameters[name], out result))
                return result;

            return null;
        }

        public static DateTime? ParseDateTime(this IDictionary<string, string> parameters, string name)
        {
            DateTime result;
            if (parameters.ContainsKey(name) && DateTime.TryParse(parameters[name], out result))
                return result;

            return null;
        }

        public static Guid? ParseGuid(this IDictionary<string, string> parameters, string name)
        {
            Guid result;
            if (parameters.ContainsKey(name) && Guid.TryParseExact(parameters[name], "N", out result))
                return result;

            return null;
        }
    }
}