using System.Collections.Generic;

namespace Glimpse.Agent.Messages
{
    public interface IActionRouteMessage
    {
        string ActionId { get; set; }
        
        string RouteName { get; set; }

        string RoutePattern { get; set; }

        IReadOnlyDictionary<string, string> RouteData { get; set; }

        IReadOnlyDictionary<string, RouteConfigurationData> RouteConfiguration { get; set; }
    }
}