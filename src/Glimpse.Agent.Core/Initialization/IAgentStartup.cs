﻿using Glimpse.Initialization;

namespace Glimpse.Initialization
{
    public interface IAgentStartup
    {
        void Run(IStartupOptions options);
    }
}
