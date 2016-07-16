using System;
using Microsoft.Extensions.DependencyInjection;

namespace Glimpse.Internal
{
    public class GlimpseBuilder : IGlimpseBuilder, IGlimpseCoreBuilder
    {
        public GlimpseBuilder(IServiceCollection services)
        {
            Services = services;
        }

        public IServiceCollection Services { get; }
    }
}
