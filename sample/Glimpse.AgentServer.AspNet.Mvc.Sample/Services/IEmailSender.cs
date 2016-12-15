using System.Threading.Tasks;

namespace Glimpse.AgentServer.AspNet.Mvc.Sample.Services
{
    public interface IEmailSender
    {
        Task SendEmailAsync(string email, string subject, string message);
    }
}
