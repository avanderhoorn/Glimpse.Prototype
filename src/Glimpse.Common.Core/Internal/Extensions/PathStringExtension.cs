using System.ComponentModel;
using Microsoft.AspNet.Http;

namespace Glimpse.Internal.Extensions
{
    [EditorBrowsable(EditorBrowsableState.Never)]
    public static class PathStringExtension
    {
        public static string StartingSegment(this PathString path, out PathString remaining)
        {
            var startingSegment = "";

            var spath = path.ToString();
            for (var i = 1; i < spath.Length; i++)
            {
                if (spath[i] == '/')
                {
                    remaining = spath.Substring(i, spath.Length - i);
                    return startingSegment;
                }

                startingSegment += spath[i];
            }

            remaining = PathString.Empty;
            return startingSegment;
        }
    }
}