/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _MessagePublisher = __webpack_require__(1);

	var _RequestUtilities = __webpack_require__(4);

	var _XHRProxy = __webpack_require__(5);

	var _ResourceTimingProxy = __webpack_require__(7);

	var _ConsoleProxy = __webpack_require__(8);

	var _XHRInspector = __webpack_require__(9);

	var _ResourceTimingInspector = __webpack_require__(15);

	var _ConsoleInspector = __webpack_require__(16);

	var messagePublisher = new _MessagePublisher.MessagePublisher();
	new _XHRProxy.XHRProxy().init();
	new _ResourceTimingProxy.ResourceTimingProxy().init();
	new _ConsoleProxy.ConsoleProxy().init();
	new _XHRInspector.XHRInspector().init(messagePublisher);
	new _ResourceTimingInspector.ResourceTimingInspector().init(messagePublisher);
	new _ConsoleInspector.ConsoleInspector().init(messagePublisher);
	/* tslint:disable */
	// TODO: convert the rest of this to separate files:
	// https://github.com/Glimpse/Glimpse.Browser.Agent/issues/12
	(function () {
	    var processor = function () {
	        var _strategies = [];
	        return {
	            register: function register(strategy) {
	                _strategies.push(strategy);
	            },
	            execute: function execute() {
	                for (var i = 0; i < _strategies.length; i++) {
	                    _strategies[i]();
	                }
	            }
	        };
	    }();
	    (function () {
	        function getTiming() {
	            var performance = window.performance || window.webkitPerformance || window.msPerformance || window.mozPerformance;
	            if (performance == null) {
	                return;
	            }
	            return performance.timing;
	        }
	        function processTimings(timing) {
	            var api = {
	                firstPaint: undefined,
	                firstPaintTime: undefined,
	                loadTime: undefined,
	                domReadyTime: undefined,
	                readyStart: undefined,
	                redirectTime: undefined,
	                appcacheTime: undefined,
	                unloadEventTime: undefined,
	                lookupDomainTime: undefined,
	                connectTime: undefined,
	                requestTime: undefined,
	                initDomTreeTime: undefined,
	                loadEventTime: undefined,
	                networkRequestTime: undefined,
	                networkResponseTime: undefined,
	                networkTime: undefined,
	                serverTime: undefined,
	                browserTime: undefined,
	                total: undefined
	            };
	            if (timing) {
	                // bring across intersting data
	                for (var k in timing) {
	                    if (typeof timing[k] !== 'function') {
	                        api[k] = timing[k];
	                    }
	                }
	                // time to first paint
	                if (api.firstPaint === undefined) {
	                    // All times are relative times to the start time within the
	                    // same objects
	                    var firstPaint = 0;
	                    // Chrome
	                    if (window.chrome && window.chrome.loadTimes) {
	                        // Convert to ms
	                        firstPaint = window.chrome.loadTimes().firstPaintTime * 1000;
	                        api.firstPaintTime = firstPaint - window.chrome.loadTimes().startLoadTime * 1000;
	                    } else if (typeof window.performance.timing.msFirstPaint === 'number') {
	                        firstPaint = window.performance.timing.msFirstPaint;
	                        api.firstPaintTime = firstPaint - window.performance.timing.navigationStart;
	                    }
	                    api.firstPaint = firstPaint;
	                }
	                // total time from start to load
	                api.loadTime = timing.loadEventEnd - timing.fetchStart;
	                // time spent constructing the DOM tree
	                api.domReadyTime = timing.domComplete - timing.domInteractive;
	                // time consumed preparing the new page
	                api.readyStart = timing.fetchStart - timing.navigationStart;
	                // time spent during redirection
	                api.redirectTime = timing.redirectEnd - timing.redirectStart;
	                // appCache
	                api.appcacheTime = timing.domainLookupStart - timing.fetchStart;
	                // yime spent unloading documents
	                api.unloadEventTime = timing.unloadEventEnd - timing.unloadEventStart;
	                // DNS query time
	                api.lookupDomainTime = timing.domainLookupEnd - timing.domainLookupStart;
	                // TCP connection time
	                api.connectTime = timing.connectEnd - timing.connectStart;
	                // time spent during the request
	                api.requestTime = timing.responseEnd - timing.requestStart;
	                // request to completion of the DOM loading
	                api.initDomTreeTime = timing.domInteractive - timing.responseEnd;
	                // load event time
	                api.loadEventTime = timing.loadEventEnd - timing.loadEventStart;
	                // time spent on the network making the outgoing request
	                api.networkRequestTime = timing.requestStart - timing.navigationStart;
	                // time spent on the network receiving the incoming response
	                api.networkResponseTime = timing.responseEnd - timing.responseStart;
	                // time spent on the network for the whole request/response
	                api.networkTime = api.networkRequestTime + api.networkResponseTime;
	                // time spent on the server processing the request
	                api.serverTime = timing.responseEnd - timing.requestStart;
	                // time spent on the browser handling the response
	                api.browserTime = timing.loadEventEnd - timing.responseStart;
	                // total time
	                api.total = timing.loadEventEnd - timing.navigationStart;
	            }
	            return api;
	        }
	        // setup/regiter strategy to run later
	        (0, _RequestUtilities.addEvent)(window, 'load', function () {
	            setTimeout(function () {
	                messagePublisher.createAndPublishMessage('browser-navigation-timing', processTimings(getTiming()));
	            }, 0);
	        });
	    })();
	    processor.execute();
	})();
	/* tslint:enable */

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.MessagePublisher = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.chunkMessages = chunkMessages;
	exports.serializeRanges = serializeRanges;

	var _nanoajax = __webpack_require__(2);

	var _GeneralUtilities = __webpack_require__(3);

	var _RequestUtilities = __webpack_require__(4);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * break a list of messages into group so that the groups are under maxSize.
	 * If any individual message is over maxSize, it will be grouped on its own.
	 * returns an of IRange instances, where start is inclusive & end is exclusive.
	 *
	 * Exported for test purposes.
	 */
	function chunkMessages(messageBodies, maxSize) {
	    var ranges = [];
	    var sum = 0;
	    var lastStart = 0;
	    for (var i = 0; i < messageBodies.length; i++) {
	        sum += messageBodies[i].length;
	        if (messageBodies[i].length > maxSize) {
	            if (lastStart !== i) {
	                // when a single message is over the limit, we want to send previous messages in their own batch
	                ranges.push({ start: lastStart, end: i });
	            }
	            ranges.push({ start: i, end: i + 1 });
	            lastStart = i + 1;
	            sum = 0;
	        } else if (sum > maxSize) {
	            ranges.push({ start: lastStart, end: i });
	            lastStart = i;
	            sum = messageBodies[i].length;
	        }
	    }
	    if (lastStart < messageBodies.length) {
	        ranges.push({ start: lastStart, end: messageBodies.length });
	    }
	    return ranges;
	}
	/**
	 * given an array of serialized message bodies & array of ranges,
	 * break them into JSON-serialized sub-arrays as defined by the ranges.
	 *
	 * Exported for test purposes.
	 */
	function serializeRanges(messageBodies, ranges) {
	    var payloads = [];
	    for (var i = 0; i < ranges.length; i++) {
	        if (ranges[i].end > ranges[i].start) {
	            var subBodies = messageBodies.slice(ranges[i].start, ranges[i].end);
	            var payload = '[' + subBodies.join(',') + ']';
	            payloads.push(payload);
	        }
	    }
	    return payloads;
	}

	var MessagePublisher = exports.MessagePublisher = function () {
	    function MessagePublisher() {
	        _classCallCheck(this, MessagePublisher);

	        this.ordinal = 1;
	        this.messageQueue = [];
	        this.messageTimeout = undefined;
	    }

	    _createClass(MessagePublisher, [{
	        key: 'createMessage',
	        value: function createMessage(type, payload) {
	            return {
	                id: (0, _GeneralUtilities.getGuid)(),
	                types: [type],
	                payload: payload,
	                context: {
	                    id: (0, _RequestUtilities.getRequestId)(),
	                    type: 'Request'
	                },
	                ordinal: this.ordinal++,
	                agent: {
	                    source: 'browser'
	                },
	                offset: 0
	            };
	        }
	    }, {
	        key: 'publishMessage',
	        value: function publishMessage(message) {
	            var _this = this;

	            // finish getting message ready for sending
	            message.payload = JSON.stringify(message); // tslint:disable-line:no-string-literal
	            // add messages to queu
	            this.messageQueue.push(message);
	            // only setup the timeout if we need to
	            if (!this.messageTimeout) {
	                this.messageTimeout = setTimeout(function () {
	                    _this.messageTimeout = undefined;
	                    _this.sendData();
	                }, MessagePublisher.timeout);
	            }
	        }
	    }, {
	        key: 'createAndPublishMessage',
	        value: function createAndPublishMessage(type, payload) {
	            this.publishMessage(this.createMessage(type, payload));
	        }
	    }, {
	        key: 'sendPayload',
	        value: function sendPayload(body) {
	            // send data with all the data that we have batched up
	            (0, _nanoajax.ajax)({
	                url: (0, _RequestUtilities.getMessageIngressUrl)(),
	                method: 'POST',
	                body: body
	            }, function () {
	                // not doing anything atm
	            });
	        }
	    }, {
	        key: 'sendData',
	        value: function sendData() {
	            var _this2 = this;

	            // we'll chunk the pooled messages into individual requests to try stay under
	            // some size limit for http payloads.
	            var maxBodySize = 100000;
	            var bodies = [];
	            this.messageQueue.forEach(function (m) {
	                bodies.push(JSON.stringify(m));
	            });
	            var ranges = chunkMessages(bodies, maxBodySize);
	            var payloads = serializeRanges(bodies, ranges);
	            payloads.forEach(function (payload) {
	                _this2.sendPayload(payload);
	            });
	            this.messageQueue = [];
	        }
	    }]);

	    return MessagePublisher;
	}();

	MessagePublisher.timeout = 250;

