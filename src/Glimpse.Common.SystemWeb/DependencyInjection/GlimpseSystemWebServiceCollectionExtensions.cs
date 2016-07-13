using Glimpse.Platform;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class GlimpseSystemWebServiceCollectionExtensions
    {
        public static IGlimpseBuilder AddGlimpse(this IServiceCollection services)
        {
            return services.AddGlimpse(true);
        }

        public static IGlimpseBuilder AddGlimpse(this IServiceCollection services, bool autoRegisterComponents)
        {
            //
            // Discovery & Reflection.
            //
            services.AddTransient<IAssemblyProvider, AppDomainAssemblyProvider>();

            return (IGlimpseBuilder)services.AddGlimpseCore(autoRegisterComponents);
        } 
    }
}