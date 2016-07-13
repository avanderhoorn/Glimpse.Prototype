using Glimpse.Initialization;

namespace Glimpse.Configuration
{
    public interface IResourceOptionsProvider
    {
        ResourceOptions BuildInstance();
    }
}
