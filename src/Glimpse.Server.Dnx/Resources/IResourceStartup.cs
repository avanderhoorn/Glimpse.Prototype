namespace Glimpse.Server.Resources
{
    public interface IResourceStartup
    {
        void Configure(IResourceBuilder resourceBuilder);

        ResourceType Type { get; }
    }
}