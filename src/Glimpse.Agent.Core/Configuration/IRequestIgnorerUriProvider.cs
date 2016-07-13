using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace Glimpse.Agent.Configuration
{
    public interface IRequestIgnorerUriProvider
    {
        IReadOnlyList<Regex> IgnoredUris { get; }
    }
}