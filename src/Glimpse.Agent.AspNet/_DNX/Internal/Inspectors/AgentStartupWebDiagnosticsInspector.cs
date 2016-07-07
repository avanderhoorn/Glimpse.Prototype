#if DNX
using System.Diagnostics;
using Glimpse.Agent;
using Glimpse.Agent.Configuration;
using Glimpse.Initialization;
using Microsoft.Extensions.DependencyInjection;

namespace Glimpse.Agent.Internal.Inspectors.Mvc
{
    public class AgentStartupWebDiagnosticsInspector : IAgentStartup
    {
        public AgentStartupWebDiagnosticsInspector(IRequestIgnorerManager requestIgnorerManager)
        {
            RequestIgnorerManager = requestIgnorerManager;
        }

        private IRequestIgnorerManager RequestIgnorerManager { get; }

        public void Run(IStartupOptions options)
        {
            var appServices = options.ApplicationServices;

            var telemetryListener = appServices.GetRequiredService<DiagnosticListener>();
            telemetryListener.SubscribeWithAdapter(appServices.GetRequiredService<WebDiagnosticsInspector>(), IsEnabled);
        }

        private bool IsEnabled(string topic)
        {
            return !RequestIgnorerManager.ShouldIgnore();
        }
    }
}
#endif