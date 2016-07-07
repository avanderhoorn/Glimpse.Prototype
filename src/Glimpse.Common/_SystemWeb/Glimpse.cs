#if SystemWeb
using Microsoft.Extensions.DependencyInjection;

namespace Glimpse
{
    public static class Glimpse
    {
        public static GlimpseServiceCollectionBuilder Start()
        {
            return Start(new ServiceCollection());
        }

        public static GlimpseServiceCollectionBuilder Start(IServiceCollection serviceProvider)
        {
            return serviceProvider.AddGlimpse();
        }
        public static GlimpseServiceCollectionBuilder Start(bool autoRegisterComponents)
        {
            return Start(new ServiceCollection(), autoRegisterComponents);
        }

        public static GlimpseServiceCollectionBuilder Start(IServiceCollection serviceProvider, bool autoRegisterComponents)
        {
            return serviceProvider.AddGlimpse(autoRegisterComponents);
        }
    }
}
#endif