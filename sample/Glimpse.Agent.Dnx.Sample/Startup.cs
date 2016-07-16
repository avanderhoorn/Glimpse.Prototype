using System;
using Glimpse.Agent;
using Glimpse.Initialization;
using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Hosting;
using Microsoft.Extensions.DependencyInjection;

namespace Glimpse.Agent.Dnx.Sample
{
    public class Startup
    {
        public Startup()
        {
            Console.ForegroundColor = ConsoleColor.DarkCyan;
            Console.WriteLine("\nGLIMPSE AGENT RUNNING ON PORT 5200");
            Console.WriteLine("==================================\n");
            Console.ResetColor();
        }
        
        public void ConfigureServices(IServiceCollection services)
        {
            /* Example of how to use fixed provider

            TODO: This should be cleanned up with help of extenion methods

            services.AddSingleton<IIgnoredRequestProvider>(x =>
            {
                var activator = x.GetService<ITypeActivator>();

                var urlPolicy = activator.CreateInstances<IIgnoredRequestPolicy>(new []
                    {
                        typeof(UriIgnoredRequestPolicy).GetTypeInfo(),
                        typeof(ContentTypeIgnoredRequestPolicy).GetTypeInfo()
                    }); 
                 
                var provider = new FixedIgnoredRequestProvider(urlPolicy);

                return provider; 
            });
            */

            services.AddGlimpse();
        }

        public void Configure(IApplicationBuilder app)
        {
            app.UseGlimpse();

            app.UseWelcomePage();
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