/***/ },
/* 2 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {// Best place to find information on XHR features is:
	// https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest

	var reqfields = [
	  'responseType', 'withCredentials', 'timeout', 'onprogress'
	]

	// Simple and small ajax function
	// Takes a parameters object and a callback function
	// Parameters:
	//  - url: string, required
	//  - headers: object of `{header_name: header_value, ...}`
	//  - body:
	//      + string (sets content type to 'application/x-www-form-urlencoded' if not set in headers)
	//      + FormData (doesn't set content type so that browser will set as appropriate)
	//  - method: 'GET', 'POST', etc. Defaults to 'GET' or 'POST' based on body
	//  - cors: If your using cross-origin, you will need this true for IE8-9
	//
	// The following parameters are passed onto the xhr object.
	// IMPORTANT NOTE: The caller is responsible for compatibility checking.
	//  - responseType: string, various compatability, see xhr docs for enum options
	//  - withCredentials: boolean, IE10+, CORS only
	//  - timeout: long, ms timeout, IE8+
	//  - onprogress: callback, IE10+
	//
	// Callback function prototype:
	//  - statusCode from request
	//  - response
	//    + if responseType set and supported by browser, this is an object of some type (see docs)
	//    + otherwise if request completed, this is the string text of the response
	//    + if request is aborted, this is "Abort"
	//    + if request times out, this is "Timeout"
	//    + if request errors before completing (probably a CORS issue), this is "Error"
	//  - request object
	//
	// Returns the request object. So you can call .abort() or other methods
	//
	// DEPRECATIONS:
	//  - Passing a string instead of the params object has been removed!
	//
	exports.ajax = function (params, callback) {
	  // Any variable used more than once is var'd here because
	  // minification will munge the variables whereas it can't munge
	  // the object access.
	  var headers = params.headers || {}
	    , body = params.body
	    , method = params.method || (body ? 'POST' : 'GET')
	    , called = false

	  var req = getRequest(params.cors)

	  function cb(statusCode, responseText) {
	    return function () {
	      if (!called) {
	        callback(req.status === undefined ? statusCode : req.status,
	                 req.status === 0 ? "Error" : (req.response || req.responseText || responseText),
	                 req)
	        called = true
	      }
	    }
	  }

	  req.open(method, params.url, true)

	  var success = req.onload = cb(200)
	  req.onreadystatechange = function () {
	    if (req.readyState === 4) success()
	  }
	  req.onerror = cb(null, 'Error')
	  req.ontimeout = cb(null, 'Timeout')
	  req.onabort = cb(null, 'Abort')

	  if (body) {
	    setDefault(headers, 'X-Requested-With', 'XMLHttpRequest')

	    if (!global.FormData || !(body instanceof global.FormData)) {
	      setDefault(headers, 'Content-Type', 'application/x-www-form-urlencoded')
	    }
	  }

	  for (var i = 0, len = reqfields.length, field; i < len; i++) {
	    field = reqfields[i]
	    if (params[field] !== undefined)
	      req[field] = params[field]
	  }

	  for (var field in headers)
	    req.setRequestHeader(field, headers[field])

	  req.send(body)

	  return req
	}

	function getRequest(cors) {
	  // XDomainRequest is only way to do CORS in IE 8 and 9
	  // But XDomainRequest isn't standards-compatible
	  // Notably, it doesn't allow cookies to be sent or set by servers
	  // IE 10+ is standards-compatible in its XMLHttpRequest
	  // but IE 10 can still have an XDomainRequest object, so we don't want to use it
	  if (cors && global.XDomainRequest && !/MSIE 1/.test(navigator.userAgent))
	    return new XDomainRequest
	  if (global.XMLHttpRequest)
	    return new XMLHttpRequest
	}

	function setDefault(obj, key, value) {
	  obj[key] = obj[key] || value
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.getGuid = getGuid;
	function getGuid() {
	    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
	        /* tslint:disable:no-bitwise */
	        var r = Math.random() * 16 | 0,
	            v = c === 'x' ? r : r & 0x3 | 0x8;
	        /* tslint:enable:no-bitwise */
	        return v.toString(16);
	    });
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.getRequestId = getRequestId;
	exports.addEvent = addEvent;
	exports.getCookie = getCookie;
	exports.getMessageIngressUrl = getMessageIngressUrl;
	exports.parseUrl = parseUrl;
	exports.stringifyUrl = stringifyUrl;
	exports.resolveUrl = resolveUrl;

	var _GeneralUtilities = __webpack_require__(3);

	function getRequestId() {
	    // NOTE: agent should look to see if it can get the id
	    //       from a script tag first, then if it can't find
	    //       it there look to for a cookie (in the case where
	    //       we can't inject a script tag) and finally it will
	    //       create one which will be used moving forward
	    //       (CDN scenario).
	    var id = document.getElementById('__glimpse_browser_agent').getAttribute('data-request-id');
	    if (!id) {
	        id = getCookie('.Glimpse.RequestId');
	    }
	    if (!id) {
	        id = (0, _GeneralUtilities.getGuid)();
	    }
	    return id;
	}
	function addEvent(element, eventName, cb) {
	    if (element.addEventListener) {
	        element.addEventListener(eventName, cb, false);
	    } else if (element.attachEvent) {
	        element.attachEvent('on' + eventName, cb);
	    }
	}
	function getCookie(cookie) {
	    // Modified from https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
	    var regexp = new RegExp('(?:(?:^|.*;\\s*)' + cookie + '\\s*\\=\\s*([^;]*).*$)|^.*$');
	    return document.cookie.replace(regexp, '$1');
	}
	function getMessageIngressUrl() {
	    return document.getElementById('__glimpse_browser_agent').getAttribute('data-message-ingress-template');
	}
	function parseUrl(url) {
	    var parser = document.createElement('a');
	    parser.href = url;
	    return {
	        protocol: parser.protocol,
	        hostname: parser.hostname,
	        port: parseInt(parser.port, 10),
	        pathname: parser.pathname,
	        search: parser.search,
	        hash: parser.hash
	    };
	}
	function stringifyUrl(url) {
	    var stringifiedUrl = url.protocol + '//' + url.hostname + ':' + url.port + url.pathname;
	    if (url.search) {
	        stringifiedUrl += url.search;
	    }
	    if (url.hash) {
	        stringifiedUrl += url.hash;
	    }
	    return stringifiedUrl;
	}
	var urlCache = {};
	function resolveUrl(url) {
	    if (urlCache[url]) {
	        return urlCache[url];
	    }
	    return urlCache[url] = stringifyUrl(parseUrl(url));
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.XHRProxy = exports.EVENT_ABORT = exports.EVENT_ERROR = exports.EVENT_RESPONSE_RECEIVED = exports.EVENT_REQUEST_SENT = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Tracing = __webpack_require__(6);

	var _Tracing2 = _interopRequireDefault(_Tracing);

	var _GeneralUtilities = __webpack_require__(3);

	var _RequestUtilities = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var EVENT_REQUEST_SENT = exports.EVENT_REQUEST_SENT = 'invoke|pre|XMLHttpRequest.request-sent';
	var EVENT_RESPONSE_RECEIVED = exports.EVENT_RESPONSE_RECEIVED = 'notify|XMLHttpRequest.response-received';
	var EVENT_ERROR = exports.EVENT_ERROR = 'notify|XMLHttpRequest.error';
	var EVENT_ABORT = exports.EVENT_ABORT = 'notify|XMLHttpRequest.abort';

	var XHRProxy = exports.XHRProxy = function () {
	    function XHRProxy() {
	        _classCallCheck(this, XHRProxy);
	    }

	    _createClass(XHRProxy, [{
	        key: 'init',
	        value: function init() {
	            if (XHRProxy.isInitialized) {
	                console.error('Glimpse Error: Cannot initialize the XHR Proxy more than once.');
	                return;
	            }
	            // Note: TypeScript doesn't know about XMLHttpRequest existing on Window, so we
	            // reference the property this way to get around TypeScript, but we also have to
	            // disable tslint in the process
	            /* tslint:disable */
	            var oldXMLHttpRequest = window['XMLHttpRequest'];
	            /* tslint:enable */
	            function XMLHttpRequest() {
	                var xhr = new oldXMLHttpRequest();
	                var id = (0, _GeneralUtilities.getGuid)();
	                function handleAsyncRequest(method, url) {
	                    var requestHeaders = {};
	                    xhr.addEventListener('readystatechange', function () {
	                        if (xhr.readyState === oldXMLHttpRequest.DONE) {
	                            var eventData = {
	                                id: id,
	                                xhr: xhr,
	                                url: (0, _RequestUtilities.resolveUrl)(url),
	                                statusCode: xhr.status,
	                                bodyType: xhr.responseType,
	                                body: xhr.response
	                            };
	                            _Tracing2.default.publish(EVENT_RESPONSE_RECEIVED, eventData);
	                        }
	                        ;
	                    });
	                    xhr.addEventListener('error', function () {
	                        var eventData = {
	                            id: id,
	                            xhr: xhr,
	                            error: xhr.statusText
	                        };
	                        _Tracing2.default.publish(EVENT_ERROR, eventData);
	                    });
	                    xhr.addEventListener('abort', function () {
	                        var eventData = {
	                            id: id,
	                            xhr: xhr
	                        };
	                        _Tracing2.default.publish(EVENT_ABORT, eventData);
	                    });
	                    var oldSend = xhr.send;
	                    xhr.send = function send(body) {
	                        var eventData = {
	                            id: id,
	                            xhr: xhr,
	                            method: method,
	                            url: (0, _RequestUtilities.resolveUrl)(url),
	                            body: body,
	                            headers: requestHeaders
	                        };
	                        _Tracing2.default.publish(EVENT_REQUEST_SENT, eventData);

	                        for (var _len = arguments.length, sendArgs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	                            sendArgs[_key - 1] = arguments[_key];
	                        }

	                        oldSend.call.apply(oldSend, [this, body].concat(sendArgs));
	                    };
	                    var oldSetRequestHeader = xhr.setRequestHeader;
	                    xhr.setRequestHeader = function setRequestHeader(header, value) {
	                        requestHeaders[header] = value;

	                        for (var _len2 = arguments.length, setRequestHeaderArgs = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
	                            setRequestHeaderArgs[_key2 - 2] = arguments[_key2];
	                        }

	                        oldSetRequestHeader.call.apply(oldSetRequestHeader, [this, header, value].concat(setRequestHeaderArgs));
	                    };
	                }
	                function handleSyncRequest(method, url) {
	                    var oldSend = xhr.send;
	                    var requestHeaders = {};
	                    var oldSetRequestHeader = xhr.setRequestHeader;
	                    xhr.setRequestHeader = function setRequestHeader(header, value) {
	                        requestHeaders[header] = value;

	                        for (var _len3 = arguments.length, setRequestHeaderArgs = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
	                            setRequestHeaderArgs[_key3 - 2] = arguments[_key3];
	                        }

	                        oldSetRequestHeader.call.apply(oldSetRequestHeader, [this, header, value].concat(setRequestHeaderArgs));
	                    };
	                    xhr.send = function send(body) {
	                        var requestEventData = {
	                            id: id,
	                            xhr: xhr,
	                            method: method,
	                            url: (0, _RequestUtilities.resolveUrl)(url),
	                            body: body,
	                            headers: requestHeaders
	                        };
	                        _Tracing2.default.publish(EVENT_REQUEST_SENT, requestEventData);
	                        try {
	                            for (var _len4 = arguments.length, sendArgs = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
	                                sendArgs[_key4 - 1] = arguments[_key4];
	                            }

	                            oldSend.call.apply(oldSend, [this, body].concat(sendArgs));
	                        } catch (e) {
	                            var errorEventData = {
	                                id: id,
	                                xhr: xhr,
	                                error: e.message
	                            };
	                            _Tracing2.default.publish(EVENT_ERROR, errorEventData);
	                            throw e;
	                        }
	                        var responseEventData = {
	                            id: id,
	                            xhr: xhr,
	                            url: (0, _RequestUtilities.resolveUrl)(url),
	                            statusCode: xhr.status,
	                            bodyType: xhr.responseType,
	                            body: xhr.response
	                        };
	                        _Tracing2.default.publish(EVENT_RESPONSE_RECEIVED, responseEventData);
	                    };
	                }
	                var oldOpen = xhr.open;
	                xhr.open = function open(method, url) {
	                    var async = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

	                    for (var _len5 = arguments.length, openArgs = Array(_len5 > 3 ? _len5 - 3 : 0), _key5 = 3; _key5 < _len5; _key5++) {
	                        openArgs[_key5 - 3] = arguments[_key5];
	                    }

	                    var result = oldOpen.call.apply(oldOpen, [this, method, url, async].concat(openArgs));
	                    // If the url equals the message ingress url, that means it's
	                    // a Glimpse message and we don't want to profile it
	                    if (url !== (0, _RequestUtilities.getMessageIngressUrl)()) {
	                        if (async) {
	                            handleAsyncRequest(method, url);
	                        } else {
	                            handleSyncRequest(method, url);
	                        }
	                    }
	                    return result;
	                };
	                return xhr;
	            }
	            // Copy the states (and anything else) from the original object to our proxy
	            for (var prop in oldXMLHttpRequest) {
	                if (oldXMLHttpRequest.hasOwnProperty(prop)) {
	                    XMLHttpRequest[prop] = oldXMLHttpRequest[prop];
	                }
	            }
	            // Note: TypeScript doesn't know about XMLHttpRequest existing on Window, so we
	            // reference the property this way to get around TypeScript, but we also have to
	            // disable tslint in the process
	            /* tslint:disable */
	            window['XMLHttpRequest'] = XMLHttpRequest;
	            /* tslint:enable */
	            XHRProxy.isInitialized = true;
	        }
	    }]);

	    return XHRProxy;
	}();

	XHRProxy.isInitialized = false;

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Tracing = function () {
	    function Tracing() {
	        _classCallCheck(this, Tracing);

	        this.listeners = {};
	    }
	    /**
	     * Publishes an event, similar to the `EventEmitter.emit` method except that it
	     * does not accept more than one data argument.
	     *
	     * @param {string} event - The name of the event to fire, and should include a
	     *      descriptive namespace, e.g. `http.request:request-created`
	     * @param {object} data - The data associated with the event
	     * @returns {boolean} - Whether or not the event was published to any listeners
	     */


	    _createClass(Tracing, [{
	        key: 'publish',
	        value: function publish(event, data) {
	            var listeners = this.listeners[event];
	            if (!listeners || listeners.length === 0) {
	                return false;
	            }
	            var emitted = false;
	            var message = {
	                time: performance.now(),
	                timeStamp: Date.now(),
	                data: data
	            };
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = listeners[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var listener = _step.value;

	                    emitted = true;
	                    listener.listener(message);
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }

	            return emitted;
	        }
	        /**
	         * Register to always receive an event without any filtering. This module is
	         * returned from this method, making it possible to chain `removeEventListener`
	         * calls.
	         *
	         * Note: if any other listeners are filtering this event, registering with
	         * this method will prevent the proxies from enabling any performance
	         * optimizations.
	         *
	         * Calling this method is equivalent to calling `onFiltered(event, listener, () => true)`
	         *
	         * @param {string} event - The name of the event to listen to, e.g.
	         *      `http.request:request-created`
	         * @param {function} listener - The callback to call when the event is emitted
	         */

	    }, {
	        key: 'on',
	        value: function on(event, listener) {
	            if (!this.listeners[event]) {
	                this.listeners[event] = [];
	            }
	            this.listeners[event].push({
	                listener: listener
	            });
	            return this;
	        }
	        /**
	         * Removes exactly one registered event listener. If the same callback is
	         * registered more than once, only the first copy is removed. This behavior
	         * mimics that of EventEmitter.removeEventListener
	         *
	         * @param {string} event - The name of the event to remove the listener for,
	         *      e.g. `http.request:request-created`
	         * @param {function} listener - The listener to remove
	         * @returns {object} A refernce to this module, making it possible to chain
	         *      removeEventListener calls
	         */

	    }, {
	        key: 'removeEventListener',
	        value: function removeEventListener(event, listener) {
	            var listeners = this.listeners[event];
	            if (!listeners) {
	                // Matches Node.js removeEventListener return signature
	                return this;
	            }
	            for (var i = 0; i < listeners.length; i++) {
	                if (listeners[i].listener === listener) {
	                    this.listeners[event].splice(i, 1);
	                    break;
	                }
	            }
	            return this;
	        }
	        /**
	         * Removes all listeners for the given event. If no event is specified, then
	         * all event listeners for all events are removed.
	         *
	         * @param {string} event - (Optional) The event to remove listeners for
	         * @returns {object} A refernce to this module, making it possible to chain calls
	         */

	    }, {
	        key: 'removeAllListeners',
	        value: function removeAllListeners(event) {
	            if (event) {
	                if (this.listeners[event]) {
	                    this.listeners[event] = [];
	                }
	            } else {
	                this.listeners = {};
	            }
	            return this;
	        }
	        /**
	         * Returns the number of listeners for the given event. This behavior
	         * mimics that of EventEmitter.listenerCount
	         *
	         * @param {string} event - The event to count listeners for
	         * @returns {number} The number of listeners for the given event
	         */

	    }, {
	        key: 'listenerCount',
	        value: function listenerCount(event) {
	            if (!this.listeners[event]) {
	                return 0;
	            }
	            return this.listeners[event].length;
	        }
	    }]);

	    return Tracing;
	}();

	exports.default = new Tracing();

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ResourceTimingProxy = exports.EVENT_RESOURCE_TIMING_COLLECTED = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Tracing = __webpack_require__(6);

	var _Tracing2 = _interopRequireDefault(_Tracing);

	var _RequestUtilities = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var UPDATE_INTERVAL = 1000;
	var EVENT_RESOURCE_TIMING_COLLECTED = exports.EVENT_RESOURCE_TIMING_COLLECTED = 'notify|performance.resource-collected';

	var ResourceTimingProxy = exports.ResourceTimingProxy = function () {
	    function ResourceTimingProxy() {
	        _classCallCheck(this, ResourceTimingProxy);
	    }

	    _createClass(ResourceTimingProxy, [{
	        key: 'init',
	        value: function init() {
	            /* tslint:disable:no-any */
	            var performance = window.performance || window.webkitPerformance || window.msPerformance || window.mozPerformance;
	            /* tslint:enable:no-any */
	            // Don't initialize if this browser doesn't support resource timing
	            if (!performance || !performance.getEntriesByType) {
	                return;
	            }
	            function processEntry(entry) {
	                // This sheds any extra properties that may be introduced to resource timing
	                // or are browser specific, and ensures the data matches our interface for it.
	                return {
	                    name: entry.name,
	                    startTime: entry.startTime,
	                    duration: entry.duration,
	                    initiatorType: entry.initiatorType,
	                    nextHopProtocol: entry.nextHopProtocol,
	                    redirectStart: entry.redirectStart,
	                    redirectEnd: entry.redirectEnd,
	                    fetchStart: entry.fetchStart,
	                    domainLookupStart: entry.domainLookupStart,
	                    domainLookupEnd: entry.domainLookupEnd,
	                    connectStart: entry.connectStart,
	                    connectEnd: entry.connectEnd,
	                    secureConnectionStart: entry.secureConnectionStart,
	                    requestStart: entry.requestStart,
	                    responseStart: entry.responseStart,
	                    responseEnd: entry.responseEnd,
	                    transferSize: entry.transferSize,
	                    encodedBodySize: entry.encodedBodySize,
	                    decodedBodySize: entry.decodedBodySize
	                };
	            }
	            // Eventually we want to switch to using Performance Observers once browsers
	            // start to implement, but currently none do, so we poll for entries instead
	            // https://w3c.github.io/performance-timeline/#dom-performanceobserver
	            var reportedEntries = {};
	            function record() {
	                var resources = performance.getEntriesByType('resource');
	                var entriesToPublish = [];
	                var ingressUrl = (0, _RequestUtilities.getMessageIngressUrl)();
	                var _iteratorNormalCompletion = true;
	                var _didIteratorError = false;
	                var _iteratorError = undefined;

	                try {
	                    for (var _iterator = resources[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                        var resource = _step.value;

	                        // Create a unique id for the entry, a combination of the start time
	                        // and resolved URL
	                        var id = resource.startTime + '#' + resource.name;
	                        if (!reportedEntries[id] && resource.name.indexOf(ingressUrl) === -1) {
	                            reportedEntries[id] = true;
	                            entriesToPublish.push(processEntry(resource));
	                        }
	                    }
	                } catch (err) {
	                    _didIteratorError = true;
	                    _iteratorError = err;
	                } finally {
	                    try {
	                        if (!_iteratorNormalCompletion && _iterator.return) {
	                            _iterator.return();
	                        }
	                    } finally {
	                        if (_didIteratorError) {
	                            throw _iteratorError;
	                        }
	                    }
	                }

	                if (entriesToPublish.length) {
	                    _Tracing2.default.publish(EVENT_RESOURCE_TIMING_COLLECTED, entriesToPublish);
	                }
	                setTimeout(record, UPDATE_INTERVAL);
	            }
	            ;
	            record();
	        }
	    }]);

	    return ResourceTimingProxy;
	}();

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ConsoleProxy = exports.NOTIFY_CONSOLE_EVENT_OCCURED = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Tracing = __webpack_require__(6);

	var _Tracing2 = _interopRequireDefault(_Tracing);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var NOTIFY_CONSOLE_EVENT_OCCURED = exports.NOTIFY_CONSOLE_EVENT_OCCURED = 'notify|event|console';

	var ConsoleProxy = exports.ConsoleProxy = function () {
	    function ConsoleProxy() {
	        _classCallCheck(this, ConsoleProxy);

	        // NOTE: this should probably be pulled from the inspector,
	        //       but that raising a dependency question and whether
	        //       one should know about the other. Was thinking about
	        //       adding a neutral party but thats overkill.
	        this.methods = ['assert', 'count', 'debug', 'dir', 'dirxml', 'error', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'profile', 'profileEnd', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];
	    }

	    _createClass(ConsoleProxy, [{
	        key: 'init',
	        value: function init() {
	            this.methods.forEach(function (methodKey) {
	                if (methodKey && console[methodKey] && !console[methodKey].__glimpse_original) {
	                    console[methodKey] = function (key) {
	                        var oldFunction = console[key];
	                        var newFunction = function newFunction() {
	                            var args = Array.prototype.slice.call(arguments);
	                            _Tracing2.default.publish(NOTIFY_CONSOLE_EVENT_OCCURED, { method: key, arguments: args });
	                            return oldFunction.apply(this, arguments);
	                        };
	                        oldFunction.__glimpse_proxy = newFunction;
	                        newFunction.__glimpse_original = oldFunction;
	                        return newFunction;
	                    }(methodKey);
	                }
	            });
	        }
	    }]);

	    return ConsoleProxy;
	}();

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.XHRInspector = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _XHRProxy = __webpack_require__(5);

	var _Tracing = __webpack_require__(6);

	var _Tracing2 = _interopRequireDefault(_Tracing);

	var _DateTimeUtilities = __webpack_require__(10);

	var _RequestUtilities = __webpack_require__(4);

	var _parseHeaders = __webpack_require__(11);

	var _parseHeaders2 = _interopRequireDefault(_parseHeaders);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var MAX_BODY_SIZE = 132000;

	var XHRInspector = exports.XHRInspector = function () {
	    function XHRInspector() {
	        _classCallCheck(this, XHRInspector);

	        this.requests = {};
	    }

	    _createClass(XHRInspector, [{
	        key: 'before',
	        value: function before(data) {
	            var eventData = data.data;
	            var url = (0, _RequestUtilities.parseUrl)(eventData.url);
	            // TODO: https://github.com/Glimpse/Glimpse.Node.Prototype/issues/307
	            // Add support for base64 encoding non-text content by setting the encoding here
	            var body = {
	                size: 0,
	                encoding: 'utf-8',
	                content: '',
	                isTruncated: false
	            };
	            if (eventData.body) {
	                body.size = eventData.body.length;
	                body.content = eventData.body.slice(0, MAX_BODY_SIZE);
	                body.isTruncated = body.size > MAX_BODY_SIZE;
	            }
	            this.messagePublisher.createAndPublishMessage('data-http-request', {
	                correlationId: 'c' + eventData.id,
	                source: 'Client',
	                protocol: {
	                    identifier: url.protocol.replace(/\:$/, '').toLowerCase()
	                },
	                url: eventData.url,
	                method: eventData.method,
	                startTime: (0, _DateTimeUtilities.getDateTime)(new Date(data.timeStamp)),
	                headers: eventData.headers,
	                isAjax: true,
	                body: body
	            });
	        }
	    }, {
	        key: 'after',
	        value: function after(data, duration) {
	            var eventData = data.data;
	            // TODO: https://github.com/Glimpse/Glimpse.Node.Prototype/issues/307
	            // Add support for base64 encoding non-text content by setting the encoding here
	            var body = {
	                size: 0,
	                encoding: 'utf-8',
	                content: '',
	                isTruncated: false
	            };
	            if (eventData.body) {
	                body.size = eventData.body.length;
	                body.content = eventData.body.slice(0, MAX_BODY_SIZE);
	                body.isTruncated = body.size > MAX_BODY_SIZE;
	            }
	            this.messagePublisher.createAndPublishMessage('data-http-response', {
	                correlationId: 'c' + eventData.id,
	                url: eventData.url,
	                headers: (0, _parseHeaders2.default)(eventData.xhr.getAllResponseHeaders()),
	                statusCode: eventData.statusCode,
	                endTime: (0, _DateTimeUtilities.getDateTime)(new Date(data.timeStamp)),
	                duration: duration,
	                body: body
	            });
	        }
	    }, {
	        key: 'numOutstandingRequests',
	        value: function numOutstandingRequests() {
	            return Object.keys(this.requests).length;
	        }
	    }, {
	        key: 'init',
	        value: function init(messagePublisher) {
	            var _this = this;

	            this.messagePublisher = messagePublisher;
	            _Tracing2.default.on(_XHRProxy.EVENT_REQUEST_SENT, function (data) {
	                _this.requests[data.data.id] = data.time;
	                _this.before(data);
	            });
	            _Tracing2.default.on(_XHRProxy.EVENT_RESPONSE_RECEIVED, function (data) {
	                var startTime = _this.requests[data.data.id];
	                if (!startTime) {
	                    console.error('Glimpse Internal Error: could not find associated master data, some inspection data will be lost.');
	                    return;
	                }
	                _this.after(data, data.time - startTime);
	                delete _this.requests[data.data.id];
	            });
	            _Tracing2.default.on(_XHRProxy.EVENT_ERROR, function (data) {
	                delete _this.requests[data.data.id];
	            });
	            _Tracing2.default.on(_XHRProxy.EVENT_ABORT, function (data) {
	                delete _this.requests[data.data.id];
	            });
	        }
	    }]);

	    return XHRInspector;
	}();

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.getDateTime = getDateTime;
	function toTwoDigits(value) {
	    return value < 10 ? '0' + value : value;
	}
	function toThreeDigits(value) {
	    if (value < 10) {
	        return '00' + value;
	    }
	    if (value < 100) {
	        return '0' + value;
	    }
	    return value;
	}
	function getUTCOffset(date) {
	    var offset = date.getTimezoneOffset();
	    var sign = offset >= 0 ? '+' : '-';
	    offset = Math.abs(offset);
	    var hours = toTwoDigits(Math.floor(offset / 60));
	    var minutes = toTwoDigits(offset % 60);
	    return sign + hours + minutes;
	}
	// Convert time according to the format string: 'YYYY-MM-DDTHH:mm:ss.SSS ZZ'
	// Output should look like: "2016-06-08T09:07:11.021 -0700"
	function getDateTime() {
	    var d = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();

	    return d.getFullYear() + '-' + toTwoDigits(d.getMonth() + 1) + '-' + toTwoDigits(d.getDate()) + 'T' + toTwoDigits(d.getHours()) + ':' + toTwoDigits(d.getMinutes()) + ':' + toTwoDigits(d.getSeconds()) + '.' + toThreeDigits(d.getMilliseconds()) + getUTCOffset(d);
	}

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var trim = __webpack_require__(12)
	  , forEach = __webpack_require__(13)
	  , isArray = function(arg) {
	      return Object.prototype.toString.call(arg) === '[object Array]';
	    }

	module.exports = function (headers) {
	  if (!headers)
	    return {}

	  var result = {}

	  forEach(
	      trim(headers).split('\n')
	    , function (row) {
	        var index = row.indexOf(':')
	          , key = trim(row.slice(0, index)).toLowerCase()
	          , value = trim(row.slice(index + 1))

	        if (typeof(result[key]) === 'undefined') {
	          result[key] = value
	        } else if (isArray(result[key])) {
	          result[key].push(value)
	        } else {
	          result[key] = [ result[key], value ]
	        }
	      }
	  )

	  return result
	}

/***/ },
/* 12 */
/***/ function(module, exports) {

	
	exports = module.exports = trim;

	function trim(str){
	  return str.replace(/^\s*|\s*$/g, '');
	}

	exports.left = function(str){
	  return str.replace(/^\s*/, '');
	};

	exports.right = function(str){
	  return str.replace(/\s*$/, '');
	};


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(14)

	module.exports = forEach

	var toString = Object.prototype.toString
	var hasOwnProperty = Object.prototype.hasOwnProperty

	function forEach(list, iterator, context) {
	    if (!isFunction(iterator)) {
	        throw new TypeError('iterator must be a function')
	    }

	    if (arguments.length < 3) {
	        context = this
	    }
	    
	    if (toString.call(list) === '[object Array]')
	        forEachArray(list, iterator, context)
	    else if (typeof list === 'string')
	        forEachString(list, iterator, context)
	    else
	        forEachObject(list, iterator, context)
	}

	function forEachArray(array, iterator, context) {
	    for (var i = 0, len = array.length; i < len; i++) {
	        if (hasOwnProperty.call(array, i)) {
	            iterator.call(context, array[i], i, array)
	        }
	    }
	}

	function forEachString(string, iterator, context) {
	    for (var i = 0, len = string.length; i < len; i++) {
	        // no such thing as a sparse string.
	        iterator.call(context, string.charAt(i), i, string)
	    }
	}

	function forEachObject(object, iterator, context) {
	    for (var k in object) {
	        if (hasOwnProperty.call(object, k)) {
	            iterator.call(context, object[k], k, object)
	        }
	    }
	}


/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = isFunction

	var toString = Object.prototype.toString

	function isFunction (fn) {
	  var string = toString.call(fn)
	  return string === '[object Function]' ||
	    (typeof fn === 'function' && string !== '[object RegExp]') ||
	    (typeof window !== 'undefined' &&
	     // IE8 and below
	     (fn === window.setTimeout ||
	      fn === window.alert ||
	      fn === window.confirm ||
	      fn === window.prompt))
	};


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ResourceTimingInspector = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _ResourceTimingProxy = __webpack_require__(7);

	var _Tracing = __webpack_require__(6);

	var _Tracing2 = _interopRequireDefault(_Tracing);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ResourceTimingInspector = exports.ResourceTimingInspector = function () {
	    function ResourceTimingInspector() {
	        _classCallCheck(this, ResourceTimingInspector);
	    }

	    _createClass(ResourceTimingInspector, [{
	        key: 'init',
	        value: function init(messagePublisher) {
	            _Tracing2.default.on(_ResourceTimingProxy.EVENT_RESOURCE_TIMING_COLLECTED, function (data) {
	                // TODO: Eventually, we'll add more logic here to clean up data in
	                // https://github.com/Glimpse/Glimpse.Browser.Agent/issues/29.
	                messagePublisher.createAndPublishMessage('browser-resource', data);
	            });
	        }
	    }]);

	    return ResourceTimingInspector;
	}();

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ConsoleInspector = exports.LogMessageTypes = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _ConsoleProxy = __webpack_require__(8);

	var _Tracing = __webpack_require__(6);

	var _Tracing2 = _interopRequireDefault(_Tracing);

	var _GeneralUtilities = __webpack_require__(3);

	var _MessageMixins = __webpack_require__(17);

	var _stacktraceJs = __webpack_require__(18);

	var StackTrace = _interopRequireWildcard(_stacktraceJs);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var LogMessageTypes = exports.LogMessageTypes = undefined;
	(function (LogMessageTypes) {
	    LogMessageTypes[LogMessageTypes["json"] = 0] = "json";
	    LogMessageTypes[LogMessageTypes["xml"] = 1] = "xml";
	    LogMessageTypes[LogMessageTypes["table"] = 2] = "table";
	    LogMessageTypes[LogMessageTypes["assert"] = 3] = "assert";
	    LogMessageTypes[LogMessageTypes["count"] = 4] = "count";
	    LogMessageTypes[LogMessageTypes["timespan_begin"] = 5] = "timespan_begin";
	    LogMessageTypes[LogMessageTypes["timespan_end"] = 6] = "timespan_end";
	    LogMessageTypes[LogMessageTypes["group_begin"] = 7] = "group_begin";
	    LogMessageTypes[LogMessageTypes["group_end"] = 8] = "group_end";
	})(LogMessageTypes || (exports.LogMessageTypes = LogMessageTypes = {}));

	var ConsoleInspector = exports.ConsoleInspector = function () {
	    function ConsoleInspector() {
	        var _this = this;

	        _classCallCheck(this, ConsoleInspector);

	        this.countMap = {};
	        this.stack = {
	            group: [],
	            profile: []
	        };
	        this.map = {
	            time: {}
	        };
	        this.mapNull = {
	            time: undefined
	        };
	        this.methods = {
	            assert: {
	                level: 'Error',
	                processor: function processor(message, data) {
	                    return _this.assert(message, data);
	                }
	            },
	            count: {
	                level: 'Debug',
	                processor: function processor(message, data) {
	                    return _this.count(message, data);
	                },
	                tokenTypeByPass: true
	            },
	            debug: {
	                level: 'Debug',
	                nullByPass: true
	            },
	            dir: {
	                level: 'Log',
	                nullByPass: true,
	                processor: function processor(message, data) {
	                    return _this.dir(message, data, LogMessageTypes.json);
	                },
	                tokenTypeByPass: true
	            },
	            dirxml: {
	                level: 'Log',
	                nullByPass: true,
	                processor: function processor(message, data) {
	                    return _this.dir(message, data, LogMessageTypes.xml);
	                },
	                tokenTypeByPass: true
	            },
	            error: {
	                level: 'Error',
	                nullByPass: true
	            },
	            group: {
	                level: undefined,
	                processor: function processor(message, data) {
	                    return _this.groupStart(message, data, false);
	                }
	            },
	            groupCollapsed: {
	                level: undefined,
	                processor: function processor(message, data) {
	                    return _this.groupStart(message, data, true);
	                }
	            },
	            groupEnd: {
	                level: undefined,
	                processor: function processor(message, data) {
	                    return _this.groupEnd(message, data);
	                }
	            },
	            info: {
	                level: 'Info',
	                nullByPass: true
	            },
	            log: {
	                level: 'Log',
	                nullByPass: true
	            },
	            profile: {
	                level: 'Debug',
	                processor: function processor(message, data) {
	                    return _this.profileStart(message, data);
	                },
	                tokenTypeByPass: true
	            },
	            profileEnd: {
	                level: 'Debug',
	                processor: function processor(message, data) {
	                    return _this.profileEnd(message, data);
	                },
	                tokenTypeByPass: true
	            },
	            table: {
	                level: 'Log',
	                nullByPass: true,
	                processor: function processor(message, data) {
	                    return _this.applyType(message, data, LogMessageTypes.table);
	                },
	                tokenTypeByPass: true
	            },
	            time: {
	                level: 'Debug',
	                processor: function processor(message, data) {
	                    return _this.mapStart('time', message, data, LogMessageTypes.timespan_begin);
	                },
	                tokenTypeByPass: true
	            },
	            timeEnd: {
	                level: 'Debug',
	                processor: function processor(message, data) {
	                    return _this.mapEnd('time', message, data, LogMessageTypes.timespan_end);
	                },
	                tokenTypeByPass: true
	            },
	            timeStamp: {
	                level: 'Debug',
	                processor: function processor(message, data) {
	                    return _this.timeStamp(message, data);
	                },
	                tokenTypeByPass: true
	            },
	            trace: {
	                level: 'Debug',
	                processor: function processor(message, data) {
	                    return _this.trace(message, data);
	                }
	            },
	            warn: {
	                level: 'Warning',
	                nullByPass: true
	            }
	        };
	    }

	    _createClass(ConsoleInspector, [{
	        key: 'init',
	        value: function init(messagePublisher) {
	            var _this2 = this;

	            _Tracing2.default.on(_ConsoleProxy.NOTIFY_CONSOLE_EVENT_OCCURED, function (event) {
	                var data = event.data;
	                var payload = {
	                    method: data.method,
	                    arguments: data.arguments,
	                    time: event.time
	                };
	                _this2.publishMessage(messagePublisher, payload);
	            });
	        }
	    }, {
	        key: 'publishMessage',
	        value: function publishMessage(messagePublisher, data) {
	            var info = this.methods[data.method];
	            // in the case where we have no args or a nullByPass is in effect then we shouldn't log messages
	            if (!data.arguments || data.arguments.constructor !== Array || info.nullByPass && data.arguments.length === 0) {
	                return;
	            }
	            // build base message
	            var payload = {
	                message: data.arguments,
	                library: 'Browser Console',
	                level: info.level
	            };
	            var message = messagePublisher.createMessage('log-write', payload);
	            (0, _MessageMixins.addOffset)(data.time, message);
	            // run through any custom processors
	            var suppressMessage = false;
	            if (info.processor) {
	                suppressMessage = info.processor(message, data) || false;
	            }
	            // normalize token format
	            if (!info.tokenTypeByPass) {
	                this.deriveTokenType(message);
	            }
	            if (!suppressMessage) {
	                // set offline to true to avoid source-map lookups, which trigger http requests & show up in
	                // the http traffic in glimpse.  We'll need to decide what to do about this.  It's possible we
	                // can push the source map lookup into the client.
	                StackTrace.get({ offline: true }).then(function (stackFrames) {
	                    var newFrames = [];
	                    // slice off top frames where glimpse code is on the stack.
	                    for (var i = 0; i < stackFrames.length; i++) {
	                        if (stackFrames[i].fileName && !stackFrames[i].fileName.endsWith('/glimpse/agent/agent.js?hash={hash}')) {
	                            stackFrames = stackFrames.slice(i);
	                            break;
	                        }
	                    }
	                    // strip out any extra properties we don't want to send w/ the glimpse message
	                    stackFrames.forEach(function (val, index) {
	                        newFrames[index] = {
	                            fileName: val.fileName,
	                            functionName: val.functionName,
	                            lineNumber: val.lineNumber,
	                            columnNumber: val.columnNumber
	                        };
	                    });
	                    message.payload.frames = newFrames;
	                    message.types.push('call-stack');
	                    messagePublisher.publishMessage(message);
	                });
	            }
	        }
	        // api specific targets

	    }, {
	        key: 'count',
	        value: function count(message, data) {
	            // chrome treats no args the same as ''
	            var label = data.arguments.length > 0 ? String(data.arguments[0]) : '';
	            // for record the label
	            message.payload.message = label;
	            // track ongoing progress
	            var currentCount = (this.countMap[label] || 0) + 1;
	            this.countMap[label] = currentCount;
	            // record the applyType
	            this.applyType(message, data, LogMessageTypes.count);
	            // record the addition count data
	            message.payload.count = currentCount;
	        }
	    }, {
	        key: 'assert',
	        value: function assert(message, data) {
	            var assertion = data.arguments.length > 0 ? data.arguments[0] : false;
	            // if we have no args|null|undefined|0 we will treat it as a fail
	            if (assertion) {
	                return true;
	            } else {
	                message.payload.message = message.payload.message.slice(1);
	            }
	        }
	    }, {
	        key: 'dir',
	        value: function dir(message, data, type) {
	            var newArgs = data.arguments.length > 0 ? [data.arguments[0]] : data.arguments; // tslint:disable-line:no-any
	            var processAsDir = false;
	            var value = newArgs[0];
	            if (type === LogMessageTypes.xml && value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value.getElementsByTagName && 'outerHTML' in value) {
	                var nodeCount = value.getElementsByTagName('*').length;
	                // Safety checks to deal with large data payloads
	                if (nodeCount > 100) {
	                    newArgs = 'Node with more than `100` decendents aren\'t supported.';
	                } else {
	                    value = value.outerHTML;
	                    if (value.length > 2500) {
	                        newArgs = 'Node with more than `2500` characters aren\'t supported.';
	                    } else {
	                        newArgs[0] = value;
	                    }
	                }
	                processAsDir = true;
	            } else if (type === LogMessageTypes.json) {
	                processAsDir = true;
	            }
	            // this is setup this way so that in non valid `LogMessageTypes.xml` cases, we essentually
	            // treat it as plain console.log
	            if (processAsDir) {
	                // we only care about the first arg in this case
	                message.payload.message = newArgs;
	                this.applyType(message, data, type);
	            } else {
	                this.deriveTokenType(message);
	            }
	        }
	    }, {
	        key: 'timeStamp',
	        value: function timeStamp(message, data) {
	            this.getAndApplyLabel(message, data);
	        }
	    }, {
	        key: 'groupStart',
	        value: function groupStart(message, data, isCollapsed) {
	            message.payload.isCollapsed = isCollapsed;
	            this.stackStart('group', message, data, LogMessageTypes.group_begin);
	        }
	    }, {
	        key: 'groupEnd',
	        value: function groupEnd(message, data) {
	            return this.stackEnd('group', message, data, LogMessageTypes.group_end);
	        }
	    }, {
	        key: 'profileStart',
	        value: function profileStart(message, data) {
	            this.getAndApplyLabel(message, data);
	            this.stackStart('profile', message, data, LogMessageTypes.timespan_begin);
	        }
	    }, {
	        key: 'profileEnd',
	        value: function profileEnd(message, data) {
	            this.getAndApplyLabel(message, data);
	            var result = this.stackEnd('profile', message, data, LogMessageTypes.timespan_end);
	            return result;
	        }
	    }, {
	        key: 'trace',
	        value: function trace(message, data) {
	            // for trace methods include 'log-display-callstack' message type so callstack will be displayed
	            message.types.push('log-display-callstack');
	            // make a copy of the message since we're going to modify it.
	            message.payload.message = Array.prototype.slice.call(message.payload.message, 0);
	            if (message.payload.message[0] === undefined) {
	                message.payload.message[0] = 'Trace:';
	            } else {
	                message.payload.message[0] = 'Trace: ' + message.payload.message[0];
	            }
	        }
	        // common/shared helpers

	    }, {
	        key: 'applyType',
	        value: function applyType(message, data, mixin) {
	            var type = LogMessageTypes[mixin].replace('_', '-');
	            message.types.push('log-' + type);
	        }
	    }, {
	        key: 'getAndApplyLabel',
	        value: function getAndApplyLabel(message, data) {
	            var label = data.arguments.length > 0 ? String(data.arguments[0]) : undefined;
	            // for mapEnds we dump the args and just use the label
	            message.payload.message = label;
	            return label;
	        }
	    }, {
	        key: 'stackStart',
	        value: function stackStart(type, message, data, mixin) {
	            var group = this.coreStart(message, data, mixin);
	            this.stack[type].push(group);
	        }
	    }, {
	        key: 'stackEnd',
	        value: function stackEnd(type, message, data, mixin) {
	            var group = this.stack[type].pop();
	            if (group) {
	                this.coreEnd(group, message, data, mixin);
	            } else {
	                return true;
	            }
	        }
	    }, {
	        key: 'mapStart',
	        value: function mapStart(type, message, data, mixin) {
	            var label = this.getAndApplyLabel(message, data);
	            var group = this.coreStart(message, data, mixin);
	            if (label !== undefined) {
	                this.map[type][label] = group;
	            } else {
	                this.mapNull[type] = group;
	            }
	        }
	    }, {
	        key: 'mapEnd',
	        value: function mapEnd(type, message, data, mixin) {
	            var label = this.getAndApplyLabel(message, data);
	            var group = label !== undefined ? this.map[type][label] : this.mapNull[type];
	            if (group) {
	                if (label !== undefined) {
	                    delete this.map[type][label];
	                } else {
	                    this.mapNull[type] = undefined;
	                }
	            } else {
	                // if no match is found we should match to page load
	                group = { correlationId: (0, _GeneralUtilities.getGuid)(), time: 0 };
	            }
	            this.coreEnd(group, message, data, mixin);
	        }
	    }, {
	        key: 'coreStart',
	        value: function coreStart(message, data, mixin) {
	            var correlationId = (0, _GeneralUtilities.getGuid)();
	            var time = data.time;
	            (0, _MessageMixins.addCorrelationBegin)(correlationId, message);
	            // add action begin specific data
	            this.applyType(message, data, mixin);
	            return {
	                correlationId: correlationId,
	                time: time
	            };
	        }
	    }, {
	        key: 'coreEnd',
	        value: function coreEnd(group, message, data, mixin) {
	            var time = data.time;
	            // add action begin specific data
	            this.applyType(message, data, mixin);
	            (0, _MessageMixins.addCorrelationEnd)(group.correlationId, time - group.time, message);
	        }
	    }, {
	        key: 'deriveTokenType',
	        value: function deriveTokenType(message) {
	            if (message.payload.message !== undefined && message.payload.message !== null // tslint:disable-line:no-null-keyword
	            && message.payload.message !== 'string') {
	                message.types.push('log-token-printf');
	                message.payload.tokenSupport = 'browser';
	            }
	        }
	    }]);

	    return ConsoleInspector;
	}();

/***/ },
/* 17 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.addOffset = addOffset;
	exports.addCorrelationBegin = addCorrelationBegin;
	exports.addCorrelationEnd = addCorrelationEnd;
	exports.addCorrelation = addCorrelation;
	// NOTE: factor calculation is based off the fact that `performance.now()` is the
	//       amount of time that has passed since `performance.timing.fetchStart`.
	//       Using `performance.now()` is critical when determining acurate offsets, but
	//       for us `performance.timing.fetchStart` isn't the correct starting point.
	//       Hence, `performance.timing.requestStart` which is what we want to use as
	//       our starting point.
	var offsetFactor = performance.timing.requestStart - performance.timing.fetchStart;
	function addOffset(time, envelope) {
	    if (!envelope.offset) {
	        envelope.offset = time - offsetFactor;
	    }
	}
	function addCorrelationBegin(correlationId, envelope) {
	    envelope.types.push('correlation-begin');
	    addCorrelation(correlationId, envelope);
	}
	function addCorrelationEnd(correlationId, duration, envelope) {
	    envelope.types.push('correlation-end');
	    envelope.payload.duration = duration;
	    addCorrelation(correlationId, envelope);
	}
	function addCorrelation(correlationId, envelope) {
	    envelope.types.push('correlation');
	    envelope.payload.correlationId = correlationId;
	}

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(root, factory) {
	    'use strict';
	    // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js, Rhino, and browsers.

	    /* istanbul ignore next */
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(19), __webpack_require__(21), __webpack_require__(22)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports === 'object') {
	        module.exports = factory(require('error-stack-parser'), require('stack-generator'), require('stacktrace-gps'));
	    } else {
	        root.StackTrace = factory(root.ErrorStackParser, root.StackGenerator, root.StackTraceGPS);
	    }
	}(this, function StackTrace(ErrorStackParser, StackGenerator, StackTraceGPS) {
	    var _options = {
	        filter: function(stackframe) {
	            // Filter out stackframes for this library by default
	            return (stackframe.functionName || '').indexOf('StackTrace$$') === -1 &&
	                (stackframe.functionName || '').indexOf('ErrorStackParser$$') === -1 &&
	                (stackframe.functionName || '').indexOf('StackTraceGPS$$') === -1 &&
	                (stackframe.functionName || '').indexOf('StackGenerator$$') === -1;
	        },
	        sourceCache: {}
	    };

	    var _generateError = function StackTrace$$GenerateError() {
	        try {
	            // Error must be thrown to get stack in IE
	            throw new Error();
	        } catch (err) {
	            return err;
	        }
	    };

	    /**
	     * Merge 2 given Objects. If a conflict occurs the second object wins.
	     * Does not do deep merges.
	     *
	     * @param {Object} first base object
	     * @param {Object} second overrides
	     * @returns {Object} merged first and second
	     * @private
	     */
	    function _merge(first, second) {
	        var target = {};

	        [first, second].forEach(function(obj) {
	            for (var prop in obj) {
	                if (obj.hasOwnProperty(prop)) {
	                    target[prop] = obj[prop];
	                }
	            }
	            return target;
	        });

	        return target;
	    }

	    function _isShapedLikeParsableError(err) {
	        return err.stack || err['opera#sourceloc'];
	    }

	    function _filtered(stackframes, filter) {
	        if (typeof filter === 'function') {
	            return stackframes.filter(filter);
	        }
	        return stackframes;
	    }

	    return {
	        /**
	         * Get a backtrace from invocation point.
	         *
	         * @param {Object} opts
	         * @returns {Array} of StackFrame
	         */
	        get: function StackTrace$$get(opts) {
	            var err = _generateError();
	            return _isShapedLikeParsableError(err) ? this.fromError(err, opts) : this.generateArtificially(opts);
	        },

	        /**
	         * Get a backtrace from invocation point.
	         * IMPORTANT: Does not handle source maps or guess function names!
	         *
	         * @param {Object} opts
	         * @returns {Array} of StackFrame
	         */
	        getSync: function StackTrace$$getSync(opts) {
	            opts = _merge(_options, opts);
	            var err = _generateError();
	            var stack = _isShapedLikeParsableError(err) ? ErrorStackParser.parse(err) : StackGenerator.backtrace(opts);
	            return _filtered(stack, opts.filter);
	        },

	        /**
	         * Given an error object, parse it.
	         *
	         * @param {Error} error object
	         * @param {Object} opts
	         * @returns {Promise} for Array[StackFrame}
	         */
	        fromError: function StackTrace$$fromError(error, opts) {
	            opts = _merge(_options, opts);
	            var gps = new StackTraceGPS(opts);
	            return new Promise(function(resolve) {
	                var stackframes = _filtered(ErrorStackParser.parse(error), opts.filter);
	                resolve(Promise.all(stackframes.map(function(sf) {
	                    return new Promise(function(resolve) {
	                        function resolveOriginal() {
	                            resolve(sf);
	                        }

	                        gps.pinpoint(sf).then(resolve, resolveOriginal)['catch'](resolveOriginal);
	                    });
	                })));
	            }.bind(this));
	        },

	        /**
	         * Use StackGenerator to generate a backtrace.
	         *
	         * @param {Object} opts
	         * @returns {Promise} of Array[StackFrame]
	         */
	        generateArtificially: function StackTrace$$generateArtificially(opts) {
	            opts = _merge(_options, opts);
	            var stackFrames = StackGenerator.backtrace(opts);
	            if (typeof opts.filter === 'function') {
	                stackFrames = stackFrames.filter(opts.filter);
	            }
	            return Promise.resolve(stackFrames);
	        },

	        /**
	         * Given a function, wrap it such that invocations trigger a callback that
	         * is called with a stack trace.
	         *
	         * @param {Function} fn to be instrumented
	         * @param {Function} callback function to call with a stack trace on invocation
	         * @param {Function} errback optional function to call with error if unable to get stack trace.
	         * @param {Object} thisArg optional context object (e.g. window)
	         */
	        instrument: function StackTrace$$instrument(fn, callback, errback, thisArg) {
	            if (typeof fn !== 'function') {
	                throw new Error('Cannot instrument non-function object');
	            } else if (typeof fn.__stacktraceOriginalFn === 'function') {
	                // Already instrumented, return given Function
	                return fn;
	            }

	            var instrumented = function StackTrace$$instrumented() {
	                try {
	                    this.get().then(callback, errback)['catch'](errback);
	                    return fn.apply(thisArg || this, arguments);
	                } catch (e) {
	                    if (_isShapedLikeParsableError(e)) {
	                        this.fromError(e).then(callback, errback)['catch'](errback);
	                    }
	                    throw e;
	                }
	            }.bind(this);
	            instrumented.__stacktraceOriginalFn = fn;

	            return instrumented;
	        },

	        /**
	         * Given a function that has been instrumented,
	         * revert the function to it's original (non-instrumented) state.
	         *
	         * @param {Function} fn to de-instrument
	         */
	        deinstrument: function StackTrace$$deinstrument(fn) {
	            if (typeof fn !== 'function') {
	                throw new Error('Cannot de-instrument non-function object');
	            } else if (typeof fn.__stacktraceOriginalFn === 'function') {
	                return fn.__stacktraceOriginalFn;
	            } else {
	                // Function not instrumented, return original
	                return fn;
	            }
	        },

	        /**
	         * Given an error message and Array of StackFrames, serialize and POST to given URL.
	         *
	         * @param {Array} stackframes
	         * @param {String} url
	         * @param {String} errorMsg
	         */
	        report: function StackTrace$$report(stackframes, url, errorMsg) {
	            return new Promise(function(resolve, reject) {
	                var req = new XMLHttpRequest();
	                req.onerror = reject;
	                req.onreadystatechange = function onreadystatechange() {
	                    if (req.readyState === 4) {
	                        if (req.status >= 200 && req.status < 400) {
	                            resolve(req.responseText);
	                        } else {
	                            reject(new Error('POST to ' + url + ' failed with status: ' + req.status));
	                        }
	                    }
	                };
	                req.open('post', url);
	                req.setRequestHeader('Content-Type', 'application/json');

	                var reportPayload = {stack: stackframes};
	                if (errorMsg !== undefined) {
	                    reportPayload.message = errorMsg;
	                }

	                req.send(JSON.stringify(reportPayload));
	            });
	        }
	    };
	}));


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(root, factory) {
	    'use strict';
	    // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js, Rhino, and browsers.

	    /* istanbul ignore next */
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(20)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports === 'object') {
	        module.exports = factory(require('stackframe'));
	    } else {
	        root.ErrorStackParser = factory(root.StackFrame);
	    }
	}(this, function ErrorStackParser(StackFrame) {
	    'use strict';

	    var FIREFOX_SAFARI_STACK_REGEXP = /(^|@)\S+\:\d+/;
	    var CHROME_IE_STACK_REGEXP = /^\s*at .*(\S+\:\d+|\(native\))/m;
	    var SAFARI_NATIVE_CODE_REGEXP = /^(eval@)?(\[native code\])?$/;

	    function _map(array, fn, thisArg) {
	        if (typeof Array.prototype.map === 'function') {
	            return array.map(fn, thisArg);
	        } else {
	            var output = new Array(array.length);
	            for (var i = 0; i < array.length; i++) {
	                output[i] = fn.call(thisArg, array[i]);
	            }
	            return output;
	        }
	    }

	    function _filter(array, fn, thisArg) {
	        if (typeof Array.prototype.filter === 'function') {
	            return array.filter(fn, thisArg);
	        } else {
	            var output = [];
	            for (var i = 0; i < array.length; i++) {
	                if (fn.call(thisArg, array[i])) {
	                    output.push(array[i]);
	                }
	            }
	            return output;
	        }
	    }

	    function _indexOf(array, target) {
	        if (typeof Array.prototype.indexOf === 'function') {
	            return array.indexOf(target);
	        } else {
	            for (var i = 0; i < array.length; i++) {
	                if (array[i] === target) {
	                    return i;
	                }
	            }
	            return -1;
	        }
	    }

	    return {
	        /**
	         * Given an Error object, extract the most information from it.
	         *
	         * @param {Error} error object
	         * @return {Array} of StackFrames
	         */
	        parse: function ErrorStackParser$$parse(error) {
	            if (typeof error.stacktrace !== 'undefined' || typeof error['opera#sourceloc'] !== 'undefined') {
	                return this.parseOpera(error);
	            } else if (error.stack && error.stack.match(CHROME_IE_STACK_REGEXP)) {
	                return this.parseV8OrIE(error);
	            } else if (error.stack) {
	                return this.parseFFOrSafari(error);
	            } else {
	                throw new Error('Cannot parse given Error object');
	            }
	        },

	        // Separate line and column numbers from a string of the form: (URI:Line:Column)
	        extractLocation: function ErrorStackParser$$extractLocation(urlLike) {
	            // Fail-fast but return locations like "(native)"
	            if (urlLike.indexOf(':') === -1) {
	                return [urlLike];
	            }

	            var regExp = /(.+?)(?:\:(\d+))?(?:\:(\d+))?$/;
	            var parts = regExp.exec(urlLike.replace(/[\(\)]/g, ''));
	            return [parts[1], parts[2] || undefined, parts[3] || undefined];
	        },

	        parseV8OrIE: function ErrorStackParser$$parseV8OrIE(error) {
	            var filtered = _filter(error.stack.split('\n'), function(line) {
	                return !!line.match(CHROME_IE_STACK_REGEXP);
	            }, this);

	            return _map(filtered, function(line) {
	                if (line.indexOf('(eval ') > -1) {
	                    // Throw away eval information until we implement stacktrace.js/stackframe#8
	                    line = line.replace(/eval code/g, 'eval').replace(/(\(eval at [^\()]*)|(\)\,.*$)/g, '');
	                }
	                var tokens = line.replace(/^\s+/, '').replace(/\(eval code/g, '(').split(/\s+/).slice(1);
	                var locationParts = this.extractLocation(tokens.pop());
	                var functionName = tokens.join(' ') || undefined;
	                var fileName = _indexOf(['eval', '<anonymous>'], locationParts[0]) > -1 ? undefined : locationParts[0];

	                return new StackFrame(functionName, undefined, fileName, locationParts[1], locationParts[2], line);
	            }, this);
	        },

	        parseFFOrSafari: function ErrorStackParser$$parseFFOrSafari(error) {
	            var filtered = _filter(error.stack.split('\n'), function(line) {
	                return !line.match(SAFARI_NATIVE_CODE_REGEXP);
	            }, this);

	            return _map(filtered, function(line) {
	                // Throw away eval information until we implement stacktrace.js/stackframe#8
	                if (line.indexOf(' > eval') > -1) {
	                    line = line.replace(/ line (\d+)(?: > eval line \d+)* > eval\:\d+\:\d+/g, ':$1');
	                }

	                if (line.indexOf('@') === -1 && line.indexOf(':') === -1) {
	                    // Safari eval frames only have function names and nothing else
	                    return new StackFrame(line);
	                } else {
	                    var tokens = line.split('@');
	                    var locationParts = this.extractLocation(tokens.pop());
	                    var functionName = tokens.join('@') || undefined;
	                    return new StackFrame(functionName,
	                        undefined,
	                        locationParts[0],
	                        locationParts[1],
	                        locationParts[2],
	                        line);
	                }
	            }, this);
	        },

	        parseOpera: function ErrorStackParser$$parseOpera(e) {
	            if (!e.stacktrace || (e.message.indexOf('\n') > -1 &&
	                e.message.split('\n').length > e.stacktrace.split('\n').length)) {
	                return this.parseOpera9(e);
	            } else if (!e.stack) {
	                return this.parseOpera10(e);
	            } else {
	                return this.parseOpera11(e);
	            }
	        },

	        parseOpera9: function ErrorStackParser$$parseOpera9(e) {
	            var lineRE = /Line (\d+).*script (?:in )?(\S+)/i;
	            var lines = e.message.split('\n');
	            var result = [];

	            for (var i = 2, len = lines.length; i < len; i += 2) {
	                var match = lineRE.exec(lines[i]);
	                if (match) {
	                    result.push(new StackFrame(undefined, undefined, match[2], match[1], undefined, lines[i]));
	                }
	            }

	            return result;
	        },

	        parseOpera10: function ErrorStackParser$$parseOpera10(e) {
	            var lineRE = /Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i;
	            var lines = e.stacktrace.split('\n');
	            var result = [];

	            for (var i = 0, len = lines.length; i < len; i += 2) {
	                var match = lineRE.exec(lines[i]);
	                if (match) {
	                    result.push(
	                        new StackFrame(
	                            match[3] || undefined,
	                            undefined,
	                            match[2],
	                            match[1],
	                            undefined,
	                            lines[i]
	                        )
	                    );
	                }
	            }

	            return result;
	        },

	        // Opera 10.65+ Error.stack very similar to FF/Safari
	        parseOpera11: function ErrorStackParser$$parseOpera11(error) {
	            var filtered = _filter(error.stack.split('\n'), function(line) {
	                return !!line.match(FIREFOX_SAFARI_STACK_REGEXP) && !line.match(/^Error created at/);
	            }, this);

	            return _map(filtered, function(line) {
	                var tokens = line.split('@');
	                var locationParts = this.extractLocation(tokens.pop());
	                var functionCall = (tokens.shift() || '');
	                var functionName = functionCall
	                        .replace(/<anonymous function(: (\w+))?>/, '$2')
	                        .replace(/\([^\)]*\)/g, '') || undefined;
	                var argsRaw;
	                if (functionCall.match(/\(([^\)]*)\)/)) {
	                    argsRaw = functionCall.replace(/^[^\(]+\(([^\)]*)\)$/, '$1');
	                }
	                var args = (argsRaw === undefined || argsRaw === '[arguments not available]') ?
	                    undefined : argsRaw.split(',');
	                return new StackFrame(
	                    functionName,
	                    args,
	                    locationParts[0],
	                    locationParts[1],
	                    locationParts[2],
	                    line);
	            }, this);
	        }
	    };
	}));



