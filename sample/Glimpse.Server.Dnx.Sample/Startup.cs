using System;
using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Hosting;
using Microsoft.AspNet.Http;
using Microsoft.Extensions.DependencyInjection;

namespace Glimpse.Server.Dnx.Sample
{
    public class Startup
    {
        public Startup()
        {
            Console.ForegroundColor = ConsoleColor.DarkCyan;
            Console.WriteLine("\nGLIMPSE SERVER RUNNING ON PORT 5210");
            Console.WriteLine("===================================\n");
            Console.ResetColor();
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddGlimpse();
        }

        public void Configure(IApplicationBuilder app)
        {
            app.UseGlimpse();

            app.Run(async context =>
            {
                context.Response.ContentType = "text/html";
                context.Response.StatusCode = 200;
                await context.Response.WriteAsync(
@"
<html>
<head><title>Welcome to Glimpse Server!</title></head>
<body>
<h1><img src='http://getglimpse.com/content/glimpse100.png' style='vertical-align: middle;'> Glimpse Server</h1>
<p><ul><li><a href='/glimpse/client/index.html?hash=123&metadataUri=http%3A%2F%2Flocalhost%3A5210%2Fglimpse%2Fmetadata%2F%3Fhash%3D7f52ba69'>Launch Client</a></li><li><a href='/glimpse/export-config'>Download configuration.</a></li></ul></p>
</body>
</html>
");
            });
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
