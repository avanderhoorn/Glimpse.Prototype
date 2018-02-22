using System;
using Glimpse.Agent.Messages;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DiagnosticAdapter;
using System.Diagnostics;
using System.Collections.Generic;

namespace Glimpse.Agent.Internal.Inspectors
{
    public partial class WebDiagnosticsListener
    {
        private static IDictionary<string, MiddlewareInfo> MiddlewarePackageStartsWithMap = new Dictionary<string, MiddlewareInfo> {
            { "Microsoft.AspNetCore.Builder.UseExtensions+", new MiddlewareInfo { ShortName = "UseExtensions", PackageName = "" } },
            { "Glimpse.Agent.Inspectors.DefaultInspectorFunctionManager+", new MiddlewareInfo { ShortName = "Glimpse Agent Extension", PackageName = "Glimpse Agent" } }
        };

        private static IDictionary<string, MiddlewareInfo> MiddlewarePackageMap = new Dictionary<string, MiddlewareInfo>
        {
            { "Glimpse.Agent.GlimpseAgentMiddleware", new MiddlewareInfo { ShortName = "AgentMiddleware", PackageName = "Glimpse Agent" } },
            { "Glimpse.Server.GlimpseServerMiddleware", new MiddlewareInfo { ShortName = "ServerMiddleware", PackageName = "Glimpse Server" } },
            { "Microsoft.AspNetCore.Builder.Extensions.MapMiddleware", new MiddlewareInfo { ShortName = "MapMiddleware", PackageName = "MS Http Abstractions" } },
            { "Microsoft.AspNetCore.Diagnostics.StatusCodePagesMiddleware", new MiddlewareInfo { ShortName = "StatusCodePagesMiddleware", PackageName = "MS Diagnostics" } },
            { "Microsoft.AspNetCore.Diagnostics.DeveloperExceptionPageMiddleware", new MiddlewareInfo { ShortName = "DeveloperExceptionPageMiddleware", PackageName = "MS Diagnostics" } },
            { "Microsoft.AspNetCore.Session.SessionMiddleware", new MiddlewareInfo { ShortName = "SessionMiddleware", PackageName = "MS Session" } },
            { "Microsoft.AspNetCore.Diagnostics.EntityFrameworkCore.DatabaseErrorPageMiddleware", new MiddlewareInfo { ShortName = "EFDatabaseErrorPageMiddleware", PackageName = "MS EntityFrameworkCore Diagnostics" } },
            { "Microsoft.AspNetCore.StaticFiles.StaticFileMiddleware", new MiddlewareInfo { ShortName = "StaticFileMiddleware", PackageName = "MS StaticFiles" } },
            { "Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationMiddleware", new MiddlewareInfo { ShortName = "CookieAuthenticationMiddleware", PackageName = "MS Auth Cookies" } },
            { "Microsoft.AspNetCore.Authentication.Facebook.FacebookMiddleware", new MiddlewareInfo { ShortName = "FacebookMiddleware", PackageName = "MS Auth Facebook" } },
            { "Microsoft.AspNetCore.Authentication.Google.GoogleMiddleware", new MiddlewareInfo { ShortName = "GoogleMiddleware", PackageName = "MS Auth Google" } },
            { "Microsoft.AspNetCore.Authentication.Twitter.TwitterMiddleware", new MiddlewareInfo { ShortName = "TwitterMiddleware", PackageName = "MS Auth Twitter" } },
            { "Microsoft.AspNetCore.Authentication.MicrosoftAccount.MicrosoftAccountMiddleware", new MiddlewareInfo { ShortName = "MicrosoftAccountMiddleware", PackageName = "MS Auth Account" } },
            { "Microsoft.AspNetCore.Builder.RouterMiddleware", new MiddlewareInfo { ShortName = "RouterMiddleware", PackageName = "MS Routing" } }
        };

        [DiagnosticName("Microsoft.AspNetCore.MiddlewareAnalysis.MiddlewareStarting")]
        public void OnMiddlewareFinished(
            string name,
            HttpContext httpContext,
            Guid instanceId
            )
        {
            var message = new MiddlewareStartMessage();
            message.Name = name;
            message.CorrelationId = instanceId;

            var info = (MiddlewareInfo)null;
            if (MiddlewarePackageMap.TryGetValue(message.Name, out info)
                || CheckMiddlewareStartsWithMatch(message.Name, out info))
            {
                message.DisplaName = info.ShortName;
                message.Name = info.ShortName;
                message.PackageName = info.PackageName;
            }
            else
            {
                // TODO: temp hack
                message.PackageName = "";
            }

            _broker.SendMessage(message);
        }

        [DiagnosticName("Microsoft.AspNetCore.MiddlewareAnalysis.MiddlewareFinished")]
        public void OnMiddlewareFinished(
            string name,
            Guid instanceId,
            long duration,
            HttpContext httpContext)
        {
            var message = new MiddlewareEndMessage();
            ProcessEnd(message, name, instanceId, duration, httpContext);

            _broker.SendMessage(message);
        }

        [DiagnosticName("Microsoft.AspNetCore.MiddlewareAnalysis.MiddlewareException")]
        public void OnMiddlewareException(
            string name,
            Guid instanceId,
            long duration,
            HttpContext httpContext,
            Exception exception)
        {
            var message = new MiddlewareEndExceptionMessage();
            ProcessEnd(message, name, instanceId, duration, httpContext);
            ProcessException(message, exception, false);

            _broker.SendMessage(message);
        }

        private void ProcessEnd(
            MiddlewareEndMessage message,
            string name,
            Guid instanceId,
            long duration,
            HttpContext httpContext)
        {
            message.CorrelationId = instanceId;
            message.Duration = (duration / Stopwatch.Frequency) * 1000;
        }

        private void ProcessException(IExceptionMessage message, Exception exception)
        {
            // store the BaseException as the exception of record 
            var baseException = exception.GetBaseException();
            message.ExceptionTypeName = baseException.GetType().Name;
            message.ExceptionMessage = baseException.Message;
            message.ExceptionDetails = _exceptionProcessor.GetErrorDetails(exception);
        }

        private bool CheckMiddlewareStartsWithMatch(string name, out MiddlewareInfo info)
        {
            foreach (var entry in MiddlewarePackageStartsWithMap)
            {
                if (!String.IsNullOrEmpty(name) && name.StartsWith(entry.Key))
                {
                    info = entry.Value;
                    return true;
                }
            }

            info = null;
            return false;
        }
        private class MiddlewareInfo
        {
            public string ShortName { get; set; }

            public string PackageName { get; set; }
        }
    }
}
