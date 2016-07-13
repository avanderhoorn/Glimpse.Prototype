using System;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Hosting;
using Microsoft.AspNet.TestHost;
using Microsoft.Extensions.DependencyInjection;
using Xunit;

namespace Glimpse.FunctionalTest
{
    public class FunctionalTests
    {
        private static readonly Glimpse.FunctionalTest.Website.Startup Startup = new Website.Startup();
        private static readonly Action<IServiceCollection> ConfigureServices = Startup.ConfigureServices;
        private static readonly Action<IApplicationBuilder> Configure = Startup.Configure;

        [Fact]
        public async Task SayHelloToMvc()
        {
            var builder = new WebApplicationBuilder().Configure(Configure).ConfigureServices(ConfigureServices);
            var server = new TestServer(builder);
            var client = server.CreateClient();

            var request = new HttpRequestMessage();

            var response = await client.SendAsync(request);

            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            Assert.Equal("Hello, world!", await response.Content.ReadAsStringAsync());
        }
    }
}
