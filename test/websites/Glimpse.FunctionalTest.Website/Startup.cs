using Glimpse.Agent.AspNet.Mvc;
using Glimpse.Agent.Web;
using Glimpse.Server.Web;
using Microsoft.AspNet.Builder;
using Microsoft.Framework.DependencyInjection;
using Microsoft.Framework.Notification;

namespace Glimpse.FunctionalTest.Website
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services
                .AddGlimpse()
                .RunningAgentWeb()
                .RunningServerWeb()
                .WithLocalAgent();

            services.AddMvc();
            services.AddTransient<MvcNotificationListener>();
        }

        public void Configure(IApplicationBuilder app)
        {
            var notifier = app.ApplicationServices.GetRequiredService<INotifier>();
            notifier.EnlistTarget(app.ApplicationServices.GetRequiredService<MvcNotificationListener>());

            app.UseGlimpseServer();
            app.UseGlimpseAgent();
            app.UseGlimpseUI();

            app.UseMvcWithDefaultRoute();
        }
    }
}
