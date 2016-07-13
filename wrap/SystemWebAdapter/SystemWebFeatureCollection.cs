using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.WebSockets;
using System.Reflection;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Security.Cryptography.X509Certificates;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using SystemWebAdapter.Internal;
using Microsoft.AspNet.Http;
using Microsoft.AspNet.Http.Features;
using Microsoft.AspNet.Http.Features.Authentication;
using Microsoft.AspNet.Http.Features.Internal;

namespace SystemWebAdapter
{
    public class SystemWebFeatureCollection :
        IFeatureCollection,
        IHttpRequestFeature,
        IHttpResponseFeature,
        IHttpConnectionFeature,
        IHttpRequestIdentifierFeature,
        IHttpRequestLifetimeFeature,
        ITlsConnectionFeature,
        IHttpSendFileFeature,
        IHttpAuthenticationFeature,
        IItemsFeature,
        IServiceProvidersFeature,
        IHttpBufferingFeature
        //IHttpWebSocketFeature,
    {
        private readonly System.Web.HttpContext _httpContext;
        private readonly System.Web.HttpRequest _httpRequest;
        private readonly System.Web.HttpResponse _httpResponse;

        public SystemWebFeatureCollection(System.Web.HttpContext httpContext, IServiceProvider serviceProvider)
        {
            _httpContext = httpContext;
            _httpRequest = httpContext.Request;
            _httpResponse = httpContext.Response;
            
            ApplicationServices = serviceProvider;
            RequestServices = serviceProvider;
        }

        // IHttpRequestFeature
        string IHttpRequestFeature.Protocol
        {
            get { return _httpRequest.ServerVariables["SERVER_PROTOCOL"]; }
            set { }
        }

        string IHttpRequestFeature.Scheme
        {
            get { return _httpRequest.IsSecureConnection ? "https" : "http"; }
            set { }
        }

        string IHttpRequestFeature.Method
        {
            get { return _httpRequest.HttpMethod; }
            set { }
        }

        string IHttpRequestFeature.PathBase
        {
            get { return Utils.NormalizePath(HttpRuntime.AppDomainAppVirtualPath); }
            set { }
        }

        string IHttpRequestFeature.Path
        {
            get { return _httpRequest.AppRelativeCurrentExecutionFilePath.Substring(1) + _httpRequest.PathInfo; }
            set { }
        }

        string IHttpRequestFeature.QueryString
        {
            get
            {
                var requestQueryString = string.Empty;
                var uri = _httpRequest.Url;
                if (uri != null)
                {
                    var query = uri.Query + uri.Fragment; // System.Uri mistakes un-escaped # in the query as a fragment
                    if (query.Length > 1)
                    {
                        // pass along the query string without the leading "?" character
                        requestQueryString = query.Substring(1);
                    }
                }
                return requestQueryString;
            }
            set { }
        }

        private IHeaderDictionary _requestHeaders;
        IHeaderDictionary IHttpRequestFeature.Headers
        {
            get { return _requestHeaders ?? (_requestHeaders = new HeaderDictionary(_httpRequest.Headers)); }
            set { }
        }

        private Stream _requestBody;
        Stream IHttpRequestFeature.Body
        {
            get { return _requestBody ?? (_requestBody = new InputStream(_httpRequest)); }
            set { }
        }

        // IHttpResponseFeature
        int IHttpResponseFeature.StatusCode
        {
            get { return _httpResponse.StatusCode; }
            set { _httpResponse.StatusCode = value; }
        }

        string IHttpResponseFeature.ReasonPhrase
        {
            get { return _httpResponse.StatusDescription; }
            set { _httpResponse.StatusDescription = value; }
        }

        private IHeaderDictionary _responseHeaders;
        IHeaderDictionary IHttpResponseFeature.Headers
        {
            get { return _responseHeaders ?? (_responseHeaders = new HeaderDictionary(_httpResponse.Headers)); }
            set { }
        }

        private Stream _responseBody;
        Stream IHttpResponseFeature.Body
        {
            get { return _responseBody ?? (_responseBody = new OutputStream(_httpResponse, OnStart, (() => {}))); }
            set { }
        }

        bool IHttpResponseFeature.HasStarted
        {
            get { return _hasStarted; }
        }

        void IHttpResponseFeature.OnStarting(Func<object, Task> callback, object state)
        {
            _sendingHeadersEvent.Register(
                s => {
                    // need to block on the callback since we can't change this signature to be async
                    callback(s).GetAwaiter().GetResult();
                }, state);
        }

        void IHttpResponseFeature.OnCompleted(Func<object, Task> callback, object state)
        {
            throw new NotSupportedException("OnCompleted isn't yet supported");
        }

        // Tracking - OnStarting/HasStarted
        private readonly SendingHeadersEvent _sendingHeadersEvent = new SendingHeadersEvent();
        private Exception _startException;
        private bool _startCalled;
        private object _startLock = new object();
        private bool _hasStarted;

        private void OnStart()
        {
            var exception = LazyInitializer.EnsureInitialized(ref _startException, ref _startCalled, ref _startLock, 
                () => {
                    try
                    {
                        _sendingHeadersEvent.Fire();
                        _hasStarted = true;
                    }
                    catch (Exception ex)
                    {
                        return ex;
                    }

                    return null;
                });

            if (exception != null)
            {
                throw new InvalidOperationException(string.Empty, exception);
            }
        }

        // IHttpConnectionFeature
        IPAddress IHttpConnectionFeature.RemoteIpAddress
        {
            get { return IPAddress.Parse(_httpRequest.ServerVariables["REMOTE_ADDR"]); }
            set { }
        }

        IPAddress IHttpConnectionFeature.LocalIpAddress
        {
            get { return IPAddress.Parse(_httpRequest.ServerVariables["LOCAL_ADDR"]); }
            set { }
        }

        int IHttpConnectionFeature.RemotePort
        {
            get { return int.Parse(_httpRequest.ServerVariables["REMOTE_PORT"]); }
            set { }
        }

        int IHttpConnectionFeature.LocalPort
        {
            get { return int.Parse(_httpRequest.ServerVariables["SERVER_PORT"]); }
            set { }
        }

        bool IHttpConnectionFeature.IsLocal
        {
            get { return false; }
            set { }
        }

        // IHttpRequestIdentifierFeature
        string IHttpRequestIdentifierFeature.TraceIdentifier
        {
            get
            {
                var httpWorkerRequest = ((IServiceProvider)_httpContext).GetService(typeof(HttpWorkerRequest)) as HttpWorkerRequest;

                return httpWorkerRequest?.RequestTraceIdentifier.ToString();
            }
            set { }
        }

        // IHttpRequestLifetimeFeature
        void IHttpRequestLifetimeFeature.Abort()
        {
            _httpRequest.Abort();
        }

        CancellationToken IHttpRequestLifetimeFeature.RequestAborted
        {
            get { return _httpResponse.ClientDisconnectedToken; }
            set { }
        }


        // ITlsConnectionFeature
        private X509Certificate2 LoadClientCert
        {
            get
            {
                var cert = (X509Certificate2)null;
                try
                {
                    if (_httpContext.Request.ClientCertificate != null && _httpContext.Request.ClientCertificate.IsPresent)
                    {
                        cert = new X509Certificate2(_httpContext.Request.ClientCertificate.Certificate);
                    }
                }
                catch (CryptographicException)
                {
                }

                return cert;
            }
        }

        Task<X509Certificate2> ITlsConnectionFeature.GetClientCertificateAsync(CancellationToken cancellationToken)
        {
            return Task.FromResult(LoadClientCert);
        }
        
        X509Certificate2 ITlsConnectionFeature.ClientCertificate
        {
            get { return LoadClientCert; }
            set { }
        }
        private bool SupportsClientCerts
        {
            get
            {
                return string.Equals("https", ((IHttpRequestFeature)this).Scheme, StringComparison.OrdinalIgnoreCase);
            }
        }

        // IHttpSendFileFeature
        public Task SendFileAsync(string path, long offset, long? length, CancellationToken cancellation)
        {
            if (cancellation.IsCancellationRequested)
            {
                return Utils.CancelledTask;
            }

            try
            {
                //OnStart();

                // TransmitFile is not safe to call on a background thread.  It should complete quickly so long as buffering is enabled.
                _httpContext.Response.TransmitFile(path, offset, length ?? -1);

                return Utils.CompletedTask;
            }
            catch (Exception ex)
            {
                return Utils.CreateFaultedTask(ex);
            }
        }


        // IHttpAuthenticationFeature
        private ClaimsPrincipal _requestUser;
        ClaimsPrincipal IHttpAuthenticationFeature.User
        {
            get { return _requestUser ?? (_requestUser = Utils.MakeClaimsPrincipal(_httpContext.User)); }
            set
            {
                _requestUser = null;
                _httpContext.User = value;
            }
        }

        IAuthenticationHandler IHttpAuthenticationFeature.Handler
        {
            get; set;
        }

        // IItemsFeature
        private IDictionary<object, object> _items;
        IDictionary<object, object> IItemsFeature.Items
        {
            get { return _items ?? (_items = new SystemWebAdapter.Internal.ItemsDictionary(_httpContext.Items)); }
            set { }
        }

        // IServiceProvidersFeature
        public IServiceProvider ApplicationServices { get; set; } // TODO: Removed in RC2

        public IServiceProvider RequestServices { get; set; }

        public bool SupportsServiceProvider
        {
            get { return ApplicationServices != null || RequestServices != null; }
        }

        // IHttpBufferingFeature
        void IHttpBufferingFeature.DisableRequestBuffering()
        {
            var inputStream = (InputStream)((IHttpRequestFeature)this).Body;
            inputStream.DisableBuffering();
        }

        void IHttpBufferingFeature.DisableResponseBuffering()
        {
            _httpResponse.BufferOutput = false;
        }

        // IFeatureCollection
        public int Revision
        {
            get { return 0; } // Not modifiable
        }

        public bool IsReadOnly
        {
            get { return true; }
        }
        
        public object this[Type key]
        {
            get { return Get(key); }
            set { throw new NotSupportedException(); }
        }

        private bool SupportsInterface(Type key)
        {
            // Does this type implement the requested interface?
            if (key.GetTypeInfo().IsAssignableFrom(GetType().GetTypeInfo()))
            {
                // Check for conditional features
                if (key == typeof(ITlsConnectionFeature))
                {
                    return SupportsClientCerts;
                }
                if (key == typeof (IServiceProvidersFeature))
                {
                    return SupportsServiceProvider;
                }
                //if (key == typeof(IHttpWebSocketFeature))
                //{
                //    return SupportsWebSockets;
                //}

                // The rest of the features are always supported.
                return true;
            }
            return false;
        }

        public TFeature Get<TFeature>()
        {
            return (TFeature)this[typeof(TFeature)];
        }

        public void Set<TFeature>(TFeature instance)
        {
            this[typeof(TFeature)] = instance;
        }

        public object Get(Type key)
        {
            if (SupportsInterface(key))
            {
                return this;
            }
            return null;
        }

        public void Set(Type key, object value)
        {
            throw new NotSupportedException();
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return GetEnumerator();
        }

        public IEnumerator<KeyValuePair<Type, object>> GetEnumerator()
        {
            yield return new KeyValuePair<Type, object>(typeof(IHttpRequestFeature), this);
            yield return new KeyValuePair<Type, object>(typeof(IHttpResponseFeature), this);
            yield return new KeyValuePair<Type, object>(typeof(IHttpConnectionFeature), this);
            yield return new KeyValuePair<Type, object>(typeof(IHttpRequestIdentifierFeature), this);
            yield return new KeyValuePair<Type, object>(typeof(IHttpRequestLifetimeFeature), this);
            yield return new KeyValuePair<Type, object>(typeof(IHttpSendFileFeature), this);
            yield return new KeyValuePair<Type, object>(typeof(IHttpAuthenticationFeature), this);
            yield return new KeyValuePair<Type, object>(typeof(IItemsFeature), this);
            yield return new KeyValuePair<Type, object>(typeof(IHttpBufferingFeature), this);

            // Check for conditional features
            if (SupportsClientCerts)
            {
                yield return new KeyValuePair<Type, object>(typeof(ITlsConnectionFeature), this);
            }
            if (SupportsServiceProvider)
            {
                yield return new KeyValuePair<Type, object>(typeof(IServiceProvidersFeature), this);
            }
            //if (SupportsWebSockets)
            //{
            //    yield return new KeyValuePair<Type, object>(typeof(IHttpWebSocketFeature), this);
            //}
        }

        public void Dispose()
        {
        }
    }
}
