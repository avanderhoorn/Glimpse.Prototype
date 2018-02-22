using System;
using System.Collections.Generic;
using System.Diagnostics;
using Glimpse.Agent;
using Glimpse.Agent.Configuration;
using Glimpse.Initialization;
using Microsoft.Extensions.DependencyInjection;

namespace Glimpse.Agent.Internal.Inspectors
{
    public class AgentStartupWebDiagnosticsListener : IAgentStartup
    {
        public AgentStartupWebDiagnosticsListener(IRequestIgnorerManager requestIgnorerManager)
        {
            RequestIgnorerManager = requestIgnorerManager;
        }

        private IRequestIgnorerManager RequestIgnorerManager { get; }

        public void Run(IStartupOptions options)
        {
            var appServices = options.ApplicationServices;
            
            var listenerSubscription = DiagnosticListener.AllListeners.Subscribe(listener =>
            {
                listener.SubscribeWithAdapter(appServices.GetRequiredService<WebDiagnosticsListener>(), IsEnabled);
            });
        }

        private bool IsEnabled(string topic)
        {
            return !RequestIgnorerManager.ShouldIgnore();
        }
    }
}