/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (root, factory) {
	    'use strict';
	    // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js, Rhino, and browsers.

	    /* istanbul ignore next */
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports === 'object') {
	        module.exports = factory();
	    } else {
	        root.StackFrame = factory();
	    }
	}(this, function () {
	    'use strict';
	    function _isNumber(n) {
	        return !isNaN(parseFloat(n)) && isFinite(n);
	    }

	    function StackFrame(functionName, args, fileName, lineNumber, columnNumber, source) {
	        if (functionName !== undefined) {
	            this.setFunctionName(functionName);
	        }
	        if (args !== undefined) {
	            this.setArgs(args);
	        }
	        if (fileName !== undefined) {
	            this.setFileName(fileName);
	        }
	        if (lineNumber !== undefined) {
	            this.setLineNumber(lineNumber);
	        }
	        if (columnNumber !== undefined) {
	            this.setColumnNumber(columnNumber);
	        }
	        if (source !== undefined) {
	            this.setSource(source);
	        }
	    }

	    StackFrame.prototype = {
	        getFunctionName: function () {
	            return this.functionName;
	        },
	        setFunctionName: function (v) {
	            this.functionName = String(v);
	        },

	        getArgs: function () {
	            return this.args;
	        },
	        setArgs: function (v) {
	            if (Object.prototype.toString.call(v) !== '[object Array]') {
	                throw new TypeError('Args must be an Array');
	            }
	            this.args = v;
	        },

	        // NOTE: Property name may be misleading as it includes the path,
	        // but it somewhat mirrors V8's JavaScriptStackTraceApi
	        // https://code.google.com/p/v8/wiki/JavaScriptStackTraceApi and Gecko's
	        // http://mxr.mozilla.org/mozilla-central/source/xpcom/base/nsIException.idl#14
	        getFileName: function () {
	            return this.fileName;
	        },
	        setFileName: function (v) {
	            this.fileName = String(v);
	        },

	        getLineNumber: function () {
	            return this.lineNumber;
	        },
	        setLineNumber: function (v) {
	            if (!_isNumber(v)) {
	                throw new TypeError('Line Number must be a Number');
	            }
	            this.lineNumber = Number(v);
	        },

	        getColumnNumber: function () {
	            return this.columnNumber;
	        },
	        setColumnNumber: function (v) {
	            if (!_isNumber(v)) {
	                throw new TypeError('Column Number must be a Number');
	            }
	            this.columnNumber = Number(v);
	        },

	        getSource: function () {
	            return this.source;
	        },
	        setSource: function (v) {
	            this.source = String(v);
	        },

	        toString: function() {
	            var functionName = this.getFunctionName() || '{anonymous}';
	            var args = '(' + (this.getArgs() || []).join(',') + ')';
	            var fileName = this.getFileName() ? ('@' + this.getFileName()) : '';
	            var lineNumber = _isNumber(this.getLineNumber()) ? (':' + this.getLineNumber()) : '';
	            var columnNumber = _isNumber(this.getColumnNumber()) ? (':' + this.getColumnNumber()) : '';
	            return functionName + args + fileName + lineNumber + columnNumber;
	        }
	    };

	    return StackFrame;
	}));


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (root, factory) {
	    'use strict';
	    // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js, Rhino, and browsers.

	    /* istanbul ignore next */
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(20)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports === 'object') {
	        module.exports = factory(require('stackframe'));
	    } else {
	        root.StackGenerator = factory(root.StackFrame);
	    }
	}(this, function (StackFrame) {
	    return {
	        backtrace: function StackGenerator$$backtrace(opts) {
	            var stack = [];
	            var maxStackSize = 10;

	            if (typeof opts === 'object' && typeof opts.maxStackSize === 'number') {
	                maxStackSize = opts.maxStackSize;
	            }

	            var curr = arguments.callee;
	            while (curr && stack.length < maxStackSize) {
	                // Allow V8 optimizations
	                var args = new Array(curr['arguments'].length);
	                for(var i = 0; i < args.length; ++i) {
	                    args[i] = curr['arguments'][i];
	                }
	                if (/function(?:\s+([\w$]+))+\s*\(/.test(curr.toString())) {
	                    stack.push(new StackFrame(RegExp.$1 || undefined, args));
	                } else {
	                    stack.push(new StackFrame(undefined, args));
	                }

	                try {
	                    curr = curr.caller;
	                } catch (e) {
	                    break;
	                }
	            }
	            return stack;
	        }
	    };
	}));


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(root, factory) {
	    'use strict';
	    // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js, Rhino, and browsers.

	    /* istanbul ignore next */
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(23), __webpack_require__(20)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports === 'object') {
	        module.exports = factory(require('source-map/lib/source-map-consumer'), require('stackframe'));
	    } else {
	        root.StackTraceGPS = factory(root.SourceMap || root.sourceMap, root.StackFrame);
	    }
	}(this, function(SourceMap, StackFrame) {
	    'use strict';

	    /**
	     * Make a X-Domain request to url and callback.
	     *
	     * @param {String} url
	     * @returns {Promise} with response text if fulfilled
	     */
	    function _xdr(url) {
	        return new Promise(function(resolve, reject) {
	            var req = new XMLHttpRequest();
	            req.open('get', url);
	            req.onerror = reject;
	            req.onreadystatechange = function onreadystatechange() {
	                if (req.readyState === 4) {
	                    if (req.status >= 200 && req.status < 300) {
	                        resolve(req.responseText);
	                    } else {
	                        reject(new Error('HTTP status: ' + req.status + ' retrieving ' + url));
	                    }
	                }
	            };
	            req.send();
	        });

	    }

	    /**
	     * Convert a Base64-encoded string into its original representation.
	     * Used for inline sourcemaps.
	     *
	     * @param {String} b64str Base-64 encoded string
	     * @returns {String} original representation of the base64-encoded string.
	     */
	    function _atob(b64str) {
	        if (typeof window !== 'undefined' && window.atob) {
	            return window.atob(b64str);
	        } else {
	            throw new Error('You must supply a polyfill for window.atob in this environment');
	        }
	    }

	    function _parseJson(string) {
	        if (typeof JSON !== 'undefined' && JSON.parse) {
	            return JSON.parse(string);
	        } else {
	            throw new Error('You must supply a polyfill for JSON.parse in this environment');
	        }
	    }

	    function _findFunctionName(source, lineNumber/*, columnNumber*/) {
	        // function {name}({args}) m[1]=name m[2]=args
	        var reFunctionDeclaration = /function\s+([^(]*?)\s*\(([^)]*)\)/;
	        // {name} = function ({args}) TODO args capture
	        var reFunctionExpression = /['"]?([$_A-Za-z][$_A-Za-z0-9]*)['"]?\s*[:=]\s*function\b/;
	        // {name} = eval()
	        var reFunctionEvaluation = /['"]?([$_A-Za-z][$_A-Za-z0-9]*)['"]?\s*[:=]\s*(?:eval|new Function)\b/;
	        var lines = source.split('\n');

	        // Walk backwards in the source lines until we find the line which matches one of the patterns above
	        var code = '';
	        var maxLines = Math.min(lineNumber, 20);
	        var m;
	        for (var i = 0; i < maxLines; ++i) {
	            // lineNo is 1-based, source[] is 0-based
	            var line = lines[lineNumber - i - 1];
	            var commentPos = line.indexOf('//');
	            if (commentPos >= 0) {
	                line = line.substr(0, commentPos);
	            }

	            if (line) {
	                code = line + code;
	                m = reFunctionExpression.exec(code);
	                if (m && m[1]) {
	                    return m[1];
	                }
	                m = reFunctionDeclaration.exec(code);
	                if (m && m[1]) {
	                    return m[1];
	                }
	                m = reFunctionEvaluation.exec(code);
	                if (m && m[1]) {
	                    return m[1];
	                }
	            }
	        }
	        return undefined;
	    }

	    function _ensureSupportedEnvironment() {
	        if (typeof Object.defineProperty !== 'function' || typeof Object.create !== 'function') {
	            throw new Error('Unable to consume source maps in older browsers');
	        }
	    }

	    function _ensureStackFrameIsLegit(stackframe) {
	        if (typeof stackframe !== 'object') {
	            throw new TypeError('Given StackFrame is not an object');
	        } else if (typeof stackframe.fileName !== 'string') {
	            throw new TypeError('Given file name is not a String');
	        } else if (typeof stackframe.lineNumber !== 'number' ||
	            stackframe.lineNumber % 1 !== 0 ||
	            stackframe.lineNumber < 1) {
	            throw new TypeError('Given line number must be a positive integer');
	        } else if (typeof stackframe.columnNumber !== 'number' ||
	            stackframe.columnNumber % 1 !== 0 ||
	            stackframe.columnNumber < 0) {
	            throw new TypeError('Given column number must be a non-negative integer');
	        }
	        return true;
	    }

	    function _findSourceMappingURL(source) {
	        var m = /\/\/[#@] ?sourceMappingURL=([^\s'"]+)\s*$/.exec(source);
	        if (m && m[1]) {
	            return m[1];
	        } else {
	            throw new Error('sourceMappingURL not found');
	        }
	    }

	    function _extractLocationInfoFromSourceMap(stackframe, rawSourceMap, sourceCache) {
	        return new Promise(function(resolve, reject) {
	            var mapConsumer = new SourceMap.SourceMapConsumer(rawSourceMap);

	            var loc = mapConsumer.originalPositionFor({
	                line: stackframe.lineNumber,
	                column: stackframe.columnNumber
	            });

	            if (loc.source) {
	                var mappedSource = mapConsumer.sourceContentFor(loc.source);
	                if (mappedSource) {
	                    sourceCache[loc.source] = mappedSource;
	                }
	                resolve(
	                    new StackFrame(
	                        loc.name || stackframe.functionName,
	                        stackframe.args,
	                        loc.source,
	                        loc.line,
	                        loc.column));
	            } else {
	                reject(new Error('Could not get original source for given stackframe and source map'));
	            }
	        });
	    }

	    /**
	     * @constructor
	     * @param {Object} opts
	     *      opts.sourceCache = {url: "Source String"} => preload source cache
	     *      opts.offline = True to prevent network requests.
	     *              Best effort without sources or source maps.
	     *      opts.ajax = Promise returning function to make X-Domain requests
	     */
	    return function StackTraceGPS(opts) {
	        if (!(this instanceof StackTraceGPS)) {
	            return new StackTraceGPS(opts);
	        }
	        opts = opts || {};

	        this.sourceCache = opts.sourceCache || {};

	        this.ajax = opts.ajax || _xdr;

	        this._atob = opts.atob || _atob;

	        this._get = function _get(location) {
	            return new Promise(function(resolve, reject) {
	                var isDataUrl = location.substr(0, 5) === 'data:';
	                if (this.sourceCache[location]) {
	                    resolve(this.sourceCache[location]);
	                } else if (opts.offline && !isDataUrl) {
	                    reject(new Error('Cannot make network requests in offline mode'));
	                } else {
	                    if (isDataUrl) {
	                        // data URLs can have parameters.
	                        // see http://tools.ietf.org/html/rfc2397
	                        var supportedEncodingRegexp =
	                            /^data:application\/json;([\w=:"-]+;)*base64,/;
	                        var match = location.match(supportedEncodingRegexp);
	                        if (match) {
	                            var sourceMapStart = match[0].length;
	                            var encodedSource = location.substr(sourceMapStart);
	                            var source = this._atob(encodedSource);
	                            this.sourceCache[location] = source;
	                            resolve(source);
	                        } else {
	                            reject(new Error('The encoding of the inline sourcemap is not supported'));
	                        }
	                    } else {
	                        var xhrPromise = this.ajax(location, {method: 'get'});
	                        // Cache the Promise to prevent duplicate in-flight requests
	                        this.sourceCache[location] = xhrPromise;
	                        xhrPromise.then(resolve, reject);
	                    }
	                }
	            }.bind(this));
	        };

	        /**
	         * Given a StackFrame, enhance function name and use source maps for a
	         * better StackFrame.
	         *
	         * @param {StackFrame} stackframe object
	         * @returns {Promise} that resolves with with source-mapped StackFrame
	         */
	        this.pinpoint = function StackTraceGPS$$pinpoint(stackframe) {
	            return new Promise(function(resolve, reject) {
	                this.getMappedLocation(stackframe).then(function(mappedStackFrame) {
	                    function resolveMappedStackFrame() {
	                        resolve(mappedStackFrame);
	                    }

	                    this.findFunctionName(mappedStackFrame)
	                        .then(resolve, resolveMappedStackFrame)
	                        ['catch'](resolveMappedStackFrame);
	                }.bind(this), reject);
	            }.bind(this));
	        };

	        /**
	         * Given a StackFrame, guess function name from location information.
	         *
	         * @param {StackFrame} stackframe
	         * @returns {Promise} that resolves with enhanced StackFrame.
	         */
	        this.findFunctionName = function StackTraceGPS$$findFunctionName(stackframe) {
	            return new Promise(function(resolve, reject) {
	                _ensureStackFrameIsLegit(stackframe);
	                this._get(stackframe.fileName).then(function getSourceCallback(source) {
	                    var lineNumber = stackframe.lineNumber;
	                    var columnNumber = stackframe.columnNumber;
	                    var guessedFunctionName = _findFunctionName(source, lineNumber, columnNumber);
	                    // Only replace functionName if we found something
	                    if (guessedFunctionName) {
	                        resolve(new StackFrame(guessedFunctionName,
	                            stackframe.args,
	                            stackframe.fileName,
	                            lineNumber,
	                            columnNumber));
	                    } else {
	                        resolve(stackframe);
	                    }
	                }, reject)['catch'](reject);
	            }.bind(this));
	        };

	        /**
	         * Given a StackFrame, seek source-mapped location and return new enhanced StackFrame.
	         *
	         * @param {StackFrame} stackframe
	         * @returns {Promise} that resolves with enhanced StackFrame.
	         */
	        this.getMappedLocation = function StackTraceGPS$$getMappedLocation(stackframe) {
	            return new Promise(function(resolve, reject) {
	                _ensureSupportedEnvironment();
	                _ensureStackFrameIsLegit(stackframe);

	                var sourceCache = this.sourceCache;
	                var fileName = stackframe.fileName;
	                this._get(fileName).then(function(source) {
	                    var sourceMappingURL = _findSourceMappingURL(source);
	                    var isDataUrl = sourceMappingURL.substr(0, 5) === 'data:';
	                    var base = fileName.substring(0, fileName.lastIndexOf('/') + 1);

	                    if (sourceMappingURL[0] !== '/' && !isDataUrl && !(/^https?:\/\/|^\/\//i).test(sourceMappingURL)) {
	                        sourceMappingURL = base + sourceMappingURL;
	                    }

	                    this._get(sourceMappingURL).then(function(sourceMap) {
	                        if (typeof sourceMap === 'string') {
	                            sourceMap = _parseJson(sourceMap.replace(/^\)\]\}'/, ''));
	                        }
	                        if (typeof sourceMap.sourceRoot === 'undefined') {
	                            sourceMap.sourceRoot = base;
	                        }

	                        _extractLocationInfoFromSourceMap(stackframe, sourceMap, sourceCache)
	                            .then(resolve)['catch'](function() {
	                            resolve(stackframe);
	                        });
	                    }, reject)['catch'](reject);
	                }.bind(this), reject)['catch'](reject);
	            }.bind(this));
	        };
	    };
	}));


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Copyright 2009-2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE.txt or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */
	exports.SourceMapGenerator = __webpack_require__(24).SourceMapGenerator;
	exports.SourceMapConsumer = __webpack_require__(30).SourceMapConsumer;
	exports.SourceNode = __webpack_require__(33).SourceNode;


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */

	var base64VLQ = __webpack_require__(25);
	var util = __webpack_require__(27);
	var ArraySet = __webpack_require__(28).ArraySet;
	var MappingList = __webpack_require__(29).MappingList;

	/**
	 * An instance of the SourceMapGenerator represents a source map which is
	 * being built incrementally. You may pass an object with the following
	 * properties:
	 *
	 *   - file: The filename of the generated source.
	 *   - sourceRoot: A root for all relative URLs in this source map.
	 */
	function SourceMapGenerator(aArgs) {
	  if (!aArgs) {
	    aArgs = {};
	  }
	  this._file = util.getArg(aArgs, 'file', null);
	  this._sourceRoot = util.getArg(aArgs, 'sourceRoot', null);
	  this._skipValidation = util.getArg(aArgs, 'skipValidation', false);
	  this._sources = new ArraySet();
	  this._names = new ArraySet();
	  this._mappings = new MappingList();
	  this._sourcesContents = null;
	}

	SourceMapGenerator.prototype._version = 3;

	/**
	 * Creates a new SourceMapGenerator based on a SourceMapConsumer
	 *
	 * @param aSourceMapConsumer The SourceMap.
	 */
	SourceMapGenerator.fromSourceMap =
	  function SourceMapGenerator_fromSourceMap(aSourceMapConsumer) {
	    var sourceRoot = aSourceMapConsumer.sourceRoot;
	    var generator = new SourceMapGenerator({
	      file: aSourceMapConsumer.file,
	      sourceRoot: sourceRoot
	    });
	    aSourceMapConsumer.eachMapping(function (mapping) {
	      var newMapping = {
	        generated: {
	          line: mapping.generatedLine,
	          column: mapping.generatedColumn
	        }
	      };

	      if (mapping.source != null) {
	        newMapping.source = mapping.source;
	        if (sourceRoot != null) {
	          newMapping.source = util.relative(sourceRoot, newMapping.source);
	        }

	        newMapping.original = {
	          line: mapping.originalLine,
	          column: mapping.originalColumn
	        };

	        if (mapping.name != null) {
	          newMapping.name = mapping.name;
	        }
	      }

	      generator.addMapping(newMapping);
	    });
	    aSourceMapConsumer.sources.forEach(function (sourceFile) {
	      var content = aSourceMapConsumer.sourceContentFor(sourceFile);
	      if (content != null) {
	        generator.setSourceContent(sourceFile, content);
	      }
	    });
	    return generator;
	  };

	/**
	 * Add a single mapping from original source line and column to the generated
	 * source's line and column for this source map being created. The mapping
	 * object should have the following properties:
	 *
	 *   - generated: An object with the generated line and column positions.
	 *   - original: An object with the original line and column positions.
	 *   - source: The original source file (relative to the sourceRoot).
	 *   - name: An optional original token name for this mapping.
	 */
	SourceMapGenerator.prototype.addMapping =
	  function SourceMapGenerator_addMapping(aArgs) {
	    var generated = util.getArg(aArgs, 'generated');
	    var original = util.getArg(aArgs, 'original', null);
	    var source = util.getArg(aArgs, 'source', null);
	    var name = util.getArg(aArgs, 'name', null);

	    if (!this._skipValidation) {
	      this._validateMapping(generated, original, source, name);
	    }

	    if (source != null) {
	      source = String(source);
	      if (!this._sources.has(source)) {
	        this._sources.add(source);
	      }
	    }

	    if (name != null) {
	      name = String(name);
	      if (!this._names.has(name)) {
	        this._names.add(name);
	      }
	    }

	    this._mappings.add({
	      generatedLine: generated.line,
	      generatedColumn: generated.column,
	      originalLine: original != null && original.line,
	      originalColumn: original != null && original.column,
	      source: source,
	      name: name
	    });
	  };

	/**
	 * Set the source content for a source file.
	 */
	SourceMapGenerator.prototype.setSourceContent =
	  function SourceMapGenerator_setSourceContent(aSourceFile, aSourceContent) {
	    var source = aSourceFile;
	    if (this._sourceRoot != null) {
	      source = util.relative(this._sourceRoot, source);
	    }

	    if (aSourceContent != null) {
	      // Add the source content to the _sourcesContents map.
	      // Create a new _sourcesContents map if the property is null.
	      if (!this._sourcesContents) {
	        this._sourcesContents = Object.create(null);
	      }
	      this._sourcesContents[util.toSetString(source)] = aSourceContent;
	    } else if (this._sourcesContents) {
	      // Remove the source file from the _sourcesContents map.
	      // If the _sourcesContents map is empty, set the property to null.
	      delete this._sourcesContents[util.toSetString(source)];
	      if (Object.keys(this._sourcesContents).length === 0) {
	        this._sourcesContents = null;
	      }
	    }
	  };

	/**
	 * Applies the mappings of a sub-source-map for a specific source file to the
	 * source map being generated. Each mapping to the supplied source file is
	 * rewritten using the supplied source map. Note: The resolution for the
	 * resulting mappings is the minimium of this map and the supplied map.
	 *
	 * @param aSourceMapConsumer The source map to be applied.
	 * @param aSourceFile Optional. The filename of the source file.
	 *        If omitted, SourceMapConsumer's file property will be used.
	 * @param aSourceMapPath Optional. The dirname of the path to the source map
	 *        to be applied. If relative, it is relative to the SourceMapConsumer.
	 *        This parameter is needed when the two source maps aren't in the same
	 *        directory, and the source map to be applied contains relative source
	 *        paths. If so, those relative source paths need to be rewritten
	 *        relative to the SourceMapGenerator.
	 */
	SourceMapGenerator.prototype.applySourceMap =
	  function SourceMapGenerator_applySourceMap(aSourceMapConsumer, aSourceFile, aSourceMapPath) {
	    var sourceFile = aSourceFile;
	    // If aSourceFile is omitted, we will use the file property of the SourceMap
	    if (aSourceFile == null) {
	      if (aSourceMapConsumer.file == null) {
	        throw new Error(
	          'SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, ' +
	          'or the source map\'s "file" property. Both were omitted.'
	        );
	      }
	      sourceFile = aSourceMapConsumer.file;
	    }
	    var sourceRoot = this._sourceRoot;
	    // Make "sourceFile" relative if an absolute Url is passed.
	    if (sourceRoot != null) {
	      sourceFile = util.relative(sourceRoot, sourceFile);
	    }
	    // Applying the SourceMap can add and remove items from the sources and
	    // the names array.
	    var newSources = new ArraySet();
	    var newNames = new ArraySet();

	    // Find mappings for the "sourceFile"
	    this._mappings.unsortedForEach(function (mapping) {
	      if (mapping.source === sourceFile && mapping.originalLine != null) {
	        // Check if it can be mapped by the source map, then update the mapping.
	        var original = aSourceMapConsumer.originalPositionFor({
	          line: mapping.originalLine,
	          column: mapping.originalColumn
	        });
	        if (original.source != null) {
	          // Copy mapping
	          mapping.source = original.source;
	          if (aSourceMapPath != null) {
	            mapping.source = util.join(aSourceMapPath, mapping.source)
	          }
	          if (sourceRoot != null) {
	            mapping.source = util.relative(sourceRoot, mapping.source);
	          }
	          mapping.originalLine = original.line;
	          mapping.originalColumn = original.column;
	          if (original.name != null) {
	            mapping.name = original.name;
	          }
	        }
	      }

	      var source = mapping.source;
	      if (source != null && !newSources.has(source)) {
	        newSources.add(source);
	      }

	      var name = mapping.name;
	      if (name != null && !newNames.has(name)) {
	        newNames.add(name);
	      }

	    }, this);
	    this._sources = newSources;
	    this._names = newNames;

	    // Copy sourcesContents of applied map.
	    aSourceMapConsumer.sources.forEach(function (sourceFile) {
	      var content = aSourceMapConsumer.sourceContentFor(sourceFile);
	      if (content != null) {
	        if (aSourceMapPath != null) {
	          sourceFile = util.join(aSourceMapPath, sourceFile);
	        }
	        if (sourceRoot != null) {
	          sourceFile = util.relative(sourceRoot, sourceFile);
	        }
	        this.setSourceContent(sourceFile, content);
	      }
	    }, this);
	  };

	/**
	 * A mapping can have one of the three levels of data:
	 *
	 *   1. Just the generated position.
	 *   2. The Generated position, original position, and original source.
	 *   3. Generated and original position, original source, as well as a name
	 *      token.
	 *
	 * To maintain consistency, we validate that any new mapping being added falls
	 * in to one of these categories.
	 */
	SourceMapGenerator.prototype._validateMapping =
	  function SourceMapGenerator_validateMapping(aGenerated, aOriginal, aSource,
	                                              aName) {
	    if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
	        && aGenerated.line > 0 && aGenerated.column >= 0
	        && !aOriginal && !aSource && !aName) {
	      // Case 1.
	      return;
	    }
	    else if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
	             && aOriginal && 'line' in aOriginal && 'column' in aOriginal
	             && aGenerated.line > 0 && aGenerated.column >= 0
	             && aOriginal.line > 0 && aOriginal.column >= 0
	             && aSource) {
	      // Cases 2 and 3.
	      return;
	    }
	    else {
	      throw new Error('Invalid mapping: ' + JSON.stringify({
	        generated: aGenerated,
	        source: aSource,
	        original: aOriginal,
	        name: aName
	      }));
	    }
	  };

	/**
	 * Serialize the accumulated mappings in to the stream of base 64 VLQs
	 * specified by the source map format.
	 */
	SourceMapGenerator.prototype._serializeMappings =
	  function SourceMapGenerator_serializeMappings() {
	    var previousGeneratedColumn = 0;
	    var previousGeneratedLine = 1;
	    var previousOriginalColumn = 0;
	    var previousOriginalLine = 0;
	    var previousName = 0;
	    var previousSource = 0;
	    var result = '';
	    var next;
	    var mapping;
	    var nameIdx;
	    var sourceIdx;

	    var mappings = this._mappings.toArray();
	    for (var i = 0, len = mappings.length; i < len; i++) {
	      mapping = mappings[i];
	      next = ''

	      if (mapping.generatedLine !== previousGeneratedLine) {
	        previousGeneratedColumn = 0;
	        while (mapping.generatedLine !== previousGeneratedLine) {
	          next += ';';
	          previousGeneratedLine++;
	        }
	      }
	      else {
	        if (i > 0) {
	          if (!util.compareByGeneratedPositionsInflated(mapping, mappings[i - 1])) {
	            continue;
	          }
	          next += ',';
	        }
	      }

	      next += base64VLQ.encode(mapping.generatedColumn
	                                 - previousGeneratedColumn);
	      previousGeneratedColumn = mapping.generatedColumn;

	      if (mapping.source != null) {
	        sourceIdx = this._sources.indexOf(mapping.source);
	        next += base64VLQ.encode(sourceIdx - previousSource);
	        previousSource = sourceIdx;

	        // lines are stored 0-based in SourceMap spec version 3
	        next += base64VLQ.encode(mapping.originalLine - 1
	                                   - previousOriginalLine);
	        previousOriginalLine = mapping.originalLine - 1;

	        next += base64VLQ.encode(mapping.originalColumn
	                                   - previousOriginalColumn);
	        previousOriginalColumn = mapping.originalColumn;

	        if (mapping.name != null) {
	          nameIdx = this._names.indexOf(mapping.name);
	          next += base64VLQ.encode(nameIdx - previousName);
	          previousName = nameIdx;
	        }
	      }

	      result += next;
	    }

	    return result;
	  };

	SourceMapGenerator.prototype._generateSourcesContent =
	  function SourceMapGenerator_generateSourcesContent(aSources, aSourceRoot) {
	    return aSources.map(function (source) {
	      if (!this._sourcesContents) {
	        return null;
	      }
	      if (aSourceRoot != null) {
	        source = util.relative(aSourceRoot, source);
	      }
	      var key = util.toSetString(source);
	      return Object.prototype.hasOwnProperty.call(this._sourcesContents, key)
	        ? this._sourcesContents[key]
	        : null;
	    }, this);
	  };

	/**
	 * Externalize the source map.
	 */
	SourceMapGenerator.prototype.toJSON =
	  function SourceMapGenerator_toJSON() {
	    var map = {
	      version: this._version,
	      sources: this._sources.toArray(),
	      names: this._names.toArray(),
	      mappings: this._serializeMappings()
	    };
	    if (this._file != null) {
	      map.file = this._file;
	    }
	    if (this._sourceRoot != null) {
	      map.sourceRoot = this._sourceRoot;
	    }
	    if (this._sourcesContents) {
	      map.sourcesContent = this._generateSourcesContent(map.sources, map.sourceRoot);
	    }

	    return map;
	  };

	/**
	 * Render the source map being generated to a string.
	 */
	SourceMapGenerator.prototype.toString =
	  function SourceMapGenerator_toString() {
	    return JSON.stringify(this.toJSON());
	  };

	exports.SourceMapGenerator = SourceMapGenerator;


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 *
	 * Based on the Base 64 VLQ implementation in Closure Compiler:
	 * https://code.google.com/p/closure-compiler/source/browse/trunk/src/com/google/debugging/sourcemap/Base64VLQ.java
	 *
	 * Copyright 2011 The Closure Compiler Authors. All rights reserved.
	 * Redistribution and use in source and binary forms, with or without
	 * modification, are permitted provided that the following conditions are
	 * met:
	 *
	 *  * Redistributions of source code must retain the above copyright
	 *    notice, this list of conditions and the following disclaimer.
	 *  * Redistributions in binary form must reproduce the above
	 *    copyright notice, this list of conditions and the following
	 *    disclaimer in the documentation and/or other materials provided
	 *    with the distribution.
	 *  * Neither the name of Google Inc. nor the names of its
	 *    contributors may be used to endorse or promote products derived
	 *    from this software without specific prior written permission.
	 *
	 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
	 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
	 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
	 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
	 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
	 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
	 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
	 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
	 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
	 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
	 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	 */

	var base64 = __webpack_require__(26);

	// A single base 64 digit can contain 6 bits of data. For the base 64 variable
	// length quantities we use in the source map spec, the first bit is the sign,
	// the next four bits are the actual value, and the 6th bit is the
	// continuation bit. The continuation bit tells us whether there are more
	// digits in this value following this digit.
	//
	//   Continuation
	//   |    Sign
	//   |    |
	//   V    V
	//   101011

	var VLQ_BASE_SHIFT = 5;

	// binary: 100000
	var VLQ_BASE = 1 << VLQ_BASE_SHIFT;

	// binary: 011111
	var VLQ_BASE_MASK = VLQ_BASE - 1;

	// binary: 100000
	var VLQ_CONTINUATION_BIT = VLQ_BASE;

	/**
	 * Converts from a two-complement value to a value where the sign bit is
	 * placed in the least significant bit.  For example, as decimals:
	 *   1 becomes 2 (10 binary), -1 becomes 3 (11 binary)
	 *   2 becomes 4 (100 binary), -2 becomes 5 (101 binary)
	 */
	function toVLQSigned(aValue) {
	  return aValue < 0
	    ? ((-aValue) << 1) + 1
	    : (aValue << 1) + 0;
	}

	/**
	 * Converts to a two-complement value from a value where the sign bit is
	 * placed in the least significant bit.  For example, as decimals:
	 *   2 (10 binary) becomes 1, 3 (11 binary) becomes -1
	 *   4 (100 binary) becomes 2, 5 (101 binary) becomes -2
	 */
	function fromVLQSigned(aValue) {
	  var isNegative = (aValue & 1) === 1;
	  var shifted = aValue >> 1;
	  return isNegative
	    ? -shifted
	    : shifted;
	}

	/**
	 * Returns the base 64 VLQ encoded value.
	 */
	exports.encode = function base64VLQ_encode(aValue) {
	  var encoded = "";
	  var digit;

	  var vlq = toVLQSigned(aValue);

	  do {
	    digit = vlq & VLQ_BASE_MASK;
	    vlq >>>= VLQ_BASE_SHIFT;
	    if (vlq > 0) {
	      // There are still more digits in this value, so we must make sure the
	      // continuation bit is marked.
	      digit |= VLQ_CONTINUATION_BIT;
	    }
	    encoded += base64.encode(digit);
	  } while (vlq > 0);

	  return encoded;
	};

	/**
	 * Decodes the next base 64 VLQ value from the given string and returns the
	 * value and the rest of the string via the out parameter.
	 */
	exports.decode = function base64VLQ_decode(aStr, aIndex, aOutParam) {
	  var strLen = aStr.length;
	  var result = 0;
	  var shift = 0;
	  var continuation, digit;

	  do {
	    if (aIndex >= strLen) {
	      throw new Error("Expected more digits in base 64 VLQ value.");
	    }

	    digit = base64.decode(aStr.charCodeAt(aIndex++));
	    if (digit === -1) {
	      throw new Error("Invalid base64 digit: " + aStr.charAt(aIndex - 1));
	    }

	    continuation = !!(digit & VLQ_CONTINUATION_BIT);
	    digit &= VLQ_BASE_MASK;
	    result = result + (digit << shift);
	    shift += VLQ_BASE_SHIFT;
	  } while (continuation);

	  aOutParam.value = fromVLQSigned(result);
	  aOutParam.rest = aIndex;
	};


/***/ },
/* 26 */
/***/ function(module, exports) {

	/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */

	var intToCharMap = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');

	/**
	 * Encode an integer in the range of 0 to 63 to a single base 64 digit.
	 */
	exports.encode = function (number) {
	  if (0 <= number && number < intToCharMap.length) {
	    return intToCharMap[number];
	  }
	  throw new TypeError("Must be between 0 and 63: " + number);
	};

	/**
	 * Decode a single base 64 character code digit to an integer. Returns -1 on
	 * failure.
	 */
	exports.decode = function (charCode) {
	  var bigA = 65;     // 'A'
	  var bigZ = 90;     // 'Z'

	  var littleA = 97;  // 'a'
	  var littleZ = 122; // 'z'

	  var zero = 48;     // '0'
	  var nine = 57;     // '9'

	  var plus = 43;     // '+'
	  var slash = 47;    // '/'

	  var littleOffset = 26;
	  var numberOffset = 52;

	  // 0 - 25: ABCDEFGHIJKLMNOPQRSTUVWXYZ
	  if (bigA <= charCode && charCode <= bigZ) {
	    return (charCode - bigA);
	  }

	  // 26 - 51: abcdefghijklmnopqrstuvwxyz
	  if (littleA <= charCode && charCode <= littleZ) {
	    return (charCode - littleA + littleOffset);
	  }

	  // 52 - 61: 0123456789
	  if (zero <= charCode && charCode <= nine) {
	    return (charCode - zero + numberOffset);
	  }

	  // 62: +
	  if (charCode == plus) {
	    return 62;
	  }

	  // 63: /
	  if (charCode == slash) {
	    return 63;
	  }

	  // Invalid base64 digit.
	  return -1;
	};


/***/ },
/* 27 */
/***/ function(module, exports) {

	/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */

	/**
	 * This is a helper function for getting values from parameter/options
	 * objects.
	 *
	 * @param args The object we are extracting values from
	 * @param name The name of the property we are getting.
	 * @param defaultValue An optional value to return if the property is missing
	 * from the object. If this is not specified and the property is missing, an
	 * error will be thrown.
	 */
	function getArg(aArgs, aName, aDefaultValue) {
	  if (aName in aArgs) {
	    return aArgs[aName];
	  } else if (arguments.length === 3) {
	    return aDefaultValue;
	  } else {
	    throw new Error('"' + aName + '" is a required argument.');
	  }
	}
	exports.getArg = getArg;

	var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.]*)(?::(\d+))?(\S*)$/;
	var dataUrlRegexp = /^data:.+\,.+$/;

	function urlParse(aUrl) {
	  var match = aUrl.match(urlRegexp);
	  if (!match) {
	    return null;
	  }
	  return {
	    scheme: match[1],
	    auth: match[2],
	    host: match[3],
	    port: match[4],
	    path: match[5]
	  };
	}
	exports.urlParse = urlParse;

	function urlGenerate(aParsedUrl) {
	  var url = '';
	  if (aParsedUrl.scheme) {
	    url += aParsedUrl.scheme + ':';
	  }
	  url += '//';
	  if (aParsedUrl.auth) {
	    url += aParsedUrl.auth + '@';
	  }
	  if (aParsedUrl.host) {
	    url += aParsedUrl.host;
	  }
	  if (aParsedUrl.port) {
	    url += ":" + aParsedUrl.port
	  }
	  if (aParsedUrl.path) {
	    url += aParsedUrl.path;
	  }
	  return url;
	}
	exports.urlGenerate = urlGenerate;

	/**
	 * Normalizes a path, or the path portion of a URL:
	 *
	 * - Replaces consecutive slashes with one slash.
	 * - Removes unnecessary '.' parts.
	 * - Removes unnecessary '<dir>/..' parts.
	 *
	 * Based on code in the Node.js 'path' core module.
	 *
	 * @param aPath The path or url to normalize.
	 */
	function normalize(aPath) {
	  var path = aPath;
	  var url = urlParse(aPath);
	  if (url) {
	    if (!url.path) {
	      return aPath;
	    }
	    path = url.path;
	  }
	  var isAbsolute = exports.isAbsolute(path);

	  var parts = path.split(/\/+/);
	  for (var part, up = 0, i = parts.length - 1; i >= 0; i--) {
	    part = parts[i];
	    if (part === '.') {
	      parts.splice(i, 1);
	    } else if (part === '..') {
	      up++;
	    } else if (up > 0) {
	      if (part === '') {
	        // The first part is blank if the path is absolute. Trying to go
	        // above the root is a no-op. Therefore we can remove all '..' parts
	        // directly after the root.
	        parts.splice(i + 1, up);
	        up = 0;
	      } else {
	        parts.splice(i, 2);
	        up--;
	      }
	    }
	  }
	  path = parts.join('/');

	  if (path === '') {
	    path = isAbsolute ? '/' : '.';
	  }

	  if (url) {
	    url.path = path;
	    return urlGenerate(url);
	  }
	  return path;
	}
	exports.normalize = normalize;

	/**
	 * Joins two paths/URLs.
	 *
	 * @param aRoot The root path or URL.
	 * @param aPath The path or URL to be joined with the root.
	 *
	 * - If aPath is a URL or a data URI, aPath is returned, unless aPath is a
	 *   scheme-relative URL: Then the scheme of aRoot, if any, is prepended
	 *   first.
	 * - Otherwise aPath is a path. If aRoot is a URL, then its path portion
	 *   is updated with the result and aRoot is returned. Otherwise the result
	 *   is returned.
	 *   - If aPath is absolute, the result is aPath.
	 *   - Otherwise the two paths are joined with a slash.
	 * - Joining for example 'http://' and 'www.example.com' is also supported.
	 */
	function join(aRoot, aPath) {
	  if (aRoot === "") {
	    aRoot = ".";
	  }
	  if (aPath === "") {
	    aPath = ".";
	  }
	  var aPathUrl = urlParse(aPath);
	  var aRootUrl = urlParse(aRoot);
	  if (aRootUrl) {
	    aRoot = aRootUrl.path || '/';
	  }

	  // `join(foo, '//www.example.org')`
	  if (aPathUrl && !aPathUrl.scheme) {
	    if (aRootUrl) {
	      aPathUrl.scheme = aRootUrl.scheme;
	    }
	    return urlGenerate(aPathUrl);
	  }

	  if (aPathUrl || aPath.match(dataUrlRegexp)) {
	    return aPath;
	  }

	  // `join('http://', 'www.example.com')`
	  if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
	    aRootUrl.host = aPath;
	    return urlGenerate(aRootUrl);
	  }

	  var joined = aPath.charAt(0) === '/'
	    ? aPath
	    : normalize(aRoot.replace(/\/+$/, '') + '/' + aPath);

	  if (aRootUrl) {
	    aRootUrl.path = joined;
	    return urlGenerate(aRootUrl);
	  }
	  return joined;
	}
	exports.join = join;

	exports.isAbsolute = function (aPath) {
	  return aPath.charAt(0) === '/' || !!aPath.match(urlRegexp);
	};

	/**
	 * Make a path relative to a URL or another path.
	 *
	 * @param aRoot The root path or URL.
	 * @param aPath The path or URL to be made relative to aRoot.
	 */
	function relative(aRoot, aPath) {
	  if (aRoot === "") {
	    aRoot = ".";
	  }

	  aRoot = aRoot.replace(/\/$/, '');

	  // It is possible for the path to be above the root. In this case, simply
	  // checking whether the root is a prefix of the path won't work. Instead, we
	  // need to remove components from the root one by one, until either we find
	  // a prefix that fits, or we run out of components to remove.
	  var level = 0;
	  while (aPath.indexOf(aRoot + '/') !== 0) {
	    var index = aRoot.lastIndexOf("/");
	    if (index < 0) {
	      return aPath;
	    }

	    // If the only part of the root that is left is the scheme (i.e. http://,
	    // file:///, etc.), one or more slashes (/), or simply nothing at all, we
	    // have exhausted all components, so the path is not relative to the root.
	    aRoot = aRoot.slice(0, index);
	    if (aRoot.match(/^([^\/]+:\/)?\/*$/)) {
	      return aPath;
	    }

	    ++level;
	  }

	  // Make sure we add a "../" for each component we removed from the root.
	  return Array(level + 1).join("../") + aPath.substr(aRoot.length + 1);
	}
	exports.relative = relative;

	var supportsNullProto = (function () {
	  var obj = Object.create(null);
	  return !('__proto__' in obj);
	}());

	function identity (s) {
	  return s;
	}

	/**
	 * Because behavior goes wacky when you set `__proto__` on objects, we
	 * have to prefix all the strings in our set with an arbitrary character.
	 *
	 * See https://github.com/mozilla/source-map/pull/31 and
	 * https://github.com/mozilla/source-map/issues/30
	 *
	 * @param String aStr
	 */
	function toSetString(aStr) {
	  if (isProtoString(aStr)) {
	    return '$' + aStr;
	  }

	  return aStr;
	}
	exports.toSetString = supportsNullProto ? identity : toSetString;

	function fromSetString(aStr) {
	  if (isProtoString(aStr)) {
	    return aStr.slice(1);
	  }

	  return aStr;
	}
	exports.fromSetString = supportsNullProto ? identity : fromSetString;

	function isProtoString(s) {
	  if (!s) {
	    return false;
	  }

	  var length = s.length;

	  if (length < 9 /* "__proto__".length */) {
	    return false;
	  }

	  if (s.charCodeAt(length - 1) !== 95  /* '_' */ ||
	      s.charCodeAt(length - 2) !== 95  /* '_' */ ||
	      s.charCodeAt(length - 3) !== 111 /* 'o' */ ||
	      s.charCodeAt(length - 4) !== 116 /* 't' */ ||
	      s.charCodeAt(length - 5) !== 111 /* 'o' */ ||
	      s.charCodeAt(length - 6) !== 114 /* 'r' */ ||
	      s.charCodeAt(length - 7) !== 112 /* 'p' */ ||
	      s.charCodeAt(length - 8) !== 95  /* '_' */ ||
	      s.charCodeAt(length - 9) !== 95  /* '_' */) {
	    return false;
	  }

	  for (var i = length - 10; i >= 0; i--) {
	    if (s.charCodeAt(i) !== 36 /* '$' */) {
	      return false;
	    }
	  }

	  return true;
	}

	/**
	 * Comparator between two mappings where the original positions are compared.
	 *
	 * Optionally pass in `true` as `onlyCompareGenerated` to consider two
	 * mappings with the same original source/line/column, but different generated
	 * line and column the same. Useful when searching for a mapping with a
	 * stubbed out mapping.
	 */
	function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
	  var cmp = mappingA.source - mappingB.source;
	  if (cmp !== 0) {
	    return cmp;
	  }

	  cmp = mappingA.originalLine - mappingB.originalLine;
	  if (cmp !== 0) {
	    return cmp;
	  }

	  cmp = mappingA.originalColumn - mappingB.originalColumn;
	  if (cmp !== 0 || onlyCompareOriginal) {
	    return cmp;
	  }

	  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
	  if (cmp !== 0) {
	    return cmp;
	  }

	  cmp = mappingA.generatedLine - mappingB.generatedLine;
	  if (cmp !== 0) {
	    return cmp;
	  }

	  return mappingA.name - mappingB.name;
	}
	exports.compareByOriginalPositions = compareByOriginalPositions;

	/**
	 * Comparator between two mappings with deflated source and name indices where
	 * the generated positions are compared.
	 *
	 * Optionally pass in `true` as `onlyCompareGenerated` to consider two
	 * mappings with the same generated line and column, but different
	 * source/name/original line and column the same. Useful when searching for a
	 * mapping with a stubbed out mapping.
	 */
	function compareByGeneratedPositionsDeflated(mappingA, mappingB, onlyCompareGenerated) {
	  var cmp = mappingA.generatedLine - mappingB.generatedLine;
	  if (cmp !== 0) {
	    return cmp;
	  }

	  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
	  if (cmp !== 0 || onlyCompareGenerated) {
	    return cmp;
	  }

	  cmp = mappingA.source - mappingB.source;
	  if (cmp !== 0) {
	    return cmp;
	  }

	  cmp = mappingA.originalLine - mappingB.originalLine;
	  if (cmp !== 0) {
	    return cmp;
	  }

	  cmp = mappingA.originalColumn - mappingB.originalColumn;
	  if (cmp !== 0) {
	    return cmp;
	  }

	  return mappingA.name - mappingB.name;
	}
	exports.compareByGeneratedPositionsDeflated = compareByGeneratedPositionsDeflated;

	function strcmp(aStr1, aStr2) {
	  if (aStr1 === aStr2) {
	    return 0;
	  }

	  if (aStr1 > aStr2) {
	    return 1;
	  }

	  return -1;
	}

	/**
	 * Comparator between two mappings with inflated source and name strings where
	 * the generated positions are compared.
	 */
	function compareByGeneratedPositionsInflated(mappingA, mappingB) {
	  var cmp = mappingA.generatedLine - mappingB.generatedLine;
	  if (cmp !== 0) {
	    return cmp;
	  }

	  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
	  if (cmp !== 0) {
	    return cmp;
	  }

	  cmp = strcmp(mappingA.source, mappingB.source);
	  if (cmp !== 0) {
	    return cmp;
	  }

	  cmp = mappingA.originalLine - mappingB.originalLine;
	  if (cmp !== 0) {
	    return cmp;
	  }

	  cmp = mappingA.originalColumn - mappingB.originalColumn;
	  if (cmp !== 0) {
	    return cmp;
	  }

	  return strcmp(mappingA.name, mappingB.name);
	}
	exports.compareByGeneratedPositionsInflated = compareByGeneratedPositionsInflated;


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */

	var util = __webpack_require__(27);
	var has = Object.prototype.hasOwnProperty;

	/**
	 * A data structure which is a combination of an array and a set. Adding a new
	 * member is O(1), testing for membership is O(1), and finding the index of an
	 * element is O(1). Removing elements from the set is not supported. Only
	 * strings are supported for membership.
	 */
	function ArraySet() {
	  this._array = [];
	  this._set = Object.create(null);
	}

	/**
	 * Static method for creating ArraySet instances from an existing array.
	 */
	ArraySet.fromArray = function ArraySet_fromArray(aArray, aAllowDuplicates) {
	  var set = new ArraySet();
	  for (var i = 0, len = aArray.length; i < len; i++) {
	    set.add(aArray[i], aAllowDuplicates);
	  }
	  return set;
	};

	/**
	 * Return how many unique items are in this ArraySet. If duplicates have been
	 * added, than those do not count towards the size.
	 *
	 * @returns Number
	 */
	ArraySet.prototype.size = function ArraySet_size() {
	  return Object.getOwnPropertyNames(this._set).length;
	};

	/**
	 * Add the given string to this set.
	 *
	 * @param String aStr
	 */
	ArraySet.prototype.add = function ArraySet_add(aStr, aAllowDuplicates) {
	  var sStr = util.toSetString(aStr);
	  var isDuplicate = has.call(this._set, sStr);
	  var idx = this._array.length;
	  if (!isDuplicate || aAllowDuplicates) {
	    this._array.push(aStr);
	  }
	  if (!isDuplicate) {
	    this._set[sStr] = idx;
	  }
	};

	/**
	 * Is the given string a member of this set?
	 *
	 * @param String aStr
	 */
	ArraySet.prototype.has = function ArraySet_has(aStr) {
	  var sStr = util.toSetString(aStr);
	  return has.call(this._set, sStr);
	};

	/**
	 * What is the index of the given string in the array?
	 *
	 * @param String aStr
	 */
	ArraySet.prototype.indexOf = function ArraySet_indexOf(aStr) {
	  var sStr = util.toSetString(aStr);
	  if (has.call(this._set, sStr)) {
	    return this._set[sStr];
	  }
	  throw new Error('"' + aStr + '" is not in the set.');
	};

	/**
	 * What is the element at the given index?
	 *
	 * @param Number aIdx
	 */
	ArraySet.prototype.at = function ArraySet_at(aIdx) {
	  if (aIdx >= 0 && aIdx < this._array.length) {
	    return this._array[aIdx];
	  }
	  throw new Error('No element indexed by ' + aIdx);
	};

	/**
	 * Returns the array representation of this set (which has the proper indices
	 * indicated by indexOf). Note that this is a copy of the internal array used
	 * for storing the members so that no one can mess with internal state.
	 */
	ArraySet.prototype.toArray = function ArraySet_toArray() {
	  return this._array.slice();
	};

	exports.ArraySet = ArraySet;


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	 * Copyright 2014 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */

	var util = __webpack_require__(27);

	/**
	 * Determine whether mappingB is after mappingA with respect to generated
	 * position.
	 */
	function generatedPositionAfter(mappingA, mappingB) {
	  // Optimized for most common case
	  var lineA = mappingA.generatedLine;
	  var lineB = mappingB.generatedLine;
	  var columnA = mappingA.generatedColumn;
	  var columnB = mappingB.generatedColumn;
	  return lineB > lineA || lineB == lineA && columnB >= columnA ||
	         util.compareByGeneratedPositionsInflated(mappingA, mappingB) <= 0;
	}

	/**
	 * A data structure to provide a sorted view of accumulated mappings in a
	 * performance conscious manner. It trades a neglibable overhead in general
	 * case for a large speedup in case of mappings being added in order.
	 */
	function MappingList() {
	  this._array = [];
	  this._sorted = true;
	  // Serves as infimum
	  this._last = {generatedLine: -1, generatedColumn: 0};
	}

	/**
	 * Iterate through internal items. This method takes the same arguments that
	 * `Array.prototype.forEach` takes.
	 *
	 * NOTE: The order of the mappings is NOT guaranteed.
	 */
	MappingList.prototype.unsortedForEach =
	  function MappingList_forEach(aCallback, aThisArg) {
	    this._array.forEach(aCallback, aThisArg);
	  };

	/**
	 * Add the given source mapping.
	 *
	 * @param Object aMapping
	 */
	MappingList.prototype.add = function MappingList_add(aMapping) {
	  if (generatedPositionAfter(this._last, aMapping)) {
	    this._last = aMapping;
	    this._array.push(aMapping);
	  } else {
	    this._sorted = false;
	    this._array.push(aMapping);
	  }
	};

	/**
	 * Returns the flat, sorted array of mappings. The mappings are sorted by
	 * generated position.
	 *
	 * WARNING: This method returns internal data without copying, for
	 * performance. The return value must NOT be mutated, and should be treated as
	 * an immutable borrow. If you want to take ownership, you must make your own
	 * copy.
	 */
	MappingList.prototype.toArray = function MappingList_toArray() {
	  if (!this._sorted) {
	    this._array.sort(util.compareByGeneratedPositionsInflated);
	    this._sorted = true;
	  }
	  return this._array;
	};

	exports.MappingList = MappingList;


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */

	var util = __webpack_require__(27);
	var binarySearch = __webpack_require__(31);
	var ArraySet = __webpack_require__(28).ArraySet;
	var base64VLQ = __webpack_require__(25);
	var quickSort = __webpack_require__(32).quickSort;

	function SourceMapConsumer(aSourceMap) {
	  var sourceMap = aSourceMap;
	  if (typeof aSourceMap === 'string') {
	    sourceMap = JSON.parse(aSourceMap.replace(/^\)\]\}'/, ''));
	  }

	  return sourceMap.sections != null
	    ? new IndexedSourceMapConsumer(sourceMap)
	    : new BasicSourceMapConsumer(sourceMap);
	}

	SourceMapConsumer.fromSourceMap = function(aSourceMap) {
	  return BasicSourceMapConsumer.fromSourceMap(aSourceMap);
	}

	/**
	 * The version of the source mapping spec that we are consuming.
	 */
	SourceMapConsumer.prototype._version = 3;

	// `__generatedMappings` and `__originalMappings` are arrays that hold the
	// parsed mapping coordinates from the source map's "mappings" attribute. They
	// are lazily instantiated, accessed via the `_generatedMappings` and
	// `_originalMappings` getters respectively, and we only parse the mappings
	// and create these arrays once queried for a source location. We jump through
	// these hoops because there can be many thousands of mappings, and parsing
	// them is expensive, so we only want to do it if we must.
	//
	// Each object in the arrays is of the form:
	//
	//     {
	//       generatedLine: The line number in the generated code,
	//       generatedColumn: The column number in the generated code,
	//       source: The path to the original source file that generated this
	//               chunk of code,
	//       originalLine: The line number in the original source that
	//                     corresponds to this chunk of generated code,
	//       originalColumn: The column number in the original source that
	//                       corresponds to this chunk of generated code,
	//       name: The name of the original symbol which generated this chunk of
	//             code.
	//     }
	//
	// All properties except for `generatedLine` and `generatedColumn` can be
	// `null`.
	//
	// `_generatedMappings` is ordered by the generated positions.
	//
	// `_originalMappings` is ordered by the original positions.

	SourceMapConsumer.prototype.__generatedMappings = null;
	Object.defineProperty(SourceMapConsumer.prototype, '_generatedMappings', {
	  get: function () {
	    if (!this.__generatedMappings) {
	      this._parseMappings(this._mappings, this.sourceRoot);
	    }

	    return this.__generatedMappings;
	  }
	});

	SourceMapConsumer.prototype.__originalMappings = null;
	Object.defineProperty(SourceMapConsumer.prototype, '_originalMappings', {
	  get: function () {
	    if (!this.__originalMappings) {
	      this._parseMappings(this._mappings, this.sourceRoot);
	    }

	    return this.__originalMappings;
	  }
	});

	SourceMapConsumer.prototype._charIsMappingSeparator =
	  function SourceMapConsumer_charIsMappingSeparator(aStr, index) {
	    var c = aStr.charAt(index);
	    return c === ";" || c === ",";
	  };

	/**
	 * Parse the mappings in a string in to a data structure which we can easily
	 * query (the ordered arrays in the `this.__generatedMappings` and
	 * `this.__originalMappings` properties).
	 */
	SourceMapConsumer.prototype._parseMappings =
	  function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
	    throw new Error("Subclasses must implement _parseMappings");
	  };

	SourceMapConsumer.GENERATED_ORDER = 1;
	SourceMapConsumer.ORIGINAL_ORDER = 2;

	SourceMapConsumer.GREATEST_LOWER_BOUND = 1;
	SourceMapConsumer.LEAST_UPPER_BOUND = 2;

	/**
	 * Iterate over each mapping between an original source/line/column and a
	 * generated line/column in this source map.
	 *
	 * @param Function aCallback
	 *        The function that is called with each mapping.
	 * @param Object aContext
	 *        Optional. If specified, this object will be the value of `this` every
	 *        time that `aCallback` is called.
	 * @param aOrder
	 *        Either `SourceMapConsumer.GENERATED_ORDER` or
	 *        `SourceMapConsumer.ORIGINAL_ORDER`. Specifies whether you want to
	 *        iterate over the mappings sorted by the generated file's line/column
	 *        order or the original's source/line/column order, respectively. Defaults to
	 *        `SourceMapConsumer.GENERATED_ORDER`.
	 */
	SourceMapConsumer.prototype.eachMapping =
	  function SourceMapConsumer_eachMapping(aCallback, aContext, aOrder) {
	    var context = aContext || null;
	    var order = aOrder || SourceMapConsumer.GENERATED_ORDER;

	    var mappings;
	    switch (order) {
	    case SourceMapConsumer.GENERATED_ORDER:
	      mappings = this._generatedMappings;
	      break;
	    case SourceMapConsumer.ORIGINAL_ORDER:
	      mappings = this._originalMappings;
	      break;
	    default:
	      throw new Error("Unknown order of iteration.");
	    }

	    var sourceRoot = this.sourceRoot;
	    mappings.map(function (mapping) {
	      var source = mapping.source === null ? null : this._sources.at(mapping.source);
	      if (source != null && sourceRoot != null) {
	        source = util.join(sourceRoot, source);
	      }
	      return {
	        source: source,
	        generatedLine: mapping.generatedLine,
	        generatedColumn: mapping.generatedColumn,
	        originalLine: mapping.originalLine,
	        originalColumn: mapping.originalColumn,
	        name: mapping.name === null ? null : this._names.at(mapping.name)
	      };
	    }, this).forEach(aCallback, context);
	  };

	/**
	 * Returns all generated line and column information for the original source,
	 * line, and column provided. If no column is provided, returns all mappings
	 * corresponding to a either the line we are searching for or the next
	 * closest line that has any mappings. Otherwise, returns all mappings
	 * corresponding to the given line and either the column we are searching for
	 * or the next closest column that has any offsets.
	 *
	 * The only argument is an object with the following properties:
	 *
	 *   - source: The filename of the original source.
	 *   - line: The line number in the original source.
	 *   - column: Optional. the column number in the original source.
	 *
	 * and an array of objects is returned, each with the following properties:
	 *
	 *   - line: The line number in the generated source, or null.
	 *   - column: The column number in the generated source, or null.
	 */
	SourceMapConsumer.prototype.allGeneratedPositionsFor =
	  function SourceMapConsumer_allGeneratedPositionsFor(aArgs) {
	    var line = util.getArg(aArgs, 'line');

	    // When there is no exact match, BasicSourceMapConsumer.prototype._findMapping
	    // returns the index of the closest mapping less than the needle. By
	    // setting needle.originalColumn to 0, we thus find the last mapping for
	    // the given line, provided such a mapping exists.
	    var needle = {
	      source: util.getArg(aArgs, 'source'),
	      originalLine: line,
	      originalColumn: util.getArg(aArgs, 'column', 0)
	    };

	    if (this.sourceRoot != null) {
	      needle.source = util.relative(this.sourceRoot, needle.source);
	    }
	    if (!this._sources.has(needle.source)) {
	      return [];
	    }
	    needle.source = this._sources.indexOf(needle.source);

	    var mappings = [];

	    var index = this._findMapping(needle,
	                                  this._originalMappings,
	                                  "originalLine",
	                                  "originalColumn",
	                                  util.compareByOriginalPositions,
	                                  binarySearch.LEAST_UPPER_BOUND);
	    if (index >= 0) {
	      var mapping = this._originalMappings[index];

	      if (aArgs.column === undefined) {
	        var originalLine = mapping.originalLine;

	        // Iterate until either we run out of mappings, or we run into
	        // a mapping for a different line than the one we found. Since
	        // mappings are sorted, this is guaranteed to find all mappings for
	        // the line we found.
	        while (mapping && mapping.originalLine === originalLine) {
	          mappings.push({
	            line: util.getArg(mapping, 'generatedLine', null),
	            column: util.getArg(mapping, 'generatedColumn', null),
	            lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
	          });

	          mapping = this._originalMappings[++index];
	        }
	      } else {
	        var originalColumn = mapping.originalColumn;

	        // Iterate until either we run out of mappings, or we run into
	        // a mapping for a different line than the one we were searching for.
	        // Since mappings are sorted, this is guaranteed to find all mappings for
	        // the line we are searching for.
	        while (mapping &&
	               mapping.originalLine === line &&
	               mapping.originalColumn == originalColumn) {
	          mappings.push({
	            line: util.getArg(mapping, 'generatedLine', null),
	            column: util.getArg(mapping, 'generatedColumn', null),
	            lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
	          });

	          mapping = this._originalMappings[++index];
	        }
	      }
	    }

	    return mappings;
	  };

	exports.SourceMapConsumer = SourceMapConsumer;

	/**
	 * A BasicSourceMapConsumer instance represents a parsed source map which we can
	 * query for information about the original file positions by giving it a file
	 * position in the generated source.
	 *
	 * The only parameter is the raw source map (either as a JSON string, or
	 * already parsed to an object). According to the spec, source maps have the
	 * following attributes:
	 *
	 *   - version: Which version of the source map spec this map is following.
	 *   - sources: An array of URLs to the original source files.
	 *   - names: An array of identifiers which can be referrenced by individual mappings.
	 *   - sourceRoot: Optional. The URL root from which all sources are relative.
	 *   - sourcesContent: Optional. An array of contents of the original source files.
	 *   - mappings: A string of base64 VLQs which contain the actual mappings.
	 *   - file: Optional. The generated file this source map is associated with.
	 *
	 * Here is an example source map, taken from the source map spec[0]:
	 *
	 *     {
	 *       version : 3,
	 *       file: "out.js",
	 *       sourceRoot : "",
	 *       sources: ["foo.js", "bar.js"],
	 *       names: ["src", "maps", "are", "fun"],
	 *       mappings: "AA,AB;;ABCDE;"
	 *     }
	 *
	 * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit?pli=1#
	 */
	function BasicSourceMapConsumer(aSourceMap) {
	  var sourceMap = aSourceMap;
	  if (typeof aSourceMap === 'string') {
	    sourceMap = JSON.parse(aSourceMap.replace(/^\)\]\}'/, ''));
	  }

	  var version = util.getArg(sourceMap, 'version');
	  var sources = util.getArg(sourceMap, 'sources');
	  // Sass 3.3 leaves out the 'names' array, so we deviate from the spec (which
	  // requires the array) to play nice here.
	  var names = util.getArg(sourceMap, 'names', []);
	  var sourceRoot = util.getArg(sourceMap, 'sourceRoot', null);
	  var sourcesContent = util.getArg(sourceMap, 'sourcesContent', null);
	  var mappings = util.getArg(sourceMap, 'mappings');
	  var file = util.getArg(sourceMap, 'file', null);

	  // Once again, Sass deviates from the spec and supplies the version as a
	  // string rather than a number, so we use loose equality checking here.
	  if (version != this._version) {
	    throw new Error('Unsupported version: ' + version);
	  }

	  sources = sources
	    .map(String)
	    // Some source maps produce relative source paths like "./foo.js" instead of
	    // "foo.js".  Normalize these first so that future comparisons will succeed.
	    // See bugzil.la/1090768.
	    .map(util.normalize)
	    // Always ensure that absolute sources are internally stored relative to
	    // the source root, if the source root is absolute. Not doing this would
	    // be particularly problematic when the source root is a prefix of the
	    // source (valid, but why??). See github issue #199 and bugzil.la/1188982.
	    .map(function (source) {
	      return sourceRoot && util.isAbsolute(sourceRoot) && util.isAbsolute(source)
	        ? util.relative(sourceRoot, source)
	        : source;
	    });

	  // Pass `true` below to allow duplicate names and sources. While source maps
	  // are intended to be compressed and deduplicated, the TypeScript compiler
	  // sometimes generates source maps with duplicates in them. See Github issue
	  // #72 and bugzil.la/889492.
	  this._names = ArraySet.fromArray(names.map(String), true);
	  this._sources = ArraySet.fromArray(sources, true);

	  this.sourceRoot = sourceRoot;
	  this.sourcesContent = sourcesContent;
	  this._mappings = mappings;
	  this.file = file;
	}

	BasicSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
	BasicSourceMapConsumer.prototype.consumer = SourceMapConsumer;

	/**
	 * Create a BasicSourceMapConsumer from a SourceMapGenerator.
	 *
	 * @param SourceMapGenerator aSourceMap
	 *        The source map that will be consumed.
	 * @returns BasicSourceMapConsumer
	 */
	BasicSourceMapConsumer.fromSourceMap =
	  function SourceMapConsumer_fromSourceMap(aSourceMap) {
	    var smc = Object.create(BasicSourceMapConsumer.prototype);

	    var names = smc._names = ArraySet.fromArray(aSourceMap._names.toArray(), true);
	    var sources = smc._sources = ArraySet.fromArray(aSourceMap._sources.toArray(), true);
	    smc.sourceRoot = aSourceMap._sourceRoot;
	    smc.sourcesContent = aSourceMap._generateSourcesContent(smc._sources.toArray(),
	                                                            smc.sourceRoot);
	    smc.file = aSourceMap._file;

	    // Because we are modifying the entries (by converting string sources and
	    // names to indices into the sources and names ArraySets), we have to make
	    // a copy of the entry or else bad things happen. Shared mutable state
	    // strikes again! See github issue #191.

	    var generatedMappings = aSourceMap._mappings.toArray().slice();
	    var destGeneratedMappings = smc.__generatedMappings = [];
	    var destOriginalMappings = smc.__originalMappings = [];

	    for (var i = 0, length = generatedMappings.length; i < length; i++) {
	      var srcMapping = generatedMappings[i];
	      var destMapping = new Mapping;
	      destMapping.generatedLine = srcMapping.generatedLine;
	      destMapping.generatedColumn = srcMapping.generatedColumn;

	      if (srcMapping.source) {
	        destMapping.source = sources.indexOf(srcMapping.source);
	        destMapping.originalLine = srcMapping.originalLine;
	        destMapping.originalColumn = srcMapping.originalColumn;

	        if (srcMapping.name) {
	          destMapping.name = names.indexOf(srcMapping.name);
	        }

	        destOriginalMappings.push(destMapping);
	      }

	      destGeneratedMappings.push(destMapping);
	    }

	    quickSort(smc.__originalMappings, util.compareByOriginalPositions);

	    return smc;
	  };

	/**
	 * The version of the source mapping spec that we are consuming.
	 */
	BasicSourceMapConsumer.prototype._version = 3;

	/**
	 * The list of original sources.
	 */
	Object.defineProperty(BasicSourceMapConsumer.prototype, 'sources', {
	  get: function () {
	    return this._sources.toArray().map(function (s) {
	      return this.sourceRoot != null ? util.join(this.sourceRoot, s) : s;
	    }, this);
	  }
	});

	/**
	 * Provide the JIT with a nice shape / hidden class.
	 */
	function Mapping() {
	  this.generatedLine = 0;
	  this.generatedColumn = 0;
	  this.source = null;
	  this.originalLine = null;
	  this.originalColumn = null;
	  this.name = null;
	}

	/**
	 * Parse the mappings in a string in to a data structure which we can easily
	 * query (the ordered arrays in the `this.__generatedMappings` and
	 * `this.__originalMappings` properties).
	 */
	BasicSourceMapConsumer.prototype._parseMappings =
	  function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
	    var generatedLine = 1;
	    var previousGeneratedColumn = 0;
	    var previousOriginalLine = 0;
	    var previousOriginalColumn = 0;
	    var previousSource = 0;
	    var previousName = 0;
	    var length = aStr.length;
	    var index = 0;
	    var cachedSegments = {};
	    var temp = {};
	    var originalMappings = [];
	    var generatedMappings = [];
	    var mapping, str, segment, end, value;

	    while (index < length) {
	      if (aStr.charAt(index) === ';') {
	        generatedLine++;
	        index++;
	        previousGeneratedColumn = 0;
	      }
	      else if (aStr.charAt(index) === ',') {
	        index++;
	      }
	      else {
	        mapping = new Mapping();
	        mapping.generatedLine = generatedLine;

	        // Because each offset is encoded relative to the previous one,
	        // many segments often have the same encoding. We can exploit this
	        // fact by caching the parsed variable length fields of each segment,
	        // allowing us to avoid a second parse if we encounter the same
	        // segment again.
	        for (end = index; end < length; end++) {
	          if (this._charIsMappingSeparator(aStr, end)) {
	            break;
	          }
	        }
	        str = aStr.slice(index, end);

	        segment = cachedSegments[str];
	        if (segment) {
	          index += str.length;
	        } else {
	          segment = [];
	          while (index < end) {
	            base64VLQ.decode(aStr, index, temp);
	            value = temp.value;
	            index = temp.rest;
	            segment.push(value);
	          }

	          if (segment.length === 2) {
	            throw new Error('Found a source, but no line and column');
	          }

	          if (segment.length === 3) {
	            throw new Error('Found a source and line, but no column');
	          }

	          cachedSegments[str] = segment;
	        }

	        // Generated column.
	        mapping.generatedColumn = previousGeneratedColumn + segment[0];
	        previousGeneratedColumn = mapping.generatedColumn;

	        if (segment.length > 1) {
	          // Original source.
	          mapping.source = previousSource + segment[1];
	          previousSource += segment[1];

	          // Original line.
	          mapping.originalLine = previousOriginalLine + segment[2];
	          previousOriginalLine = mapping.originalLine;
	          // Lines are stored 0-based
	          mapping.originalLine += 1;

	          // Original column.
	          mapping.originalColumn = previousOriginalColumn + segment[3];
	          previousOriginalColumn = mapping.originalColumn;

	          if (segment.length > 4) {
	            // Original name.
	            mapping.name = previousName + segment[4];
	            previousName += segment[4];
	          }
	        }

	        generatedMappings.push(mapping);
	        if (typeof mapping.originalLine === 'number') {
	          originalMappings.push(mapping);
	        }
	      }
	    }

	    quickSort(generatedMappings, util.compareByGeneratedPositionsDeflated);
	    this.__generatedMappings = generatedMappings;

	    quickSort(originalMappings, util.compareByOriginalPositions);
	    this.__originalMappings = originalMappings;
	  };

	/**
	 * Find the mapping that best matches the hypothetical "needle" mapping that
	 * we are searching for in the given "haystack" of mappings.
	 */
	BasicSourceMapConsumer.prototype._findMapping =
	  function SourceMapConsumer_findMapping(aNeedle, aMappings, aLineName,
	                                         aColumnName, aComparator, aBias) {
	    // To return the position we are searching for, we must first find the
	    // mapping for the given position and then return the opposite position it
	    // points to. Because the mappings are sorted, we can use binary search to
	    // find the best mapping.

	    if (aNeedle[aLineName] <= 0) {
	      throw new TypeError('Line must be greater than or equal to 1, got '
	                          + aNeedle[aLineName]);
	    }
	    if (aNeedle[aColumnName] < 0) {
	      throw new TypeError('Column must be greater than or equal to 0, got '
	                          + aNeedle[aColumnName]);
	    }

	    return binarySearch.search(aNeedle, aMappings, aComparator, aBias);
	  };

	/**
	 * Compute the last column for each generated mapping. The last column is
	 * inclusive.
	 */
	BasicSourceMapConsumer.prototype.computeColumnSpans =
	  function SourceMapConsumer_computeColumnSpans() {
	    for (var index = 0; index < this._generatedMappings.length; ++index) {
	      var mapping = this._generatedMappings[index];

	      // Mappings do not contain a field for the last generated columnt. We
	      // can come up with an optimistic estimate, however, by assuming that
	      // mappings are contiguous (i.e. given two consecutive mappings, the
	      // first mapping ends where the second one starts).
	      if (index + 1 < this._generatedMappings.length) {
	        var nextMapping = this._generatedMappings[index + 1];

	        if (mapping.generatedLine === nextMapping.generatedLine) {
	          mapping.lastGeneratedColumn = nextMapping.generatedColumn - 1;
	          continue;
	        }
	      }

	      // The last mapping for each line spans the entire line.
	      mapping.lastGeneratedColumn = Infinity;
	    }
	  };

	/**
	 * Returns the original source, line, and column information for the generated
	 * source's line and column positions provided. The only argument is an object
	 * with the following properties:
	 *
	 *   - line: The line number in the generated source.
	 *   - column: The column number in the generated source.
	 *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
	 *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
	 *     closest element that is smaller than or greater than the one we are
	 *     searching for, respectively, if the exact element cannot be found.
	 *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
	 *
	 * and an object is returned with the following properties:
	 *
	 *   - source: The original source file, or null.
	 *   - line: The line number in the original source, or null.
	 *   - column: The column number in the original source, or null.
	 *   - name: The original identifier, or null.
	 */
	BasicSourceMapConsumer.prototype.originalPositionFor =
	  function SourceMapConsumer_originalPositionFor(aArgs) {
	    var needle = {
	      generatedLine: util.getArg(aArgs, 'line'),
	      generatedColumn: util.getArg(aArgs, 'column')
	    };

	    var index = this._findMapping(
	      needle,
	      this._generatedMappings,
	      "generatedLine",
	      "generatedColumn",
	      util.compareByGeneratedPositionsDeflated,
	      util.getArg(aArgs, 'bias', SourceMapConsumer.GREATEST_LOWER_BOUND)
	    );

	    if (index >= 0) {
	      var mapping = this._generatedMappings[index];

	      if (mapping.generatedLine === needle.generatedLine) {
	        var source = util.getArg(mapping, 'source', null);
	        if (source !== null) {
	          source = this._sources.at(source);
	          if (this.sourceRoot != null) {
	            source = util.join(this.sourceRoot, source);
	          }
	        }
	        var name = util.getArg(mapping, 'name', null);
	        if (name !== null) {
	          name = this._names.at(name);
	        }
	        return {
	          source: source,
	          line: util.getArg(mapping, 'originalLine', null),
	          column: util.getArg(mapping, 'originalColumn', null),
	          name: name
	        };
	      }
	    }

	    return {
	      source: null,
	      line: null,
	      column: null,
	      name: null
	    };
	  };

	/**
	 * Return true if we have the source content for every source in the source
	 * map, false otherwise.
	 */
	BasicSourceMapConsumer.prototype.hasContentsOfAllSources =
	  function BasicSourceMapConsumer_hasContentsOfAllSources() {
	    if (!this.sourcesContent) {
	      return false;
	    }
	    return this.sourcesContent.length >= this._sources.size() &&
	      !this.sourcesContent.some(function (sc) { return sc == null; });
	  };

	/**
	 * Returns the original source content. The only argument is the url of the
	 * original source file. Returns null if no original source content is
	 * available.
	 */
	BasicSourceMapConsumer.prototype.sourceContentFor =
	  function SourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
	    if (!this.sourcesContent) {
	      return null;
	    }

	    if (this.sourceRoot != null) {
	      aSource = util.relative(this.sourceRoot, aSource);
	    }

	    if (this._sources.has(aSource)) {
	      return this.sourcesContent[this._sources.indexOf(aSource)];
	    }

	    var url;
	    if (this.sourceRoot != null
	        && (url = util.urlParse(this.sourceRoot))) {
	      // XXX: file:// URIs and absolute paths lead to unexpected behavior for
	      // many users. We can help them out when they expect file:// URIs to
	      // behave like it would if they were running a local HTTP server. See
	      // https://bugzilla.mozilla.org/show_bug.cgi?id=885597.
	      var fileUriAbsPath = aSource.replace(/^file:\/\//, "");
	      if (url.scheme == "file"
	          && this._sources.has(fileUriAbsPath)) {
	        return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)]
	      }

	      if ((!url.path || url.path == "/")
	          && this._sources.has("/" + aSource)) {
	        return this.sourcesContent[this._sources.indexOf("/" + aSource)];
	      }
	    }

	    // This function is used recursively from
	    // IndexedSourceMapConsumer.prototype.sourceContentFor. In that case, we
	    // don't want to throw if we can't find the source - we just want to
	    // return null, so we provide a flag to exit gracefully.
	    if (nullOnMissing) {
	      return null;
	    }
	    else {
	      throw new Error('"' + aSource + '" is not in the SourceMap.');
	    }
	  };

	/**
	 * Returns the generated line and column information for the original source,
	 * line, and column positions provided. The only argument is an object with
	 * the following properties:
	 *
	 *   - source: The filename of the original source.
	 *   - line: The line number in the original source.
	 *   - column: The column number in the original source.
	 *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
	 *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
	 *     closest element that is smaller than or greater than the one we are
	 *     searching for, respectively, if the exact element cannot be found.
	 *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
	 *
	 * and an object is returned with the following properties:
	 *
	 *   - line: The line number in the generated source, or null.
	 *   - column: The column number in the generated source, or null.
	 */
	BasicSourceMapConsumer.prototype.generatedPositionFor =
	  function SourceMapConsumer_generatedPositionFor(aArgs) {
	    var source = util.getArg(aArgs, 'source');
	    if (this.sourceRoot != null) {
	      source = util.relative(this.sourceRoot, source);
	    }
	    if (!this._sources.has(source)) {
	      return {
	        line: null,
	        column: null,
	        lastColumn: null
	      };
	    }
	    source = this._sources.indexOf(source);

	    var needle = {
	      source: source,
	      originalLine: util.getArg(aArgs, 'line'),
	      originalColumn: util.getArg(aArgs, 'column')
	    };

	    var index = this._findMapping(
	      needle,
	      this._originalMappings,
	      "originalLine",
	      "originalColumn",
	      util.compareByOriginalPositions,
	      util.getArg(aArgs, 'bias', SourceMapConsumer.GREATEST_LOWER_BOUND)
	    );

	    if (index >= 0) {
	      var mapping = this._originalMappings[index];

	      if (mapping.source === needle.source) {
	        return {
	          line: util.getArg(mapping, 'generatedLine', null),
	          column: util.getArg(mapping, 'generatedColumn', null),
	          lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
	        };
	      }
	    }

	    return {
	      line: null,
	      column: null,
	      lastColumn: null
	    };
	  };

	exports.BasicSourceMapConsumer = BasicSourceMapConsumer;

	/**
	 * An IndexedSourceMapConsumer instance represents a parsed source map which
	 * we can query for information. It differs from BasicSourceMapConsumer in
	 * that it takes "indexed" source maps (i.e. ones with a "sections" field) as
	 * input.
	 *
	 * The only parameter is a raw source map (either as a JSON string, or already
	 * parsed to an object). According to the spec for indexed source maps, they
	 * have the following attributes:
	 *
	 *   - version: Which version of the source map spec this map is following.
	 *   - file: Optional. The generated file this source map is associated with.
	 *   - sections: A list of section definitions.
	 *
	 * Each value under the "sections" field has two fields:
	 *   - offset: The offset into the original specified at which this section
	 *       begins to apply, defined as an object with a "line" and "column"
	 *       field.
	 *   - map: A source map definition. This source map could also be indexed,
	 *       but doesn't have to be.
	 *
	 * Instead of the "map" field, it's also possible to have a "url" field
	 * specifying a URL to retrieve a source map from, but that's currently
	 * unsupported.
	 *
	 * Here's an example source map, taken from the source map spec[0], but
	 * modified to omit a section which uses the "url" field.
	 *
	 *  {
	 *    version : 3,
	 *    file: "app.js",
	 *    sections: [{
	 *      offset: {line:100, column:10},
	 *      map: {
	 *        version : 3,
	 *        file: "section.js",
	 *        sources: ["foo.js", "bar.js"],
	 *        names: ["src", "maps", "are", "fun"],
	 *        mappings: "AAAA,E;;ABCDE;"
	 *      }
	 *    }],
	 *  }
	 *
	 * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit#heading=h.535es3xeprgt
	 */
	function IndexedSourceMapConsumer(aSourceMap) {
	  var sourceMap = aSourceMap;
	  if (typeof aSourceMap === 'string') {
	    sourceMap = JSON.parse(aSourceMap.replace(/^\)\]\}'/, ''));
	  }

	  var version = util.getArg(sourceMap, 'version');
	  var sections = util.getArg(sourceMap, 'sections');

	  if (version != this._version) {
	    throw new Error('Unsupported version: ' + version);
	  }

	  this._sources = new ArraySet();
	  this._names = new ArraySet();

	  var lastOffset = {
	    line: -1,
	    column: 0
	  };
	  this._sections = sections.map(function (s) {
	    if (s.url) {
	      // The url field will require support for asynchronicity.
	      // See https://github.com/mozilla/source-map/issues/16
	      throw new Error('Support for url field in sections not implemented.');
	    }
	    var offset = util.getArg(s, 'offset');
	    var offsetLine = util.getArg(offset, 'line');
	    var offsetColumn = util.getArg(offset, 'column');

	    if (offsetLine < lastOffset.line ||
	        (offsetLine === lastOffset.line && offsetColumn < lastOffset.column)) {
	      throw new Error('Section offsets must be ordered and non-overlapping.');
	    }
	    lastOffset = offset;

	    return {
	      generatedOffset: {
	        // The offset fields are 0-based, but we use 1-based indices when
	        // encoding/decoding from VLQ.
	        generatedLine: offsetLine + 1,
	        generatedColumn: offsetColumn + 1
	      },
	      consumer: new SourceMapConsumer(util.getArg(s, 'map'))
	    }
	  });
	}

	IndexedSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
	IndexedSourceMapConsumer.prototype.constructor = SourceMapConsumer;

	/**
	 * The version of the source mapping spec that we are consuming.
	 */
	IndexedSourceMapConsumer.prototype._version = 3;

	/**
	 * The list of original sources.
	 */
	Object.defineProperty(IndexedSourceMapConsumer.prototype, 'sources', {
	  get: function () {
	    var sources = [];
	    for (var i = 0; i < this._sections.length; i++) {
	      for (var j = 0; j < this._sections[i].consumer.sources.length; j++) {
	        sources.push(this._sections[i].consumer.sources[j]);
	      }
	    }
	    return sources;
	  }
	});

	/**
	 * Returns the original source, line, and column information for the generated
	 * source's line and column positions provided. The only argument is an object
	 * with the following properties:
	 *
	 *   - line: The line number in the generated source.
	 *   - column: The column number in the generated source.
	 *
	 * and an object is returned with the following properties:
	 *
	 *   - source: The original source file, or null.
	 *   - line: The line number in the original source, or null.
	 *   - column: The column number in the original source, or null.
	 *   - name: The original identifier, or null.
	 */
	IndexedSourceMapConsumer.prototype.originalPositionFor =
	  function IndexedSourceMapConsumer_originalPositionFor(aArgs) {
	    var needle = {
	      generatedLine: util.getArg(aArgs, 'line'),
	      generatedColumn: util.getArg(aArgs, 'column')
	    };

	    // Find the section containing the generated position we're trying to map
	    // to an original position.
	    var sectionIndex = binarySearch.search(needle, this._sections,
	      function(needle, section) {
	        var cmp = needle.generatedLine - section.generatedOffset.generatedLine;
	        if (cmp) {
	          return cmp;
	        }

	        return (needle.generatedColumn -
	                section.generatedOffset.generatedColumn);
	      });
	    var section = this._sections[sectionIndex];

	    if (!section) {
	      return {
	        source: null,
	        line: null,
	        column: null,
	        name: null
	      };
	    }

	    return section.consumer.originalPositionFor({
	      line: needle.generatedLine -
	        (section.generatedOffset.generatedLine - 1),
	      column: needle.generatedColumn -
	        (section.generatedOffset.generatedLine === needle.generatedLine
	         ? section.generatedOffset.generatedColumn - 1
	         : 0),
	      bias: aArgs.bias
	    });
	  };

	/**
	 * Return true if we have the source content for every source in the source
	 * map, false otherwise.
	 */
	IndexedSourceMapConsumer.prototype.hasContentsOfAllSources =
	  function IndexedSourceMapConsumer_hasContentsOfAllSources() {
	    return this._sections.every(function (s) {
	      return s.consumer.hasContentsOfAllSources();
	    });
	  };

	/**
	 * Returns the original source content. The only argument is the url of the
	 * original source file. Returns null if no original source content is
	 * available.
	 */
	IndexedSourceMapConsumer.prototype.sourceContentFor =
	  function IndexedSourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
	    for (var i = 0; i < this._sections.length; i++) {
	      var section = this._sections[i];

	      var content = section.consumer.sourceContentFor(aSource, true);
	      if (content) {
	        return content;
	      }
	    }
	    if (nullOnMissing) {
	      return null;
	    }
	    else {
	      throw new Error('"' + aSource + '" is not in the SourceMap.');
	    }
	  };

	/**
	 * Returns the generated line and column information for the original source,
	 * line, and column positions provided. The only argument is an object with
	 * the following properties:
	 *
	 *   - source: The filename of the original source.
	 *   - line: The line number in the original source.
	 *   - column: The column number in the original source.
	 *
	 * and an object is returned with the following properties:
	 *
	 *   - line: The line number in the generated source, or null.
	 *   - column: The column number in the generated source, or null.
	 */
	IndexedSourceMapConsumer.prototype.generatedPositionFor =
	  function IndexedSourceMapConsumer_generatedPositionFor(aArgs) {
	    for (var i = 0; i < this._sections.length; i++) {
	      var section = this._sections[i];

	      // Only consider this section if the requested source is in the list of
	      // sources of the consumer.
	      if (section.consumer.sources.indexOf(util.getArg(aArgs, 'source')) === -1) {
	        continue;
	      }
	      var generatedPosition = section.consumer.generatedPositionFor(aArgs);
	      if (generatedPosition) {
	        var ret = {
	          line: generatedPosition.line +
	            (section.generatedOffset.generatedLine - 1),
	          column: generatedPosition.column +
	            (section.generatedOffset.generatedLine === generatedPosition.line
	             ? section.generatedOffset.generatedColumn - 1
	             : 0)
	        };
	        return ret;
	      }
	    }

	    return {
	      line: null,
	      column: null
	    };
	  };

	/**
	 * Parse the mappings in a string in to a data structure which we can easily
	 * query (the ordered arrays in the `this.__generatedMappings` and
	 * `this.__originalMappings` properties).
	 */
	IndexedSourceMapConsumer.prototype._parseMappings =
	  function IndexedSourceMapConsumer_parseMappings(aStr, aSourceRoot) {
	    this.__generatedMappings = [];
	    this.__originalMappings = [];
	    for (var i = 0; i < this._sections.length; i++) {
	      var section = this._sections[i];
	      var sectionMappings = section.consumer._generatedMappings;
	      for (var j = 0; j < sectionMappings.length; j++) {
	        var mapping = sectionMappings[j];

	        var source = section.consumer._sources.at(mapping.source);
	        if (section.consumer.sourceRoot !== null) {
	          source = util.join(section.consumer.sourceRoot, source);
	        }
	        this._sources.add(source);
	        source = this._sources.indexOf(source);

	        var name = section.consumer._names.at(mapping.name);
	        this._names.add(name);
	        name = this._names.indexOf(name);

	        // The mappings coming from the consumer for the section have
	        // generated positions relative to the start of the section, so we
	        // need to offset them to be relative to the start of the concatenated
	        // generated file.
	        var adjustedMapping = {
	          source: source,
	          generatedLine: mapping.generatedLine +
	            (section.generatedOffset.generatedLine - 1),
	          generatedColumn: mapping.generatedColumn +
	            (section.generatedOffset.generatedLine === mapping.generatedLine
	            ? section.generatedOffset.generatedColumn - 1
	            : 0),
	          originalLine: mapping.originalLine,
	          originalColumn: mapping.originalColumn,
	          name: name
	        };

	        this.__generatedMappings.push(adjustedMapping);
	        if (typeof adjustedMapping.originalLine === 'number') {
	          this.__originalMappings.push(adjustedMapping);
	        }
	      }
	    }

	    quickSort(this.__generatedMappings, util.compareByGeneratedPositionsDeflated);
	    quickSort(this.__originalMappings, util.compareByOriginalPositions);
	  };

	exports.IndexedSourceMapConsumer = IndexedSourceMapConsumer;


