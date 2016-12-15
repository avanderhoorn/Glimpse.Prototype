using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace Glimpse.AgentServer.AspNet.Mvc.Sample.Models.ManageViewModels
{
    public class ConfigureTwoFactorViewModel
    {
        public string SelectedProvider { get; set; }

        public ICollection<SelectListItem> Providers { get; set; }
    }
}
