#if DNX
namespace Glimpse.Agent.Internal.Inspectors.Mvc.Proxies
{
    public interface IViewComponentContext
    {
        IViewComponentDescriptor ViewComponentDescriptor { get; }

        object[] Arguments { get; }
    }
}
#endif