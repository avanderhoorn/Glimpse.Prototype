using System.Threading.Tasks;
using Microsoft.AspNet.Http;
using Microsoft.AspNet.Mvc;

namespace Glimpse.FunctionalTest.Website.Controllers
{
    public class HomeController : Controller
    {
        public async Task Index()
        {
            await Response.WriteAsync("Hello, world!");
        }
    }
}
