using System;
using System.Collections.Generic;

namespace Glimpse.Agent.Internal.Inspectors.Mvc.Proxies
{
    public class ActionResultTypes
    {
        public interface IViewResult
        {
            int? StatusCode { get; }
            string ViewName { get; }
            IDictionary<string, object> TempData { get; }
            IDictionary<string, object> ViewData { get; }
            object ContentType { get; }
        }

        public interface IContentResult
        {
            int? StatusCode { get; }
            string Content { get; }
            object ContentType { get; }
        }

        public interface IObjectResult
        {
            int? StatusCode { get; }
            //object Value { get; }
            //IReadOnlyList<object> Formatters { get; }
            //IReadOnlyList<string> ContentTypes { get; }
            Type DeclaredType { get; }
        }

        public interface IFileResult
        {
            string FileDownloadName { get; }
            string ContentType { get; }
        }
    }
}