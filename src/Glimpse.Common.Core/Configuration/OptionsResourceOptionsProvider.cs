using Glimpse.Initialization;
using Microsoft.Extensions.Options;

namespace Glimpse.Configuration
{
    public class OptionsResourceOptionsProvider : IResourceOptionsProvider
    {
        private readonly ResourceOptions _resourceOptions;

        public OptionsResourceOptionsProvider(IOptions<ResourceOptions> optionsAccessor)
        {
            _resourceOptions = optionsAccessor.Value;
        }

        public ResourceOptions BuildInstance()
        {
            return _resourceOptions;
        }
    }
}