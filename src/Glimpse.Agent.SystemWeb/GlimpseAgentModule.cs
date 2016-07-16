using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using SystemWebAdapter;
using Glimpse.Agent.Configuration;
using Glimpse.Agent.Inspectors;
using Glimpse.Initialization;

namespace Glimpse
{
    public class GlimpseAgentModule : IHttpModule
    {
        private IInspectorRuntimeManager _inspectorRuntimeManager;     // TODO: need to set

        public void Init(HttpApplication httpApplication)
        {
            httpApplication.BeginRequest += (context, e) => BeginRequest(GetHttpContext(context));
            httpApplication.PostReleaseRequestState += (context, e) => EndRequest(GetHttpContext(context));
        }

        private void BeginRequest(Microsoft.AspNet.Http.HttpContext context)
        {
            _inspectorRuntimeManager.BeginRequest(context);
        }

        private void EndRequest(Microsoft.AspNet.Http.HttpContext context)
        {
            _inspectorRuntimeManager.EndRequest(context);
        }

        private static Microsoft.AspNet.Http.HttpContext GetHttpContext(object sender)
        {
            var httpApplication = (HttpApplication)sender;
            
            // convert SystemWeb HttpContext to DNX HttpContext 
            return httpApplication.Context.CreateContext();
        }

        public void Dispose()
        {
        }
    }
}