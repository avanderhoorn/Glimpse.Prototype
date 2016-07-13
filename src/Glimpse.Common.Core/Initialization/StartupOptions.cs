using System;

namespace Glimpse.Initialization
{
    public class StartupOptions : IStartupOptions
    {
        public StartupOptions(IServiceProvider serviceProvider)
        {
            ApplicationServices = serviceProvider;
        }

        public IServiceProvider ApplicationServices { get; }
    }
}