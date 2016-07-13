using System;

namespace Glimpse.Platform
{
    public interface IGlimpseContextAccessor
    {
        Guid RequestId { get; }
    }
}
