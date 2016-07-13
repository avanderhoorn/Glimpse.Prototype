using System.ComponentModel;
using System.Linq;
using System.Text.RegularExpressions;

namespace Glimpse.Internal.Extensions
{
    [EditorBrowsable(EditorBrowsableState.Never)]
    public static class StringExtensions
    {
        private readonly static Regex _splitter = new Regex(
            @"# This RegEx uses lookahead & lookbehind to match a position, not an actual char
            (?<=[a-z0-9]) # Match one lower char or number, but use positive lookbehind to not include it
            (?=[A-Z])       # Match one upper char, but use positive lookahead to not include it
            |\s+            # Or whitespace", RegexOptions.Compiled | RegexOptions.IgnorePatternWhitespace);

        public static string KebabCase(this string input)
        {
            /*
            ** 1. Trim input
            ** 2. Split into words based on RegEx above
            ** 3. Use LINQ to make all words lower case
            ** 4. string.Join lower cased words togther, seperated by "-"
            */

            return string.Join("-", _splitter.Split(input.Trim()).Select(i => i.ToLower()));
        }
    }
}
