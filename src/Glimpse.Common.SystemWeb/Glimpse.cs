using Microsoft.Extensions.DependencyInjection;

namespace Glimpse
{
    public static class Glimpse
    {
        public static IGlimpseBuilder Start()
        {
            return Start(new ServiceCollection());
        }

        public static IGlimpseBuilder Start(IServiceCollection serviceProvider)
        {
            return serviceProvider.AddGlimpse();
        }
        public static IGlimpseBuilder Start(bool autoRegisterComponents)
        {
            return Start(new ServiceCollection(), autoRegisterComponents);
        }

        public static IGlimpseBuilder Start(IServiceCollection serviceProvider, bool autoRegisterComponents)
        {
            return serviceProvider.AddGlimpse(autoRegisterComponents);
        }
    }
}