using System;
using System.Linq;
using Glimpse.Agent.Messages;
using Microsoft.AspNet.Http;
using Microsoft.Extensions.DiagnosticAdapter;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Primitives;

namespace Glimpse.Agent.Internal.Inspectors
{
    public partial class WebDiagnosticsInspector
    {
        [DiagnosticName("Microsoft.AspNet.Hosting.BeginRequest")]
        public void OnBeginRequest(HttpContext httpContext)
        {
            // TODO: Not sure if this is where this should live but it's the earlist hook point we have
            _contextData.Value = new MessageContext { Id = Guid.NewGuid(), Type = "Request" };

            var request = httpContext.Request;
            var requestDateTime = DateTime.UtcNow;

            var isAjax = StringValues.Empty;
            httpContext.Request.Headers.TryGetValue("__glimpse-isAjax", out isAjax);

            var message = new BeginRequestMessage
            {
                RequestUrl = $"{request.Scheme}://{request.Host}{request.PathBase}{request.Path}{request.QueryString}", // TODO: check if there is a better way of doing this
                RequestPath = request.Path,
                RequestQueryString = request.QueryString.Value,
                RequestMethod = request.Method,
                RequestHeaders = request.Headers.ToDictionary(h => h.Key, h => h.Value),
                RequestContentLength = request.ContentLength,
                RequestContentType = request.ContentType,
                RequestStartTime = requestDateTime,
                RequestIsAjax = isAjax == "true"
            };

            _broker.StartOffsetOperation();
            _broker.BeginLogicalOperation(message, requestDateTime);
            _broker.SendMessage(message);
        }

        [DiagnosticName("Microsoft.AspNet.Hosting.EndRequest")]
        public void OnEndRequest(HttpContext httpContext)
        {
            var message = new EndRequestMessage();
            ProcessEndRequest(message, httpContext);

            _broker.SendMessage(message);
        }
        
        [DiagnosticName("Microsoft.AspNet.Hosting.UnhandledException")]
        public void OnHostingUnhandledException(HttpContext httpContext, Exception exception)
        {
            var message = new HostingExceptionMessage();
            ProcessEndRequest(message, httpContext);
            ProcessException(message, exception, false);

            _broker.SendMessage(message);
        }

        [DiagnosticName("Microsoft.AspNet.Diagnostics.UnhandledException")]
        public void OnDiagnosticsUnhandledException(HttpContext httpContext, Exception exception)
        {
            var message = new DiagnosticsExceptionMessage();
            ProcessException(message, exception, false);

            _broker.SendMessage(message);
        }

        [DiagnosticName("Microsoft.AspNet.Diagnostics.HandledException")]
        public void OnDiagnosticsHandledException(HttpContext httpContext, Exception exception)
        {
            var message = new DiagnosticsExceptionMessage();
            ProcessException(message, exception, true);

            _broker.SendMessage(message);
        }

        private void ProcessEndRequest(EndRequestMessage message, HttpContext httpContext)
        {
            var request = httpContext.Request;
            var response = httpContext.Response;
            
            message.RequestUrl = $"{request.Scheme}://{request.Host}{request.PathBase}{request.Path}{request.QueryString}"; // TODO: check if there is a better way of doing this
            message.RequestPath = request.Path;
            message.RequestQueryString = request.QueryString.Value;
            message.ResponseHeaders = response.Headers.ToDictionary(h => h.Key, h => h.Value);
            message.ResponseContentLength = response.ContentLength;
            message.ResponseContentType = response.ContentType;
            message.ResponseStatusCode = response.StatusCode;

            // in this case still want to publish but setting duration to 0
            var timing = _broker.EndLogicalOperation<BeginRequestMessage>();
            if (timing != null)
            {
                message.ResponseDuration = Math.Round(timing.Elapsed.TotalMilliseconds, 2);
                message.ResponseEndTime = timing.End.ToUniversalTime();
            }
            else
            {
                message.ResponseDuration = 0.0;
                message.ResponseEndTime = DateTime.UtcNow;

                _logger.LogCritical("ProcessEndRequest: Still published `EndRequestMessage` but couldn't find `BeginRequestMessage` in stack");
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