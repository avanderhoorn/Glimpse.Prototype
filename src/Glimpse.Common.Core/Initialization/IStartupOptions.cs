using System;

namespace Glimpse.Initialization
{
    public interface IStartupOptions
    {
        IServiceProvider ApplicationServices { get; }
    }
}
