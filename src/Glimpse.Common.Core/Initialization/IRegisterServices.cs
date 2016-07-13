using Microsoft.Extensions.DependencyInjection;

namespace Glimpse.Initialization
{
    public interface IRegisterServices
    {
        void RegisterServices(IServiceCollection services);
    }
}