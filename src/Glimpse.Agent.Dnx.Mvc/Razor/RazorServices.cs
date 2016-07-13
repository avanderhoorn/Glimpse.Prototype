using Glimpse.Agent.Razor;
using Glimpse.Initialization;
using Microsoft.AspNet.Mvc.Razor;
using Microsoft.Extensions.DependencyInjection;

namespace Glimpse.Agent.AspNet.Mvc.Razor
{
    public class RazorServices : IRegisterServices
    {
        public void RegisterServices(IServiceCollection services)
        {
            services.AddTransient<IMvcRazorHost, ScriptInjectorRazorHost>();
        }
    }
}