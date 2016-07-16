using System.Collections.Generic;
using System.ComponentModel;
using System.Text.RegularExpressions;

namespace Glimpse.Agent.Configuration
{
    [EditorBrowsable(EditorBrowsableState.Never)]
    public static class RegexExtensions
    {
        public static void AddCompiled(this ICollection<Regex> collection, string expression)
        {
            var regex = new Regex(expression, RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.None);
            collection.Add(regex);
        }
    }
}