/***/ },
/* 31 */
/***/ function(module, exports) {

	/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */

	exports.GREATEST_LOWER_BOUND = 1;
	exports.LEAST_UPPER_BOUND = 2;

	/**
	 * Recursive implementation of binary search.
	 *
	 * @param aLow Indices here and lower do not contain the needle.
	 * @param aHigh Indices here and higher do not contain the needle.
	 * @param aNeedle The element being searched for.
	 * @param aHaystack The non-empty array being searched.
	 * @param aCompare Function which takes two elements and returns -1, 0, or 1.
	 * @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
	 *     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
	 *     closest element that is smaller than or greater than the one we are
	 *     searching for, respectively, if the exact element cannot be found.
	 */
	function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare, aBias) {
	  // This function terminates when one of the following is true:
	  //
	  //   1. We find the exact element we are looking for.
	  //
	  //   2. We did not find the exact element, but we can return the index of
	  //      the next-closest element.
	  //
	  //   3. We did not find the exact element, and there is no next-closest
	  //      element than the one we are searching for, so we return -1.
	  var mid = Math.floor((aHigh - aLow) / 2) + aLow;
	  var cmp = aCompare(aNeedle, aHaystack[mid], true);
	  if (cmp === 0) {
	    // Found the element we are looking for.
	    return mid;
	  }
	  else if (cmp > 0) {
	    // Our needle is greater than aHaystack[mid].
	    if (aHigh - mid > 1) {
	      // The element is in the upper half.
	      return recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare, aBias);
	    }

	    // The exact needle element was not found in this haystack. Determine if
	    // we are in termination case (3) or (2) and return the appropriate thing.
	    if (aBias == exports.LEAST_UPPER_BOUND) {
	      return aHigh < aHaystack.length ? aHigh : -1;
	    } else {
	      return mid;
	    }
	  }
	  else {
	    // Our needle is less than aHaystack[mid].
	    if (mid - aLow > 1) {
	      // The element is in the lower half.
	      return recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare, aBias);
	    }

	    // we are in termination case (3) or (2) and return the appropriate thing.
	    if (aBias == exports.LEAST_UPPER_BOUND) {
	      return mid;
	    } else {
	      return aLow < 0 ? -1 : aLow;
	    }
	  }
	}

	/**
	 * This is an implementation of binary search which will always try and return
	 * the index of the closest element if there is no exact hit. This is because
	 * mappings between original and generated line/col pairs are single points,
	 * and there is an implicit region between each of them, so a miss just means
	 * that you aren't on the very start of a region.
	 *
	 * @param aNeedle The element you are looking for.
	 * @param aHaystack The array that is being searched.
	 * @param aCompare A function which takes the needle and an element in the
	 *     array and returns -1, 0, or 1 depending on whether the needle is less
	 *     than, equal to, or greater than the element, respectively.
	 * @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
	 *     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
	 *     closest element that is smaller than or greater than the one we are
	 *     searching for, respectively, if the exact element cannot be found.
	 *     Defaults to 'binarySearch.GREATEST_LOWER_BOUND'.
	 */
	exports.search = function search(aNeedle, aHaystack, aCompare, aBias) {
	  if (aHaystack.length === 0) {
	    return -1;
	  }

	  var index = recursiveSearch(-1, aHaystack.length, aNeedle, aHaystack,
	                              aCompare, aBias || exports.GREATEST_LOWER_BOUND);
	  if (index < 0) {
	    return -1;
	  }

	  // We have found either the exact element, or the next-closest element than
	  // the one we are searching for. However, there may be more than one such
	  // element. Make sure we always return the smallest of these.
	  while (index - 1 >= 0) {
	    if (aCompare(aHaystack[index], aHaystack[index - 1], true) !== 0) {
	      break;
	    }
	    --index;
	  }

	  return index;
	};


