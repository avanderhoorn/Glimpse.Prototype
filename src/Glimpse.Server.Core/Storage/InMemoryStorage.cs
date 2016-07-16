using Glimpse.Internal.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Glimpse.Server.Storage
{
    public class InMemoryStorage : IStorage, IQueryRequests
    {
        /// <summary>
        /// Internal class to contain all data associated with a single request. 
        /// </summary>
        private class RequestInfo
        {
            public RequestInfo(LinkedListNode<Guid> lruNode)
            {
                this.RequestLRUNode = lruNode;
                this.Messages = new LinkedList<IMessage>();
                this.Indices = null;
            }

            /// <summary>
            /// List of individual messages associated with this request
            /// </summary>
            public LinkedList<IMessage> Messages { get; private set; }

            /// <summary>
            /// The node in the _activeRequests list.  Storing this here allows us to determine to track 
            /// requests by age in constant time.
            /// </summary>
            public LinkedListNode<Guid> RequestLRUNode { get; private set; }

            /// <summary>
            /// Indices associated with this Request
            /// </summary>
            public RequestIndices Indices { get; set; }

            public void AddMessage(IMessage message)
            {
                this.Messages.AddLast(message);
            }

            public void AddOrUpdateIndices(IMessage message)
            {
                if (this.Indices == null)
                {
                    this.Indices = new RequestIndices(message);
                }
                else
                {
                    this.Indices.Update(message);
                }
            }
        }

        public const int RequestsPerPage = 50;
        public const int DefaultMaxRequests = 500;

        /// <summary>
        /// Primary storage for Messages. 
        /// </summary>
        private readonly Dictionary<Guid, RequestInfo> _requestTable;

        /// <summary>
        /// Currently active requests, ordered by incoming messages for the request.  The first entry in the list will be
        /// the most recent request to receive a message, the last entry the oldest request to receive a message.
        /// </summary>
        private readonly LinkedList<Guid> _requestLRUList;

        /// <summary>
        /// Maximum number of requests to store for this request.
        /// </summary>
        private readonly int _maxRequests;


        /// <summary>
        /// Lock to synchronize access to this data structure. 
        /// </summary>
        // TODO:  Consider changing to a multi-reader/single-writer lock for increased read throughput
        private readonly object _locker = new object();

        /// <summary>
        /// Constructor.
        /// </summary>
        /// <param name="maxRequests">Max number of requests to store.  OPtional.  Defaults to DefaultMaxRequests.</param>
        public InMemoryStorage(int maxRequests = DefaultMaxRequests)
        {
            _requestTable = new Dictionary<Guid, RequestInfo>();
            _requestLRUList = new LinkedList<Guid>();
            _maxRequests = maxRequests;
        }

        /// <summary>
        /// Persist the given message.
        /// </summary>
        /// <param name="message">The message to store.</param>
        public void Persist(IMessage message)
        {
            var requestId = message.Context.Id;

            lock (_locker)
            {
                var requestInfo = GetOrCreateRequestInfo(requestId);

                requestInfo.AddMessage(message);

                if (IsRequestMessage(message))
                {
                    requestInfo.AddOrUpdateIndices(message);
                }

                TriggerCleanup();
            }
        }

        /// <summary>
        /// Get the request for the given ID, or create it if it doesn't exist.
        /// </summary>
        /// <param name="requestId">Guid of the request</param>
        /// <returns>RequestInfo isntance associated with the ID</returns>
        private RequestInfo GetOrCreateRequestInfo(Guid requestId)
        {
            // TODO:  need to assert here that lock is correctly held
            RequestInfo ri;
            if (!_requestTable.TryGetValue(requestId, out ri))
            {
                ri = AddRequest(requestId);
            }
            else if (ri.RequestLRUNode.Previous != null)
            {
                UpdateLRUList(ri);
            }

            return ri;
        }
        
        /// <summary>
        /// Add a new request to the structure
        /// </summary>
        /// <param name="requestId"></param>
        /// <returns></returns>
        private RequestInfo AddRequest(Guid requestId)
        {
            // TODO:  need to assert here that lock is correctly held
            var llNode = _requestLRUList.AddFirst(requestId);
            var ri = new RequestInfo(llNode);
            _requestTable.Add(requestId, ri);
            return ri;
        }

        /// <summary>
        /// Update a requests position in the LRU list.
        /// </summary>
        /// <param name="requestInfo">RequestInfo instance of the request to update</param>
        private void UpdateLRUList(RequestInfo requestInfo)
        {
            // move this request to the head of the "active list"
            _requestLRUList.Remove(requestInfo.RequestLRUNode);
            _requestLRUList.AddFirst(requestInfo.RequestLRUNode);
        }

        /// <summary>
        /// Determines if a message is a request message or not
        /// </summary>
        /// <param name="message"></param>
        /// <returns>true if a request message, false otherwise</returns>
        private static bool IsRequestMessage(IMessage message)
        {
            return message.Context.Type.Equals("request", StringComparison.OrdinalIgnoreCase);
        }

        /// <summary>
        /// Initiate cleanup logic to purge old requests
        /// </summary>
        private void TriggerCleanup()
        {
            if (_requestTable.Count > _maxRequests)
            {
                var toRemove = Math.Max(_maxRequests / 10, 1);
                for (int i = 0; i < toRemove; i++)
                {
                    RemoveOldestRequest();
                }
            }
        }

        /// <summary>
        /// Remove the oldest request
        /// </summary>
        private void RemoveOldestRequest()
        {
            LinkedListNode<Guid> r = _requestLRUList.Last;
            _requestLRUList.Remove(r);
            _requestTable.Remove(r.Value);
        }
        
        /// <summary>
        ///  Run a set of internal consistency checks.  
        /// </summary>
        /// <returns>True if all consistency checks pass, false otherwise.</returns>
        public bool CheckConsistency()
        {
            lock (_locker)
            {
                // verify every node in _activeRequests has a corresponding entry in _requestTable
                var current = _requestLRUList.First;
                while (current != null)
                {
                    var requestInfo = _requestTable[current.Value];
                    if (requestInfo == null) { return false; }
                    if (requestInfo.RequestLRUNode != current) { return false; }
                    current = current.Next;
                }

                // verify every node in _requestTable has a valid entry in _activeRequests 
                foreach (var kvpair in _requestTable)
                {
                    if (kvpair.Value.RequestLRUNode == null) { return false; }
                    if (kvpair.Value.RequestLRUNode.List != _requestLRUList) { return false; }
                }

                // verify # of requests is within expected range
                if (this._requestTable.Count < this._maxRequests) { return false; }
                if (this._requestLRUList.Count != this._requestTable.Count) { return false; }

                return true;
            }
        }

        /// <summary>
        /// Retrieves the current number of requests stored.
        /// </summary>
        /// <returns>The current number of requests stored.</returns>
        public int GetRequestCount()
        {
            return _requestTable.Count;
        }

        public Task<IEnumerable<string>> RetrieveByType(params string[] types)
        {
            if (types == null || types.Length == 0)
                throw new ArgumentException("At least one type must be specified.", nameof(types));

            return Task.Run(() => this.GetAllMessages().Where(m => m.Types.Intersect(types).Any()).Select(m => m.Payload));
        }

        public Task<IEnumerable<string>> RetrieveByContextId(Guid id)
        {
            return Task.Run(() => GetMessagesByRequestId(id).Select(m => m.Payload));
        }

        public Task<IEnumerable<string>> RetrieveByContextId(Guid id, params string[] typeFilter)
        {
            Func<IMessage, bool> filter = _ => true;

            if (typeFilter.Length > 0)
                filter = m => m.Types.Intersect(typeFilter).Any();

            return Task.Run(() => GetMessagesByRequestId(id).Where(filter).Select(m => m.Payload));
        }

        /// <summary>
        /// Returns the list of individual messages for a given request ID.
        /// </summary>
        /// <param name="id">The request ID.</param>
        /// <returns>Messages associated with request ID.</returns>
        public IEnumerable<IMessage> GetMessagesByRequestId(Guid id)
        {
            if (_requestTable.ContainsKey(id))
            {
                return _requestTable[id].Messages;
            }
            else
            {
                return new Message[] { };
            }
        }

        public Task<IEnumerable<string>> Query(RequestFilters filters)
        {
            return Query(filters, null);
        }

        public Task<IEnumerable<string>> Query(RequestFilters filters, params string[] types)
        {
            if (filters == null)
                filters = RequestFilters.None;

            return Task.Run(() =>
            {
                var query = this.GetAllIndices();

                if (filters.DurationMaximum.HasValue)
                    query = query.Where(i => i.Duration.HasValue && i.Duration <= filters.DurationMaximum);

                if (filters.DurationMinimum.HasValue)
                    query = query.Where(i => i.Duration.HasValue && i.Duration >= filters.DurationMinimum.Value);

                if (!string.IsNullOrWhiteSpace(filters.UrlContains))
                    query = query.Where(i => !string.IsNullOrWhiteSpace(i.Url) && i.Url.Contains(filters.UrlContains));

                if (filters.MethodList.Any())
                    query = query.Where(i => !string.IsNullOrWhiteSpace(i.Method) && filters.MethodList.Contains(i.Method));

                if (filters.TagList.Any())
                    query = query.Where(i => i.Tags.Intersect(filters.TagList).Any());

                if (filters.StatusCodeMinimum.HasValue)
                    query = query.Where(i => i.StatusCode.HasValue && i.StatusCode >= filters.StatusCodeMinimum);

                if (filters.StatusCodeMaximum.HasValue)
                    query = query.Where(i => i.StatusCode.HasValue && i.StatusCode <= filters.StatusCodeMaximum);

                if (filters.RequesTimeBefore.HasValue)
                    query = query.Where(i => i.DateTime.HasValue && i.DateTime < filters.RequesTimeBefore);

                if (!string.IsNullOrWhiteSpace(filters.UserId))
                    query = query.Where(i => !string.IsNullOrWhiteSpace(i.UserId) && i.UserId.Equals(filters.UserId, StringComparison.OrdinalIgnoreCase));

                return query
                    .OrderByDescending(i => i.DateTime)
                    .Take(RequestsPerPage)
                    .Join(
                        types == null ? this.GetAllMessages() : this.GetAllMessages().Where(m => m.Types.Intersect(types).Any()), // only filter by type if types are specified
                        i => i.Id,
                        m => m.Context.Id,
                        (i, m) => m.Payload);
            });
        }

        /// <summary>
        /// Retrieve all messages for all requests.
        /// </summary>
        /// <returns>All messages for all requests.</returns>
        private IEnumerable<IMessage> GetAllMessages()
        {
            foreach (var requestInfo in this._requestTable.Values)
            {
                foreach (IMessage msg in requestInfo.Messages)
                {
                    yield return msg;
                }
            }
        }

        /// <summary>
        /// Retrieve all indices for all requests.
        /// </summary>
        /// <returns>All indices for all requests.</returns>
        private IEnumerable<RequestIndices> GetAllIndices()
        {
            return this._requestTable.Values.Select((ri) => ri.Indices);
        }
    }

    public class RequestIndices
    {
        private readonly List<string> _tags;

        public RequestIndices(IMessage message)
        {
            Id = message.Context.Id;
            _tags = new List<string>();

            ParseAndUpdateIndicesFor(message);
        }

        public double? Duration { get; private set; }

        public string Url { get; private set; }

        public string Method { get; private set; }

        public int? StatusCode { get; private set; }

        public Guid Id { get; }

        public DateTime? DateTime { get; private set; }

        public string UserId { get; set; }

        public IEnumerable<string> Tags => _tags.Distinct();

        public void Update(IMessage message)
        {
            if (message.Context.Id != Id)
                throw new ArgumentException($"Input Request ID '{message.Context.Id}' does not match existing request ID '{Id}'.");

            ParseAndUpdateIndicesFor(message);
        }

        private void ParseAndUpdateIndicesFor(IMessage message)
        {
            var indices = message.Indices;
            if (indices != null)
            {
                var duration = indices.GetValueOrDefault("request-duration") as double?;
                if (duration != null) Duration = duration;

                var url = indices.GetValueOrDefault("request-url") as string;
                if (!string.IsNullOrWhiteSpace(url)) Url = url;

                var method = indices.GetValueOrDefault("request-method") as string;
                if (!string.IsNullOrWhiteSpace(method)) Method = method;

                var userId = indices.GetValueOrDefault("request-userId") as string;
                if (!string.IsNullOrWhiteSpace(userId)) UserId = userId;

                var statusCode = indices.GetValueOrDefault("request-statuscode") as int?;
                if (statusCode != null) StatusCode = statusCode;

                var dateTime = indices.GetValueOrDefault("request-datetime") as DateTime?;
                if (dateTime != null) DateTime = dateTime;

                var messageTags = indices.GetValueOrDefault("request-tags") as IEnumerable<string> ?? Enumerable.Empty<string>();
                _tags.AddRange(messageTags);
            }
        }
    }

}