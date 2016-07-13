using System.Collections.Generic;

namespace Glimpse.Agent.Configuration
{
    public interface IRequestIgnorerStatusCodeProvider
    {
        IReadOnlyList<int> StatusCodes { get; }
    }
}