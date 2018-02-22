using Glimpse.Agent.Internal.Inspectors.Mvc.Proxies;
using Glimpse.Internal;
using Microsoft.Extensions.Logging;

namespace Glimpse.Agent.Internal.Inspectors
{
    // NOTE: This has been setup as a partial class to prevent having multiple 
    //       listeners registered. Under the covers, Diagnostics Source will 
    //       loop through all listeners, only have the one registed should 
    //       minimise how much we have to have registered.
    public partial class WebDiagnosticsListener
    {
        private readonly IAgentBroker _broker;
        private readonly IContextData<MessageContext> _contextData;
        private readonly ProxyAdapter _proxyAdapter;
        private readonly IExceptionProcessor _exceptionProcessor;
        private readonly ILogger _logger;

        public WebDiagnosticsListener(IExceptionProcessor exceptionProcessor, IAgentBroker broker, IContextData<MessageContext> contextData, ILoggerFactory loggerFactory)
        {
            _exceptionProcessor = exceptionProcessor;
            _broker = broker;
            _contextData = contextData;
            _logger = loggerFactory.CreateLogger<WebDiagnosticsListener>();

            _proxyAdapter = new ProxyAdapter();

            HostingOnCreated();
            MiddlewareOnCreated();
            MvcOnCreated();
        }

        partial void HostingOnCreated();

        partial void MiddlewareOnCreated();

        partial void MvcOnCreated();
    }
}
