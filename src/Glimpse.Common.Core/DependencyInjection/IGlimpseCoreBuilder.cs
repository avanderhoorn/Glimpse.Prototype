namespace Microsoft.Extensions.DependencyInjection
{
    public interface IGlimpseCoreBuilder
    {
        IServiceCollection Services { get; }
    }
}