/***/ },
/* 32 */
/***/ function(module, exports) {

	/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */

	// It turns out that some (most?) JavaScript engines don't self-host
	// `Array.prototype.sort`. This makes sense because C++ will likely remain
	// faster than JS when doing raw CPU-intensive sorting. However, when using a
	// custom comparator function, calling back and forth between the VM's C++ and
	// JIT'd JS is rather slow *and* loses JIT type information, resulting in
	// worse generated code for the comparator function than would be optimal. In
	// fact, when sorting with a comparator, these costs outweigh the benefits of
	// sorting in C++. By using our own JS-implemented Quick Sort (below), we get
	// a ~3500ms mean speed-up in `bench/bench.html`.

	/**
	 * Swap the elements indexed by `x` and `y` in the array `ary`.
	 *
	 * @param {Array} ary
	 *        The array.
	 * @param {Number} x
	 *        The index of the first item.
	 * @param {Number} y
	 *        The index of the second item.
	 */
	function swap(ary, x, y) {
	  var temp = ary[x];
	  ary[x] = ary[y];
	  ary[y] = temp;
	}

	/**
	 * Returns a random integer within the range `low .. high` inclusive.
	 *
	 * @param {Number} low
	 *        The lower bound on the range.
	 * @param {Number} high
	 *        The upper bound on the range.
	 */
	function randomIntInRange(low, high) {
	  return Math.round(low + (Math.random() * (high - low)));
	}

	/**
	 * The Quick Sort algorithm.
	 *
	 * @param {Array} ary
	 *        An array to sort.
	 * @param {function} comparator
	 *        Function to use to compare two items.
	 * @param {Number} p
	 *        Start index of the array
	 * @param {Number} r
	 *        End index of the array
	 */
	function doQuickSort(ary, comparator, p, r) {
	  // If our lower bound is less than our upper bound, we (1) partition the
	  // array into two pieces and (2) recurse on each half. If it is not, this is
	  // the empty array and our base case.

	  if (p < r) {
	    // (1) Partitioning.
	    //
	    // The partitioning chooses a pivot between `p` and `r` and moves all
	    // elements that are less than or equal to the pivot to the before it, and
	    // all the elements that are greater than it after it. The effect is that
	    // once partition is done, the pivot is in the exact place it will be when
	    // the array is put in sorted order, and it will not need to be moved
	    // again. This runs in O(n) time.

	    // Always choose a random pivot so that an input array which is reverse
	    // sorted does not cause O(n^2) running time.
	    var pivotIndex = randomIntInRange(p, r);
	    var i = p - 1;

	    swap(ary, pivotIndex, r);
	    var pivot = ary[r];

	    // Immediately after `j` is incremented in this loop, the following hold
	    // true:
	    //
	    //   * Every element in `ary[p .. i]` is less than or equal to the pivot.
	    //
	    //   * Every element in `ary[i+1 .. j-1]` is greater than the pivot.
	    for (var j = p; j < r; j++) {
	      if (comparator(ary[j], pivot) <= 0) {
	        i += 1;
	        swap(ary, i, j);
	      }
	    }

	    swap(ary, i + 1, j);
	    var q = i + 1;

	    // (2) Recurse on each half.

	    doQuickSort(ary, comparator, p, q - 1);
	    doQuickSort(ary, comparator, q + 1, r);
	  }
	}

	/**
	 * Sort the given array in-place with the given comparator function.
	 *
	 * @param {Array} ary
	 *        An array to sort.
	 * @param {function} comparator
	 *        Function to use to compare two items.
	 */
	exports.quickSort = function (ary, comparator) {
	  doQuickSort(ary, comparator, 0, ary.length - 1);
	};


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */

	var SourceMapGenerator = __webpack_require__(24).SourceMapGenerator;
	var util = __webpack_require__(27);

	// Matches a Windows-style `\r\n` newline or a `\n` newline used by all other
	// operating systems these days (capturing the result).
	var REGEX_NEWLINE = /(\r?\n)/;

	// Newline character code for charCodeAt() comparisons
	var NEWLINE_CODE = 10;

	// Private symbol for identifying `SourceNode`s when multiple versions of
	// the source-map library are loaded. This MUST NOT CHANGE across
	// versions!
	var isSourceNode = "$$$isSourceNode$$$";

	/**
	 * SourceNodes provide a way to abstract over interpolating/concatenating
	 * snippets of generated JavaScript source code while maintaining the line and
	 * column information associated with the original source code.
	 *
	 * @param aLine The original line number.
	 * @param aColumn The original column number.
	 * @param aSource The original source's filename.
	 * @param aChunks Optional. An array of strings which are snippets of
	 *        generated JS, or other SourceNodes.
	 * @param aName The original identifier.
	 */
	function SourceNode(aLine, aColumn, aSource, aChunks, aName) {
	  this.children = [];
	  this.sourceContents = {};
	  this.line = aLine == null ? null : aLine;
	  this.column = aColumn == null ? null : aColumn;
	  this.source = aSource == null ? null : aSource;
	  this.name = aName == null ? null : aName;
	  this[isSourceNode] = true;
	  if (aChunks != null) this.add(aChunks);
	}

	/**
	 * Creates a SourceNode from generated code and a SourceMapConsumer.
	 *
	 * @param aGeneratedCode The generated code
	 * @param aSourceMapConsumer The SourceMap for the generated code
	 * @param aRelativePath Optional. The path that relative sources in the
	 *        SourceMapConsumer should be relative to.
	 */
	SourceNode.fromStringWithSourceMap =
	  function SourceNode_fromStringWithSourceMap(aGeneratedCode, aSourceMapConsumer, aRelativePath) {
	    // The SourceNode we want to fill with the generated code
	    // and the SourceMap
	    var node = new SourceNode();

	    // All even indices of this array are one line of the generated code,
	    // while all odd indices are the newlines between two adjacent lines
	    // (since `REGEX_NEWLINE` captures its match).
	    // Processed fragments are removed from this array, by calling `shiftNextLine`.
	    var remainingLines = aGeneratedCode.split(REGEX_NEWLINE);
	    var shiftNextLine = function() {
	      var lineContents = remainingLines.shift();
	      // The last line of a file might not have a newline.
	      var newLine = remainingLines.shift() || "";
	      return lineContents + newLine;
	    };

	    // We need to remember the position of "remainingLines"
	    var lastGeneratedLine = 1, lastGeneratedColumn = 0;

	    // The generate SourceNodes we need a code range.
	    // To extract it current and last mapping is used.
	    // Here we store the last mapping.
	    var lastMapping = null;

	    aSourceMapConsumer.eachMapping(function (mapping) {
	      if (lastMapping !== null) {
	        // We add the code from "lastMapping" to "mapping":
	        // First check if there is a new line in between.
	        if (lastGeneratedLine < mapping.generatedLine) {
	          // Associate first line with "lastMapping"
	          addMappingWithCode(lastMapping, shiftNextLine());
	          lastGeneratedLine++;
	          lastGeneratedColumn = 0;
	          // The remaining code is added without mapping
	        } else {
	          // There is no new line in between.
	          // Associate the code between "lastGeneratedColumn" and
	          // "mapping.generatedColumn" with "lastMapping"
	          var nextLine = remainingLines[0];
	          var code = nextLine.substr(0, mapping.generatedColumn -
	                                        lastGeneratedColumn);
	          remainingLines[0] = nextLine.substr(mapping.generatedColumn -
	                                              lastGeneratedColumn);
	          lastGeneratedColumn = mapping.generatedColumn;
	          addMappingWithCode(lastMapping, code);
	          // No more remaining code, continue
	          lastMapping = mapping;
	          return;
	        }
	      }
	      // We add the generated code until the first mapping
	      // to the SourceNode without any mapping.
	      // Each line is added as separate string.
	      while (lastGeneratedLine < mapping.generatedLine) {
	        node.add(shiftNextLine());
	        lastGeneratedLine++;
	      }
	      if (lastGeneratedColumn < mapping.generatedColumn) {
	        var nextLine = remainingLines[0];
	        node.add(nextLine.substr(0, mapping.generatedColumn));
	        remainingLines[0] = nextLine.substr(mapping.generatedColumn);
	        lastGeneratedColumn = mapping.generatedColumn;
	      }
	      lastMapping = mapping;
	    }, this);
	    // We have processed all mappings.
	    if (remainingLines.length > 0) {
	      if (lastMapping) {
	        // Associate the remaining code in the current line with "lastMapping"
	        addMappingWithCode(lastMapping, shiftNextLine());
	      }
	      // and add the remaining lines without any mapping
	      node.add(remainingLines.join(""));
	    }

	    // Copy sourcesContent into SourceNode
	    aSourceMapConsumer.sources.forEach(function (sourceFile) {
	      var content = aSourceMapConsumer.sourceContentFor(sourceFile);
	      if (content != null) {
	        if (aRelativePath != null) {
	          sourceFile = util.join(aRelativePath, sourceFile);
	        }
	        node.setSourceContent(sourceFile, content);
	      }
	    });

	    return node;

	    function addMappingWithCode(mapping, code) {
	      if (mapping === null || mapping.source === undefined) {
	        node.add(code);
	      } else {
	        var source = aRelativePath
	          ? util.join(aRelativePath, mapping.source)
	          : mapping.source;
	        node.add(new SourceNode(mapping.originalLine,
	                                mapping.originalColumn,
	                                source,
	                                code,
	                                mapping.name));
	      }
	    }
	  };

	/**
	 * Add a chunk of generated JS to this source node.
	 *
	 * @param aChunk A string snippet of generated JS code, another instance of
	 *        SourceNode, or an array where each member is one of those things.
	 */
	SourceNode.prototype.add = function SourceNode_add(aChunk) {
	  if (Array.isArray(aChunk)) {
	    aChunk.forEach(function (chunk) {
	      this.add(chunk);
	    }, this);
	  }
	  else if (aChunk[isSourceNode] || typeof aChunk === "string") {
	    if (aChunk) {
	      this.children.push(aChunk);
	    }
	  }
	  else {
	    throw new TypeError(
	      "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
	    );
	  }
	  return this;
	};

	/**
	 * Add a chunk of generated JS to the beginning of this source node.
	 *
	 * @param aChunk A string snippet of generated JS code, another instance of
	 *        SourceNode, or an array where each member is one of those things.
	 */
	SourceNode.prototype.prepend = function SourceNode_prepend(aChunk) {
	  if (Array.isArray(aChunk)) {
	    for (var i = aChunk.length-1; i >= 0; i--) {
	      this.prepend(aChunk[i]);
	    }
	  }
	  else if (aChunk[isSourceNode] || typeof aChunk === "string") {
	    this.children.unshift(aChunk);
	  }
	  else {
	    throw new TypeError(
	      "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
	    );
	  }
	  return this;
	};

	/**
	 * Walk over the tree of JS snippets in this node and its children. The
	 * walking function is called once for each snippet of JS and is passed that
	 * snippet and the its original associated source's line/column location.
	 *
	 * @param aFn The traversal function.
	 */
	SourceNode.prototype.walk = function SourceNode_walk(aFn) {
	  var chunk;
	  for (var i = 0, len = this.children.length; i < len; i++) {
	    chunk = this.children[i];
	    if (chunk[isSourceNode]) {
	      chunk.walk(aFn);
	    }
	    else {
	      if (chunk !== '') {
	        aFn(chunk, { source: this.source,
	                     line: this.line,
	                     column: this.column,
	                     name: this.name });
	      }
	    }
	  }
	};

	/**
	 * Like `String.prototype.join` except for SourceNodes. Inserts `aStr` between
	 * each of `this.children`.
	 *
	 * @param aSep The separator.
	 */
	SourceNode.prototype.join = function SourceNode_join(aSep) {
	  var newChildren;
	  var i;
	  var len = this.children.length;
	  if (len > 0) {
	    newChildren = [];
	    for (i = 0; i < len-1; i++) {
	      newChildren.push(this.children[i]);
	      newChildren.push(aSep);
	    }
	    newChildren.push(this.children[i]);
	    this.children = newChildren;
	  }
	  return this;
	};

	/**
	 * Call String.prototype.replace on the very right-most source snippet. Useful
	 * for trimming whitespace from the end of a source node, etc.
	 *
	 * @param aPattern The pattern to replace.
	 * @param aReplacement The thing to replace the pattern with.
	 */
	SourceNode.prototype.replaceRight = function SourceNode_replaceRight(aPattern, aReplacement) {
	  var lastChild = this.children[this.children.length - 1];
	  if (lastChild[isSourceNode]) {
	    lastChild.replaceRight(aPattern, aReplacement);
	  }
	  else if (typeof lastChild === 'string') {
	    this.children[this.children.length - 1] = lastChild.replace(aPattern, aReplacement);
	  }
	  else {
	    this.children.push(''.replace(aPattern, aReplacement));
	  }
	  return this;
	};

	/**
	 * Set the source content for a source file. This will be added to the SourceMapGenerator
	 * in the sourcesContent field.
	 *
	 * @param aSourceFile The filename of the source file
	 * @param aSourceContent The content of the source file
	 */
	SourceNode.prototype.setSourceContent =
	  function SourceNode_setSourceContent(aSourceFile, aSourceContent) {
	    this.sourceContents[util.toSetString(aSourceFile)] = aSourceContent;
	  };

	/**
	 * Walk over the tree of SourceNodes. The walking function is called for each
	 * source file content and is passed the filename and source content.
	 *
	 * @param aFn The traversal function.
	 */
	SourceNode.prototype.walkSourceContents =
	  function SourceNode_walkSourceContents(aFn) {
	    for (var i = 0, len = this.children.length; i < len; i++) {
	      if (this.children[i][isSourceNode]) {
	        this.children[i].walkSourceContents(aFn);
	      }
	    }

	    var sources = Object.keys(this.sourceContents);
	    for (var i = 0, len = sources.length; i < len; i++) {
	      aFn(util.fromSetString(sources[i]), this.sourceContents[sources[i]]);
	    }
	  };

	/**
	 * Return the string representation of this source node. Walks over the tree
	 * and concatenates all the various snippets together to one string.
	 */
	SourceNode.prototype.toString = function SourceNode_toString() {
	  var str = "";
	  this.walk(function (chunk) {
	    str += chunk;
	  });
	  return str;
	};

	/**
	 * Returns the string representation of this source node along with a source
	 * map.
	 */
	SourceNode.prototype.toStringWithSourceMap = function SourceNode_toStringWithSourceMap(aArgs) {
	  var generated = {
	    code: "",
	    line: 1,
	    column: 0
	  };
	  var map = new SourceMapGenerator(aArgs);
	  var sourceMappingActive = false;
	  var lastOriginalSource = null;
	  var lastOriginalLine = null;
	  var lastOriginalColumn = null;
	  var lastOriginalName = null;
	  this.walk(function (chunk, original) {
	    generated.code += chunk;
	    if (original.source !== null
	        && original.line !== null
	        && original.column !== null) {
	      if(lastOriginalSource !== original.source
	         || lastOriginalLine !== original.line
	         || lastOriginalColumn !== original.column
	         || lastOriginalName !== original.name) {
	        map.addMapping({
	          source: original.source,
	          original: {
	            line: original.line,
	            column: original.column
	          },
	          generated: {
	            line: generated.line,
	            column: generated.column
	          },
	          name: original.name
	        });
	      }
	      lastOriginalSource = original.source;
	      lastOriginalLine = original.line;
	      lastOriginalColumn = original.column;
	      lastOriginalName = original.name;
	      sourceMappingActive = true;
	    } else if (sourceMappingActive) {
	      map.addMapping({
	        generated: {
	          line: generated.line,
	          column: generated.column
	        }
	      });
	      lastOriginalSource = null;
	      sourceMappingActive = false;
	    }
	    for (var idx = 0, length = chunk.length; idx < length; idx++) {
	      if (chunk.charCodeAt(idx) === NEWLINE_CODE) {
	        generated.line++;
	        generated.column = 0;
	        // Mappings end at eol
	        if (idx + 1 === length) {
	          lastOriginalSource = null;
	          sourceMappingActive = false;
	        } else if (sourceMappingActive) {
	          map.addMapping({
	            source: original.source,
	            original: {
	              line: original.line,
	              column: original.column
	            },
	            generated: {
	              line: generated.line,
	              column: generated.column
	            },
	            name: original.name
	          });
	        }
	      } else {
	        generated.column++;
	      }
	    }
	  });
	  this.walkSourceContents(function (sourceFile, sourceContent) {
	    map.setSourceContent(sourceFile, sourceContent);
	  });

	  return { code: generated.code, map: map };
	};

	exports.SourceNode = SourceNode;


/***/ }
/******/ ]);