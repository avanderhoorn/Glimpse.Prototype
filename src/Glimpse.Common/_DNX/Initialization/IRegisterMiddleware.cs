#if DNX
using Microsoft.AspNet.Builder;

namespace Glimpse.Common.Initialization
{
    public interface IRegisterMiddleware
    {
        void RegisterMiddleware(IApplicationBuilder appBuilder);
    }
}
#endif