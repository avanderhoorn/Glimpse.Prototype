using System;
using Glimpse.Agent;
using Glimpse.Server;
using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Hosting;
using Microsoft.Extensions.DependencyInjection;

namespace Glimpse.AgentServer.Dnx.Mvc.Simple.Sample
{
    public class Startup
    {
        public Startup()
        {
            Console.ForegroundColor = ConsoleColor.DarkCyan;
            Console.WriteLine("\nGLIMPSE AGENT+SERVER (SIMPLE) RUNNING ON PORT 5000");
            Console.WriteLine("==================================================\n");
            Console.ResetColor();
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddGlimpse();

            services.AddMvc();
        }

        public void Configure(IApplicationBuilder app)
        {
            app.UseGlimpse();
            
            app.UseMvcWithDefaultRoute();
        }

        public static void Main(string[] args)
        {
            var application = new WebApplicationBuilder()
                .UseConfiguration(WebApplicationConfiguration.GetDefault(args))
                .UseStartup<Startup>()
                .Build();

            application.Run();
        }
    }
}
