using System.Collections.Generic;
using Microsoft.AspNet.Http;
using Glimpse.Agent.Configuration;
using Glimpse.Initialization;
using Glimpse.Platform;

namespace Glimpse.Agent.Inspectors
{
    public class InspectorRuntimeManager : IInspectorRuntimeManager
    {
        private const string ShouldIgnoreResultKey = "__GlimpseShouldIgnoreResult";
        private readonly IRequestIgnorerManager _requestIgnorerManager;
        private readonly IEnumerable<IInspector> _inspectors;

        public InspectorRuntimeManager(IRequestIgnorerManager requestIgnorerManager, IExtensionProvider<IInspector> inspectorProvider)
        {
            _requestIgnorerManager = requestIgnorerManager;
            _inspectors = inspectorProvider.Instances;
        }

        public void BeginRequest(HttpContext context)
        {
            var shouldIgnore = _requestIgnorerManager.ShouldIgnore(context);
            if (!shouldIgnore)
            {
                foreach (var inspector in _inspectors)
                {
                    inspector.Before(context);
                }
            }

            // store result so we don't need to evaluate again later
            context.Items[ShouldIgnoreResultKey] = shouldIgnore;
        }

        public void EndRequest(HttpContext context)
        {
            var shouldIgnore = context.Items[ShouldIgnoreResultKey] as bool?;
            if (shouldIgnore.HasValue && !shouldIgnore.Value)
            {
                foreach (var inspector in _inspectors)
                {
                    inspector.After(context);
                }
            }
        }
    }
}