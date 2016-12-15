using System.Threading.Tasks;

namespace Glimpse.AgentServer.AspNet.Mvc.Sample.Services
{
    public interface ISmsSender
    {
        Task SendSmsAsync(string number, string message);
    }
}
