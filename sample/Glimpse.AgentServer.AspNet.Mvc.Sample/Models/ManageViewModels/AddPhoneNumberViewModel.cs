using System.ComponentModel.DataAnnotations;

namespace Glimpse.AgentServer.AspNet.Mvc.Sample.Models.ManageViewModels
{
    public class AddPhoneNumberViewModel
    {
        [Required]
        [Phone]
        [Display(Name = "Phone number")]
        public string PhoneNumber { get; set; }
    }
}
