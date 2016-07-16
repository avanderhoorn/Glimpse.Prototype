namespace Microsoft.Extensions.DependencyInjection
{
    public interface IGlimpseBuilder
    {
        IServiceCollection Services { get; }
    }
}