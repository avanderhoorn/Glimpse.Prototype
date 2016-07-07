using Glimpse.Internal.Extensions;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Glimpse.Server.Storage
{
    public class InMemoryStorage : IStorage, IQueryRequests
    {
        /// <summary>
        /// Internal class to contain all data associated with a single request. 
        /// </summary>
        private class RequestInfo : IDisposable
        {
            /// <summary>
            /// The list of IMessage instances associated with this request.
            /// </summary>
            private readonly LinkedList<IMessage> _messages;

            /// <summary>
            /// The request indices for this request
            /// </summary>
            private RequestIndices _indices;

            /// <summary>
            /// The linked-list node in the LRU list.   
            /// </summary>
            private readonly LinkedListNode<Guid> _requestLRUNode;

            /// <summary>
            /// Lock object to control access to this specific request
            /// </summary>
            private readonly ReaderWriterLockSlim _requestLock;

            /// <summary>
            /// determines if this is disposed. 
            /// </summary>
            private bool _isDisposed = false;

            /// <summary>
            /// The node in the _activeRequests list.  Storing this here allows us to determine to track 
            /// requests by age in constant time.
            /// </summary>
            public LinkedListNode<Guid> RequestLRUNode { get { return _requestLRUNode; } }


            /// <summary>
            /// Indices associated with this Request
            /// </summary>
            public RequestIndices Indices
            {
                get
                {
                    return this.SynchronizedRead(() => { return this._indices; });
                }
            }


            public RequestInfo(LinkedListNode<Guid> lruNode)
            {
                this._requestLRUNode = lruNode;
                this._messages = new LinkedList<IMessage>();
                this._indices = null;
                this._requestLock = new ReaderWriterLockSlim();
            }


            public void AddMessage(IMessage message)
            {
                this.SynchronizedWrite(() =>
                {
                    this._messages.AddLast(message);
                    if (IsRequestMessage(message))
                    {
                        if (this._indices == null)
                        {
                            this._indices = new RequestIndices(message);
                        }
                        else
                        {
                            this._indices = new RequestIndices(this._indices, message);
                        }
                    }
                });
            }

            /// <summary>
            /// Makes a copy of current messages associated with this request, and returns it as a read-only list. 
            /// </summary>
            public IEnumerable<IMessage> SnapshotMessages()
            {
                // TODO:  For efficiency, you can probably replace this to return a custom IEnumerator
                // that is tolerant of the underlying messages being updated.  Since messages are only 
                // ever appended, this should be easy/safe to do. 
                return SynchronizedRead(() =>
                {
                    return new List<IMessage>(this._messages).AsReadOnly();
                });
            }

            /// <summary>
            /// Synchronously execute the given function inside the context of this request's read Lock
            /// </summary>
            /// <typeparam name="T">return type of the given function</typeparam>
            /// <param name="f">function to execute inside the lock</param>
            /// <returns>value returned from given function f</returns>
            private T SynchronizedRead<T>(Func<T> f)
            {
                try
                {
                    Debug.Assert(this._isDisposed == false, "Error!  Trying to Read a disposed RequestInfo.");
                    this._requestLock.EnterReadLock();
                    return f();
                }
                finally
                {
                    this._requestLock.ExitReadLock();
                }
            }

            /// <summary>
            /// Synchronously execute the given action inside the context of this request's write Lock
            /// </summary>
            /// <param name="a">action to execute</param>
            private void SynchronizedWrite(Action a)
            {
                try
                {
                    Debug.Assert(this._isDisposed == false, "Error!  Trying to write a disposed RequestInfo.");
                    this._requestLock.EnterWriteLock();
                    a();
                }
                finally
                {
                    this._requestLock.ExitWriteLock();
                }
            }

            protected virtual void Dispose(bool disposing)
            {
                if (!_isDisposed)
                {
                    if (disposing)
                    {
                        SynchronizedWrite(() =>
                        {
                            this._messages.Clear();
                        });

                        // assumption here is no other thread will be trying to read/write this RequestInfo after we've 
                        // called dispose.
                        Debug.Assert(this._requestLock.CurrentReadCount == 0, "Error!  CurrentReadCount is not zero for RequestInfo");
                        Debug.Assert(this._requestLock.WaitingReadCount == 0, "Error!  WaitingReadCount is not zero for RequestInfo");
                        Debug.Assert(this._requestLock.WaitingUpgradeCount == 0, "Error!  WaitingUpgradeCount is not zero for RequestInfo");
                        Debug.Assert(this._requestLock.WaitingWriteCount == 0, "Error!  WaitingWriteCount is not zero for RequestInfo");
                        this._requestLock.Dispose();

                        _isDisposed = true;
                    }
                }
            }

            // This code added to correctly implement the disposable pattern.
            public void Dispose()
            {
                Dispose(true);
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
        private readonly ReaderWriterLockSlim _storageLock;

        /// <summary>
        /// Constructor.
        /// </summary>
        /// <param name="maxRequests">Max number of requests to store.  OPtional.  Defaults to DefaultMaxRequests.</param>
        public InMemoryStorage(int maxRequests = DefaultMaxRequests)
        {
            _requestTable = new Dictionary<Guid, RequestInfo>();
            _requestLRUList = new LinkedList<Guid>();
            _storageLock = new ReaderWriterLockSlim();
            _maxRequests = maxRequests;
        }

        /// <summary>
        /// Persist the given message.
        /// </summary>
        /// <param name="message">The message to store.</param>
        public void Persist(IMessage message)
        {
            var requestId = message.Context.Id;
            RequestInfo requestInfo = null;
            this.SynchronizedWrite(() =>
            {
                requestInfo = GetOrCreateRequestInfo(requestId);
                TriggerCleanup();
            });

            requestInfo.AddMessage(message);
        }

        /// <summary>
        /// Get the request for the given ID, or create it if it doesn't exist.
        /// </summary>
        /// <param name="requestId">Guid of the request</param>
        /// <returns>RequestInfo isntance associated with the ID</returns>
        private RequestInfo GetOrCreateRequestInfo(Guid requestId)
        {
            AssertWriteLockHeld();
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
            AssertWriteLockHeld();
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
            AssertWriteLockHeld();
            LinkedListNode<Guid> r = _requestLRUList.Last;
            _requestLRUList.Remove(r);
            var requestInfo = _requestTable[r.Value];
            _requestTable.Remove(r.Value);
            requestInfo.Dispose();
        }

        /// <summary>
        ///  Run a set of internal consistency checks.  
        /// </summary>
        /// <returns>True if all consistency checks pass, false otherwise.</returns>
        public bool CheckConsistency()
        {
            return this.SynchronizedRead(() =>
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
                if (this._requestTable.Count > this._maxRequests) { return false; }
                if (this._requestLRUList.Count != this._requestTable.Count) { return false; }

                return true;
            });
        }

        /// <summary>
        /// Retrieves the current number of requests stored.
        /// </summary>
        /// <returns>The current number of requests stored.</returns>
        public int GetRequestCount()
        {
            return this.SynchronizedRead(() => { return _requestTable.Count; });
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
            RequestInfo requestInfo = this.SynchronizedRead(() =>
            {
                if (this._requestTable.ContainsKey(id))
                {
                    return this._requestTable[id];
                }
                else
                {
                    return null;
                }
            });

            if (requestInfo != null)
            {
                return requestInfo.SnapshotMessages();
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
            return this.SynchronizedRead(() =>
            {
                var allMessages = new List<IMessage>();
                foreach (var requestInfo in this._requestTable.Values)
                {
                    var snapshot = requestInfo.SnapshotMessages();
                    allMessages.AddRange(snapshot);
                }
                return allMessages;
            });
        }

        /// <summary>
        /// Retrieve all indices for all requests.
        /// </summary>
        /// <returns>All indices for all requests.</returns>
        private IEnumerable<RequestIndices> GetAllIndices()
        {
            return this.SynchronizedRead(() =>
            {
                var allIndices = new List<RequestIndices>();
                foreach (var v in this._requestTable.Values)
                {
                    allIndices.Add(v.Indices);
                }
                return allIndices;
            });
        }

        /// <summary>
        /// Assert that the write lock is correctly held
        /// </summary>
        private void AssertWriteLockHeld()
        {
            Debug.Assert(_storageLock.IsWriteLockHeld, "expected write lock to be held, but it isn't. This is a potential race condition.");
        }

        /// <summary>
        /// Synchronously execute the given action inside the context of this InMemoryStorage instance's write Lock
        /// </summary>
        /// <param name="a">Action toe execute inside the lock</param>
        private void SynchronizedWrite(Action a)
        {
            try
            {
                this._storageLock.EnterWriteLock();
                a();
            }
            finally
            {
                this._storageLock.ExitWriteLock();
            }
        }

        /// <summary>
        /// Synchronously execute the given function inside the context of this InMemoryStorage instance's read Lock
        /// </summary>
        /// <typeparam name="T">return type of the given function</typeparam>
        /// <param name="f">function to execute inside the lock</param>
        /// <returns>value returned from given function f</returns>
        private T SynchronizedRead<T>(Func<T> f)
        {
            try
            {
                this._storageLock.EnterReadLock();
                return f();
            }
            finally
            {
                this._storageLock.ExitReadLock();
            }
        }

        /// <summary>
        /// Add a new request to the structure
        /// </summary>
        /// <param name="requestId"></param>
        /// <returns></returns>
        private RequestInfo AddRequest(Guid requestId)
        {
            AssertWriteLockHeld();
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
            AssertWriteLockHeld();
            _requestLRUList.Remove(requestInfo.RequestLRUNode);
            _requestLRUList.AddFirst(requestInfo.RequestLRUNode);
        }
    }

    /// <summary>
    /// Class that contains request indices.  For thread safety, this class is immutable after construction.  To update indices, create a new 
    /// instance via the  constructor that takes an existing instance an IMessage.   
    /// </summary>
    public class RequestIndices
    {
        private readonly List<string> _tags;

        public RequestIndices(IMessage message)
        {
            Id = message.Context.Id;
            _tags = new List<string>();

            ParseAndUpdateIndicesFor(message);
        }

        /// <summary>
        /// Initialize properties from the passed in instance, and then update the properties based on values from the given IMessage.
        /// </summary>
        /// <param name="that"></param>
        /// <param name="message"></param>
        public RequestIndices(RequestIndices that, IMessage message)
        {
            this.Duration = that.Duration;
            this.Url = that.Url;
            this.Method = that.Method;
            this.StatusCode = that.StatusCode;
            this.Id = that.Id;
            this.DateTime = that.DateTime;
            this.UserId = that.UserId;
            this._tags = new List<string>(that._tags);
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