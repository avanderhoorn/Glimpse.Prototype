using System.Collections.Generic;

namespace Glimpse.Agent.Configuration
{
    public interface IRequestIgnorerContentTypeProvider
    {
        IReadOnlyList<string> ContentTypes { get; }
    }
}