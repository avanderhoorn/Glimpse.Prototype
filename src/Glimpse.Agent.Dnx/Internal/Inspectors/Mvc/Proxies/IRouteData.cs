using System.Collections.Generic;

namespace Glimpse.Agent.Internal.Inspectors.Mvc.Proxies
{
    public interface IRouteData
    {
        IReadOnlyList<object> Routers { get; }
        IDictionary<string, object> DataTokens { get; }
        IDictionary<string, object> Values { get; }
    }

    public interface IRouter
    {
        string Name { get; }
        string RouteTemplate { get; }
        IReadOnlyDictionary<string, object> Values { get; }
        IRouterParsedTemplate ParsedTemplate { get; }
    }

    public interface IRouterParsedTemplate
    {
        IReadOnlyList<IRouterTemplatePart> Parameters { get; }
    }

    public interface IRouterTemplatePart
    {
        string Name { get; }
        object DefaultValue { get; }
        bool IsOptional { get; }
    }
}