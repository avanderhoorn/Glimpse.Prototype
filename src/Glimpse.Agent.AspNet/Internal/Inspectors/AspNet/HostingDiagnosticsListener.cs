using System;
using System.Linq;
using Glimpse.Agent.Messages;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DiagnosticAdapter;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Primitives;
using System.IO;
using System.Text;
using Microsoft.Net.Http.Headers;
using System.Text.RegularExpressions;

namespace Glimpse.Agent.Internal.Inspectors
{
    public partial class WebDiagnosticsListener
    {

        [DiagnosticName("Microsoft.AspNetCore.Hosting.BeginRequest")]
        public void OnBeginRequest(HttpContext httpContext)
        {
            // TODO: Not sure if this is where this should live but it's the earlist hook point we have
            _contextData.Value = new MessageContext { Id = Guid.NewGuid(), Type = "Request" };

            var request = httpContext.Request;
            var requestDateTime = DateTime.UtcNow;

            // build message
            var message = new WebRequestMessage
            {
                Url = $"{request.Scheme}://{request.Host}{request.PathBase}{request.Path}{request.QueryString}", // TODO: check if there is a better way of doing this
                Method = request.Method,
                Headers = request.Headers.ToDictionary(h => h.Key, h => h.Value),
                StartTime = requestDateTime
            };
            
            // add ajax
            var isAjax = StringValues.Empty;
            httpContext.Request.Headers.TryGetValue("__glimpse-isAjax", out isAjax);
            message.IsAjax = isAjax == "true";

            // add protocol
            message.Protocol = new WebRequestProtocol();
            if (!string.IsNullOrEmpty(request.Protocol))
            {
                var protocol = request.Protocol.Split('/');
                message.Protocol.Identifier = protocol[0];
                if (protocol.Length > 0)
                {
                    message.Protocol.Version = protocol[1];
                }
            }

            _broker.StartOffsetOperation();
            _broker.BeginLogicalOperation(message, requestDateTime);
            _broker.SendMessage(message);
        }

        [DiagnosticName("Microsoft.AspNetCore.Hosting.EndRequest")]
        public void OnEndRequest(HttpContext httpContext)
        {
            var message = new WebResponseMessage();
            ProcessEnd(message, httpContext);

            _broker.SendMessage(message);
        }
        
        [DiagnosticName("Microsoft.AspNetCore.Hosting.UnhandledException")]
        public void OnHostingUnhandledException(HttpContext httpContext, Exception exception)
        {
            var message = new WebResponseExceptionMessage();
            ProcessEnd(message, httpContext);
            ProcessException(message, exception, false);

            _broker.SendMessage(message);
        }

        [DiagnosticName("Microsoft.AspNetCore.Diagnostics.UnhandledException")]
        public void OnDiagnosticsUnhandledException(HttpContext httpContext, Exception exception)
        {
            var message = new WebResponseExceptionMessage();
            ProcessEnd(message, httpContext);
            ProcessException(message, exception, false);

            _broker.SendMessage(message);
        }

        [DiagnosticName("Microsoft.AspNetCore.Diagnostics.HandledException")]
        public void OnDiagnosticsHandledException(HttpContext httpContext, Exception exception)
        {
            var message = new WebResponseExceptionMessage();
            ProcessEnd(message, httpContext);
            ProcessException(message, exception, true);

            _broker.SendMessage(message);
        }
        
        private void ProcessEnd(WebResponseMessage message, HttpContext httpContext)
        {
            var request = httpContext.Request;
            var response = httpContext.Response;

            // build message
            message.Url = $"{request.Scheme}://{request.Host}{request.PathBase}{request.Path}{request.QueryString}"; // TODO: check if there is a better way of doing this
            message.Headers = response.Headers.ToDictionary(h => h.Key, h => h.Value);
            message.StatusCode = response.StatusCode;
            message.StatusMessage = ""; // TODO: need to fetch
            
            var webBody = (object)null;
            if (httpContext.Items.TryGetValue("__GlimpseWebBody", out webBody))
            {
                message.Body = webBody as WebBody;
            }
            
            // add timing data
            var timing = _broker.EndLogicalOperation<WebRequestMessage>();
            if (timing != null)
            {
                message.Duration = Math.Round(timing.Elapsed.TotalMilliseconds, 2);
                message.EndTime = timing.End.ToUniversalTime();
            }
            else
            {
                // in this case still want to publish but setting duration to 0
                message.Duration = 0.0;
                message.EndTime = DateTime.UtcNow;

                _logger.LogCritical("ProcessEndRequest: Still published `WebResponseMessage` but couldn't find `BeginRequestMessage` in stack");
            }
        }

        private void ProcessException(IExceptionMessage message, Exception exception, bool isHandelled)
        {
            // store the BaseException as the exception of record 
            var baseException = exception.GetBaseException();
            message.ExceptionIsHandelled = isHandelled;
            message.ExceptionTypeName = baseException.GetType().Name;
            message.ExceptionMessage = baseException.Message;
            message.ExceptionDetails = _exceptionProcessor.GetErrorDetails(exception);
        }
    }
}
