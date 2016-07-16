using System.Collections.Generic;
using Glimpse.Initialization;
using Glimpse.Platform;

namespace Glimpse.Agent.Inspectors
{
    public class InspectorsInspectorFunction : IInspectorFunction
    {
        private readonly IEnumerable<IInspector> _inspectors;

        public InspectorsInspectorFunction(IExtensionProvider<IInspector> inspectorProvider)
        {
            _inspectors = inspectorProvider.Instances;
        }

        public void Configure(IInspectorFunctionBuilder builder)
        {
            builder.Use(async (context, next) =>
            {
                foreach (var inspector in _inspectors)
                {
                    inspector.Before(context);
                }

                await next();

                foreach (var inspector in _inspectors)
                {
                    inspector.After(context);
                }
            });
        }
    }
}