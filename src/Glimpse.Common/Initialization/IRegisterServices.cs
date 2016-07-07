using Microsoft.Extensions.DependencyInjection;

namespace Glimpse.Common.Initialization
{
    public interface IRegisterServices
    {
        void RegisterServices(IServiceCollection services);
    }
}