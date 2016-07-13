(function () {
    // https://github.com/yanatan16/nanoajax
    var nanoajax = {};
    !function(e,t){function n(e){return e&&t.XDomainRequest&&!/MSIE 1/.test(navigator.userAgent)?new XDomainRequest:t.XMLHttpRequest?new XMLHttpRequest:void 0}function o(e,t,n){e[t]=e[t]||n}var r=["responseType","withCredentials","timeout","onprogress"];e.ajax=function(e,t){function u(e,n){return function(){d||t(c.status||e,c.response||c.responseText||n,c),d=!0}}var a=e.headers||{},s=e.body,i=e.method||(s?"POST":"GET"),d=!1,c=n(e.cors);c.open(i,e.url,!0);var l=c.onload=u(200);c.onreadystatechange=function(){4===c.readyState&&l()},c.onerror=u(null,"Error"),c.ontimeout=u(null,"Timeout"),c.onabort=u(null,"Abort"),s&&(o(a,"X-Requested-With","XMLHttpRequest"),o(a,"Content-Type","application/x-www-form-urlencoded"));for(var p,f=0,v=r.length;v>f;f++)p=r[f],void 0!==e[p]&&(c[p]=e[p]);for(var p in a)c.setRequestHeader(p,a[p]);return c.send(s),c}}(nanoajax,function(){return this}());

    var common = (function() {
        return {
            addEvent: function (element, eventName, fn) {
                if (element.addEventListener) {
                    element.addEventListener(eventName, fn, false);
                }
                else if (element.attachEvent) {
                    element.attachEvent('on' + eventName, fn);
                }
            },
            getRequestId: function() {
                return document.getElementById('__glimpse_browser_agent').getAttribute('data-request-id');
            },
            getMessageIngressUrl: function() {
                return document.getElementById('__glimpse_browser_agent').getAttribute('data-message-ingress-template');
            },
            getGuid: function() {
                return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                });
            }
        };
    })();
    var publishMessage = (function() {
        var build = function(type, payload) {
            var message = {
                id: common.getGuid(),
                types: [type],
                payload: payload,
                context: {
                    id: common.getRequestId(),
                    type: 'Request'
                }
            };
            message.payload = JSON.stringify(message);

            return message;
        };
        var publish = function(message) {
            // TODO: should probably thow exception if getMessageIngressUrl isn't set
            nanoajax.ajax({ url: common.getMessageIngressUrl(), method: 'POST', body: JSON.stringify([ message ]) }, function (code, responseText, request) {
                // not doing anything atm
            });
        };

        return function(type, payload) {
            var message = build(type, payload);

            publish(message);
        };
    })();
    var processor = (function() {
        var _strategies = [];

        return {
            register: function(strategy) {
                _strategies.push(strategy);
            },
            execute: function() {
                for (var i = 0; i < _strategies.length; i++) {
                    _strategies[i]();
                }
            }
        };
    })();

    (function() {
        var getTiming = function() {
            var performance = window.performance || window.webkitPerformance || window.msPerformance || window.mozPerformance;
            if (performance == null) {
                return;
            }
            return performance.timing;
        }
        var processTimings = function(timing) {
            var api = {};
            if (timing) {
                // bring across intersting data
                for (var k in timing) {
                    if (typeof timing[k] !== "function") {
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
                        api.firstPaintTime = firstPaint - (window.chrome.loadTimes().startLoadTime * 1000);
                    }
                    // IE
                    else if (typeof window.performance.timing.msFirstPaint === 'number') {
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
        common.addEvent(window, 'load', function() {
            setTimeout(function() { 
                publishMessage('browser-navigation-timing', processTimings(getTiming()));
            }, 0);
        });
    })();

    processor.execute();
})();