using System.ComponentModel.DataAnnotations;

namespace Glimpse.AgentServer.AspNet.Mvc.Sample.Models.AccountViewModels
{
    public class ExternalLoginConfirmationViewModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}
