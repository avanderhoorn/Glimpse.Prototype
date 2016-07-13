using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Glimpse.Server.Storage
{
    public interface IQueryRequests
    {
        Task<IEnumerable<string>> Query(RequestFilters filters);

        Task<IEnumerable<string>> Query(RequestFilters filters, params string[] types);
    }

    public class RequestFilters
    {
        private IEnumerable<string> _methodList; 
        private IEnumerable<string> _tagList; 

        public static RequestFilters None { get; } = new RequestFilters();

        public float? DurationMinimum { get; set; }

        public float? DurationMaximum { get; set; }

        public string UrlContains { get; set; }

        public IEnumerable<string> MethodList
        {
            get { return _methodList ?? Enumerable.Empty<string>(); }
            set { _methodList = value; }
        }

        public int? StatusCodeMinimum { get; set; }

        public int? StatusCodeMaximum { get; set; }

        public IEnumerable<string> TagList
        {
            get { return _tagList ?? Enumerable.Empty<string>(); }
            set { _tagList = value; }
        }

        public DateTime? RequesTimeBefore { get; set; }

        public string UserId { get; set; }
    }
}