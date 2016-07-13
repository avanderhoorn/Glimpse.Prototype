using System.Web;
using SystemWebAdapter;
using Glimpse.Server.Resources;

namespace Glimpse
{
    public class GlimpseServerHandler : IHttpHandler
    {
        private readonly IResourceRuntimeManager _resourceRuntimeManager;
        private static readonly object _hasRegisteredLock = new object();
        private static bool _hasRegistered = false;

        public GlimpseServerHandler(IResourceRuntimeManager resourceRuntimeManager)
        {
            _resourceRuntimeManager = resourceRuntimeManager;

            if (!_hasRegistered)
            {
                lock (_hasRegisteredLock)
                {
                    if (!_hasRegistered)
                    {
                        _resourceRuntimeManager.Register();
                    }
                }
            }
        }

        public bool IsReusable => true;

        public void ProcessRequest(HttpContext httpContext)
        {
            var context = GetHttpContext(httpContext);

            // need to wait as ProcessRequest is sync
            _resourceRuntimeManager.ProcessRequest(context).Wait();
        }

        private static Microsoft.AspNet.Http.HttpContext GetHttpContext(object sender)
        {
            var httpApplication = (HttpApplication)sender;

            // convert SystemWeb HttpContext to DNX HttpContext 
            return httpApplication.Context.CreateContext();
        }
    }
}