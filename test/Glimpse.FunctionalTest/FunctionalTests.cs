using System;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Glimpse.Client.Web;
using Microsoft.AspNet.Builder;
using Microsoft.AspNet.TestHost;
using Microsoft.Framework.DependencyInjection;
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
            var server = TestServer.Create(Configure, ConfigureServices);
            var client = server.CreateClient();

            var request = new HttpRequestMessage();

            var response = await client.SendAsync(request);

            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            Assert.Equal("Hello, world!", await response.Content.ReadAsStringAsync());
        }
    }
}
