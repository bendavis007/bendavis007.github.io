(function () {
    if ( typeof window.CustomEvent === "function" ) return false;
    function CustomEvent ( event, params ) {
        params = params || { bubbles: false, cancelable: false, detail: undefined };
        var evt = document.createEvent( 'CustomEvent' );
        evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
        return evt;
    }
    CustomEvent.prototype = window.Event.prototype;
    window.CustomEvent = CustomEvent;
})();
(function (_w, _s) {

    var document = _w.document,
        app = {},
        previewApp = {},
        startTimeMS = 0,
        _logMessage = function (m) {
            if (!app.logging)
                return;
            if (app.timing) {
                if (startTimeMS == 0)
                    startTimeMS = (new Date()).getTime();
                var t = (new Date()).getTime();
                m = '[AdButler] ' + m + ' (' + (t - startTimeMS) + ' ms)';
            }
            else
                m = '[AdButler] ' + m;
            _w.console && _w.console.log && _w.console.log(m);
        };

    app = {
        ads: [],
        pixels: {},
        pixelsXhr: {},
        requests: {},
        domains: {},
        clickHandlers: {},

        protocol: 'http:',
        pageKey: false,

        logging: false,
        timing: false,

        // states
        initialized: false,
        viewability:{},

        sourceURL: false,

        isLazyLoading: false,

        lazyLoad: {
            eventsAttached: false,
            eventActive: false,
            queue: [],
            config: null,
            defaultConfig: {
                fetchViewportPercent: 400,
                renderViewportPercent: 100,
                mobileScaling: 1
            },
        },

        delayedLoadMaxAttempts: 50,
        delayedLoadAttemptCount: {},

        delayedInsert: {
            fastPollLimit: 20,
            midPollLimit: 30,
            pollLimit: 50,
            domCheckCount: {},
        },

        betaAccounts:[172084, 173448, 108508, 173345, 175092, 167283, 169430],
        beta: {
            xhrload: [142519, 1641280],
        },

        useAltVers: [178157, 178840, 164128],
        usePostLoadFn: [178157, 178840, 164128],
        kwInject: [178157, 178840, 164128, 107899],
        altVers: 'www3',

        tcf : {
            hasCMP: false,
            version: 1,
            consentDataLoaded: false,
            consentString: null,
            gdprApplies: false,
        },

        init: function () {
            app.initialized = true;

            app.logging = app.isBoolean(_w.AdButlerAppLogging) ? _w.AdButlerAppLogging : app.logging;

            _logMessage('app.init()');

            app.protocol = (document.location.protocol === 'http:' ? 'http:' : 'https:');
            app.sourceURL = app.getReferrer();

            app.ads = app.ads ? app.ads : [];

            app.initRND();

            app.viewability = new Viewability();
            app.viewability.initializeViewability();

            var tmp = app.ads;
            app.ads = [];
            app.ads.push = app.registerByPush;
            if (tmp && tmp.length > 0) {
                for (var i = 0; i < tmp.length; i++)
                    app.registerByPush(tmp[i]);
            }

            document.dispatchEvent(new CustomEvent('AdButler_Loaded'));
        },

        calcNFramesDeep: function() {
            var depth = 0, currentWindow = _w.self;
            while (currentWindow !== _w.top) {
                currentWindow = currentWindow.parent;
                depth++;
                if (depth >= 2) {
                    return depth;
                }
            }
            return depth;
        },

        getReferrer: function() {
            var depth = app.calcNFramesDeep();
            if (depth === 0) {
                _logMessage("Referrer: depth 0: " + document.location.href);
                return document.location.href;
            } else if (depth === 1) {
                _logMessage("Referrer: depth 1: " + document.referrer);
                return document.referrer;
            } else if (document.location.hasOwnProperty('ancestorOrigins') && document.location.ancestorOrigins.length > 0) {
                _logMessage("Referrer: depth greater than 1: " + document.location.ancestorOrigins[document.location.ancestorOrigins.length - 1]);
                return document.location.ancestorOrigins[document.location.ancestorOrigins.length - 1];
            }
            return false;
        },

        _addEventListener: function (el, evt, func) {
            if ('addEventListener' in _w) {
                el.addEventListener(evt, func, false);
            } else if ('attachEvent' in _w) { //IE
                el.attachEvent('on' + evt, func);
            }
        },

        removeEventListener: function (el, evt, func) {
            _logMessage("app.removeEventListener()");

            if ('removeEventListener' in _w) {
                el.removeEventListener(evt, func, false);
            }
        },

        insertScriptBefore: function(beforeEl, src, async, loadFn) {
            var s = document.createElement('script');
            s.async = !!async;
            s.type = 'text/javascript';
            s.src = src;

            if (app.isFunction(loadFn)) {
                app._addEventListener(s, 'load', loadFn);
            }

            beforeEl.parentElement.insertBefore(s, beforeEl);
        },

        insertHeadScript: function (src, async, loadFn) {
            var s = document.createElement('script');
            s.async = !!async;
            s.type = 'text/javascript';
            s.src = src;

            if (app.isFunction(loadFn)) {
                app._addEventListener(s, 'load', loadFn);
            }

            document.head.appendChild(s);
        },

        registerByPush: function (request) {
            if (typeof request === 'function') {
                return request();
            }
            return request.handler.call(null, request.opt);
        },

        register: function (account, zone, size, div, opt) {
            _logMessage('app.register(' + account + ', ' + zone + ', ' + size.join('x') + ', ' + div + ')');

            var request = {core: {}, redirect: {}, opt: {adserveVersion: 'adserve'}, customParams: {}, custom:{}, dataKeys:null, eventLogData:{}};
            request.core = {
                ID: account,
                size: size.join('x'),
                setID: zone,
                type: 'async',
                domid: div,
                place: opt.place,
                pid: opt.pageKey ? opt.pageKey : app.pageKey,
                sw: (_s.width ? _s.width : 0),
                sh: _s.height ? _s.height : 0,
                spr: _w.devicePixelRatio ? _w.devicePixelRatio : 1,
                rnd: opt.rnd ? opt.rnd : app.rnd
            };

            // conditional core options
            if (opt.keywords && opt.keywords.length)
                request.core.kw = encodeURIComponent(opt.keywords);
            if (opt.extraData && opt.extraData.length)
                request.core.extra = encodeURIComponent(opt.extraData);
            if (opt.rcb)
                request.core.rcb = opt.rcb;

            if (previewApp.enabled) {
                request.core[previewApp.LIVE_WEBSITE_PREVIEW_PARAM] = previewApp.config;
            }

            if(opt.customParams && opt.customParams instanceof Object){
                request.customParams = opt.customParams;
            }

            // custom
            if (typeof(opt.custom) == 'object') {
                for (var key in opt.custom) {
                    request.custom[key] = opt.custom[key];
                }
            }

            // redirect handling
            if (opt.clickURL && opt.clickURL.length)
                request.redirect.clickURL = opt.clickURL;
            if (opt.click && opt.click.length)
                request.redirect.click = opt.click;

            if (opt.adserveVersion) {
                request.opt.adserveVersion = opt.adserveVersion;
            } else if (app.useAltVers.indexOf(account) !== -1) {
                request.opt.adserveVersion = app.altVers;
            }

            if (app.kwInject.indexOf(account) !== -1) {
                var kw = app.extractKwVar();
                if (kw.length > 0) {
                    if (request.core.kw && request.core.kw.length > 0) {
                        request.core.kw += "," + kw;
                    } else {
                        request.core.kw = kw;
                    }
                }
            }

            if (opt.dataKeys) {
                request.dataKeys = opt.dataKeys;
            }

            if(opt.eventLogData) {
                request.eventLogData = opt.eventLogData;
            }

            app.setAccountDomain(account, opt.domain);
            app.setRequestMeta(request);


            if (app.betaAccounts.indexOf(account) !== -1) {
                app.handlePreload(opt, function () {
                    app.handleLoad(request, opt);
                });

            } else {
                app.handleLoad(request, opt);
            }
        },

        handleLoad: function(request, opt) {
            if (app.isLazyLoading) {
                if ("complete" === document.readyState) {
                    if (app.lazyLoadElementLoadEligible(request)) {
                        app.addToLazyLoadQueue(request, opt);
                    } else {
                        app.load(opt.domain, request);
                    }

                } else {
                    app.addToLazyLoadQueue(request, opt);
                    app.attachLazyLoadingEvents();
                }

            } else {
                app.load(opt.domain, request);
            }
        },

        addEventListener: function (event, handler, options) {
            _w.addEventListener(event, handler, options);
        },

        initRND: function () {
            if (window.rnd) {
                app.pageKey = app.rnd = window.rnd;
            }
            else {
                app.pageKey = app.rnd = window.rnd = app.randomNumber();
            }
        },

        load: function (domain, request) {
            var src = [app.protocol + '//' + domain + '/' + request.opt.adserveVersion + '/'],
                key, el;

            var cmpDelay = app.tcf.hasCMP && !app.tcf.consentDataLoaded;

            //
            for (key in request.core) {
                src.push(key + '=' + request.core[key]);
            }
            //
            for (key in request.custom) {
                src.push(key + '=' + request.custom[key]);
            }
            //
            if (app.adButlerUID) {
                src.push('gcid=' + app.adButlerUID);
            }

            if (app.tcf.consentString !== null) {
                src.push('gdpr_consent_string=' + encodeURIComponent(app.tcf.consentString));
            }
            if (app.tcf.hasCMP) {
                if(app.tcf.gdprApplies){
                    src.push("gdpr_applies=1");
                } else {
                    src.push("gdpr_applies=0");
                }
            }

            // Data Keys as JSON
            if (request.dataKeys !== null) {
                src.push("_abdk_json=" + encodeURIComponent(JSON.stringify(request.dataKeys)));
            }

            var eventLogData = Object.keys(request.eventLogData);
            for (var index in eventLogData){
                if(eventLogData.hasOwnProperty(index)){
                    src.push("_eld[" + eventLogData[index] + "]=" + request.eventLogData[eventLogData[index]]);
                }
            }

            //
            for(var i = 0; i < 5; i++){
                if(i in request.customParams){
                    key = i+1;
                    src.push("customParam" + key + "=" + request.customParams[i]);
                }
            }
            //
            if (false !== app.sourceURL && app.sourceURL.length > 0) {
                _logMessage("Referrer: push onto src: " + app.sourceURL);
                src.push('referrer=' + encodeURIComponent(app.sourceURL));
            }
            //
            for (key in request.redirect) {
                var v = request.redirect[key];
                if (v.indexOf('%%') !== -1) {
                    v = v.split("%%").join("%25%25");
                }
                src.push(key + '=' + v);
            }

            el = document.getElementById(request.core.domid);

            if (app.beta.xhrload.indexOf(request.core.ID) !== -1) {
                app.dispatchAdButlerEvent(el, app.EVENTS.REQUEST, request);

                var xhr = new XMLHttpRequest();
                xhr.open("GET", src.join(';'), true);
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
                            if (null === el) {
                                app.delayInsert(request, xhr.responseText);
                            } else {
                                var s = document.createElement('script');
                                s.type = 'text/javascript';
                                s.text = xhr.responseText;
                                el.parentElement.insertBefore(s, el);
                            }
                        }
                    }
                };
                xhr.send(null);

            } else {
                if (null === el || cmpDelay) {
                    app.delayedLoad(domain, request);

                } else {
                    if (!app.delayedLoadAttemptCount.hasOwnProperty(request.core.domid)) {
                        _logMessage('app.load() --> ' + request.core.domid + ' [' + request.core.size + ']');
                    } else {
                        _logMessage('app.delayedLoad() --> ' + request.core.domid + ' [' + request.core.size + ']');
                    }

                    app.dispatchAdButlerEvent(el, app.EVENTS.REQUEST, request);
                    // app.insertScriptBefore(el, src.join(';'), true);
                    var loadFn = null;
                    if (app.usePostLoadFn.indexOf(request.core.ID) !== -1
                        && typeof _w.$ === 'function'
                        && typeof COSTCO === 'object'
                        && typeof COSTCO.whiteList === 'object'
                        && typeof COSTCO.whiteList.bind_external === 'function') {
                        loadFn = function() {
                            $('#' + request.core.domid)
                                .find('a.adbutler-costco-external-link')
                                .click(COSTCO.whiteList.bind_external);
                        };
                    }
                    app.insertScriptBefore(el, src.join(';'), true, loadFn);
                }
            }
        },

        delayedLoad: function(domain, request) {
            if (!app.delayedLoadAttemptCount.hasOwnProperty(request.core.domid)) {
                app.delayedLoadAttemptCount[request.core.domid] = 0;
            }

            if (app.delayedLoadAttemptCount[request.core.domid] > app.delayedLoadMaxAttempts) {
                //_logMessage('app.delayedLoad(): Delaying load for ' + request.core.domid + ' (count=' + app.delayedLoadAttemptCount[request.core.domid] + ') --> Suspending load.');
                return;
            }

            var timeout = app.delayedLoadAttemptCount[request.core.domid] < 20 ? 50 : 1000;
            //_logMessage('app.delayedLoad(): Delaying load for ' + request.core.domid + ' (count=' + app.delayedLoadAttemptCount[request.core.domid] + ', timeout=' + timeout + ')');

            setTimeout(function() {
                app.delayedLoadAttemptCount[request.core.domid]++;
                app.load(domain, request);
            }, timeout);
        },

        delayInsert: function(request, responseText) {
            if (!app.delayedInsert.domCheckCount.hasOwnProperty(request.core.domid)) {
                _logMessage('app.delayInsert(): Delayed insert for ' + request.core.domid + ' initiated.');
                app.delayedInsert.domCheckCount[request.core.domid] = 0;
            }

            if (app.delayedInsert.domCheckCount[request.core.domid] > app.delayedInsert.pollLimit) {
                _logMessage('app.delayInsert(): Delayed insert for ' + request.core.domid + ' (count=' + app.delayedInsert.domCheckCount[request.core.domid] + ') --> Suspending load.');
                return;
            }

            if (app.delayedInsert.midPollLimit === app.delayedInsert.domCheckCount[request.core.domid]) {
                _logMessage('app.delayInsert(): Delayed insert for ' + request.core.domid + ' reached fast checking cutoff, continuing with longer polling.');
            }

            var timeout = app.delayInsertTimeout(app.delayedInsert.domCheckCount[request.core.domid]);
            setTimeout(function() {
                var el = document.getElementById(request.core.domid);
                if (null === el) {
                    app.delayedInsert.domCheckCount[request.core.domid]++;
                    app.delayInsert(request, responseText);
                } else {
                    _logMessage('app.delayInsert(): Injecting delayed ad ' + request.core.domid + ' [' + request.core.size + ']');
                    var s = document.createElement('script');
                    s.type = 'text/javascript';
                    s.text = responseText;
                    el.parentElement.insertBefore(s, el);
                }
            }, timeout);
        },

        delayInsertTimeout: function(count) {
            if (count < app.delayedInsert.fastPollLimit) {
                return 25;
            } else if (count < app.delayedInsert.midPollLimit) {
                return 50;
            } else {
                return 1000;
            }
        },

        enableLazyLoading: function(opt) {
            app.isLazyLoading = true;
            if (null === app.lazyLoad.config) {
                _logMessage('app.enableLazyLoading(): Enabled lazy loading with new config.');
            } else {
                _logMessage('app.enableLazyLoading(): Overwriting lazy loading config.');
            }


            app.lazyLoad.config = {};

            if ("object" === typeof opt) {
                if ("number" === typeof opt.fetchViewportPercent
                    && (opt.fetchViewportPercent >= 0 || opt.fetchViewportPercent === -1)) {
                    app.lazyLoad.config.fetchViewportPercent = opt.fetchViewportPercent;
                }

                if ("number" === typeof opt.renderViewportPercent && opt.renderViewportPercent >= 100) {
                    app.lazyLoad.config.renderViewportPercent = opt.renderViewportPercent;
                }

                if ("number" === typeof opt.mobileScaling && opt.mobileScaling >= 1) {
                    app.lazyLoad.config.mobileScaling = opt.mobileScaling;
                }

            } else {
                for (var key in app.lazyLoad.defaultConfig) {
                    app.lazyLoad.config[key] = app.lazyLoad.defaultConfig[key];
                }
            }
        },

        lazyLoadElementLoadEligible: function(request) {
            var el = document.getElementById(request.core.domid);
            if (null === el) {
                return false;
            }
            var nViewports = (app.lazyLoad.config.renderViewportPercent / 100) * app.lazyLoad.config.mobileScaling,
                screenBounds = {x: _w.screenX, y: _w.screenY, h: _w.innerHeight},
                elementBounds = el.getBoundingClientRect();
            return (screenBounds.y + (screenBounds.h * nViewports)) > elementBounds.top;
        },

        addToLazyLoadQueue: function(request, opt) {
            _logMessage('app.addToLazyLoadQueue() --> Added element to lazy load queue: ' + request.core.domid);
            app.lazyLoad.queue.push({
                request: request,
                opt: opt
            });
        },

        attachLazyLoadingEvents: function() {
            if (app.lazyLoad.eventsAttached) {
                return;
            }
            app.lazyLoad.eventsAttached = true;

            _logMessage('app.attachLazyLoadingEvents() --> Attaching events for lazy loading.');

            if ("complete" !== document.readyState) {
                _w.addEventListener('load', app.lazyLoadOnloadEvent);
            }

            _w.addEventListener('scroll', app.lazyLoadScrollEvent);
        },

        lazyLoadOnloadEvent: function() {
            if (app.lazyLoad.eventActive === true) {
                return;
            }

            app.lazyLoad.eventActive = true;
            app.processLazyLoadQueue();
            app.lazyLoad.eventActive = false;
        },

        lazyLoadScrollEvent: function() {
            if (app.lazyLoad.eventActive === true) {
                return;
            }

            app.lazyLoad.eventActive = true;
            app.processLazyLoadQueue();
            app.lazyLoad.eventActive = false;
        },

        processLazyLoadQueue: function() {
            app.lazyLoad.queue = app.lazyLoad.queue.filter(function(item) {
                if (app.lazyLoadElementLoadEligible(item.request)) {
                    app.load(item.opt.domain, item.request);
                    return false;
                }
                return true;
            });

            if (app.lazyLoad.queue.length === 0) {
                _logMessage("app.processLazyLoadQueue() --> Lazy load queue depleted, detaching event.");
                _w.removeEventListener('scroll', app.lazyLoadScrollEvent);
                app.lazyLoad.eventsAttached = false;
            }
        },

        enableConsentManagement: function () {
            _logMessage("enableConsentManagement()");

            var cmpFrame = app.getCMPFrame();

            if (!app.tcf.hasCMP) {
                return;
            }
            if (_w !== window.top) {
                app.initCMPMessagePassing(cmpFrame);
            }

            if(app.tcf.version === 2){
                __tcfapi("getTCData", 2, app.handleCMPGetConsentDataVersion2);
            } else {
                __cmp("getConsentData", null, app.handleCMPGetConsentData);
            }
        },

        getCMPFrame: function () {
            var f = window;
            var cmpFrame;
            while (!cmpFrame) {
                try {
                    if (f.frames["__cmpLocator"]) {
                        cmpFrame = f;
                        app.tcf.version = 1;
                    } else if(f.frames["__tcfapiLocator"]){
                        cmpFrame = f;
                        app.tcf.version = 2;
                    }
                } catch (e) {
                }
                if (f === window.top || cmpFrame) {
                    break;
                }
                f = f.parent;
            }

            if (cmpFrame) {
                app.tcf.hasCMP = true;
                _logMessage("Detected CMP on page.");
            } else {
                _logMessage("No CMP detected.");
            }
            return cmpFrame;
        },

        initCMPMessagePassing: function(cmpFrame) {
            var cmpCallbacks = {}
            var cmpPostMessage;

            if(app.tcf.version === 2){
                cmpPostMessage = function (cmd, version, callback, arg) {
                    if (!cmpFrame) {
                        callback({ msg: "CMP not found" }, false);
                        return;
                    }
                    var callId = Math.random() + "";
                    var msg = {
                        __tcfapiCall: {
                            command: cmd,
                            parameter: arg,
                            version: version,
                            callId: callId,
                        }
                    };
                    cmpCallbacks[callId] = callback;
                    cmpFrame.postMessage(msg, '*');
                };
                window.__tcfapi = cmpPostMessage;
            } else {
                cmpPostMessage = function (cmd, arg, callback) {
                    if (!cmpFrame) {
                        callback({ msg: "CMP not found" }, false);
                        return;

                    }
                    var callId = Math.random() + "";
                    var msg = {
                        __cmpCall: {
                            command: cmd,
                            parameter: arg,
                            callId: callId
                        }
                    };
                    cmpCallbacks[callId] = callback;
                    cmpFrame.postMessage(msg, '*');
                };
                window.__cmp = cmpPostMessage;
            }

            window.addEventListener("message", function (event) {
                var json;
                var payload;
                if(typeof event.data === "string"){
                    try {
                        json = JSON.parse(event.data);
                    } catch (e){
                        return;
                    }
                } else {
                    json = event.data;
                }
                if (json.__cmpReturn) {
                    payload = json.__cmpReturn;
                    cmpCallbacks[payload.callId](payload.returnValue, payload.success);
                    delete cmpCallbacks[payload.callId];
                }
                if(json.__tcfapiReturn){
                    payload = json.__tcfapiReturn;
                    cmpCallbacks[payload.callId](payload.returnValue, payload.success);
                    delete cmpCallbacks[payload.callId];
                }

            }, false);
        },

        handleCMPGetConsentData: function (consentData, success) {
            if (success === true) {
                app.tcf.consentString = consentData.consentData;
                app.tcf.gdprApplies = consentData.gdprApplies;
            } else {
                if (consentData.hasOwnProperty('msg')) {
                    _logMessage(consentData.msg);
                }
            }
            app.tcf.consentDataLoaded = true;
        },

        handleCMPGetConsentDataVersion2: function (consentData, success) {
            if(success === true){
                app.tcf.gdprApplies = consentData.gdprApplies;
                app.tcf.consentString = consentData.tcString;
            } else {
                if (consentData.hasOwnProperty('msg')) {
                    _logMessage(consentData.msg);
                }
            }
            app.tcf.consentDataLoaded = true;
        },

        placePlainMarkup: function (div, html) {
            _logMessage('app.placePlainHTML(' + div + ', *html)');

            var contentDiv = document.getElementById(div);

            app.requests[div].refreshQueued = false;

            if ((typeof(contentDiv) != 'undefined') && (contentDiv !== null)) {
                app.dispatchAdButlerEvent(contentDiv, app.EVENTS.RESPONSE, app.requests[div], true);
                contentDiv.innerHTML = html;

                var imageDiv = contentDiv.querySelector('img');
                if (imageDiv) {
                    if (imageDiv.complete) {
                        app.dispatchAdButlerEvent(contentDiv, app.EVENTS.LOAD, app.requests[div]);
                    } else {
                        imageDiv.addEventListener('load', function() {
                            app.dispatchAdButlerEvent(contentDiv, app.EVENTS.LOAD, app.requests[div]);
                        });
                    }
                }
            }

            app.placeRegisteredPixels(div);
        },

        placeIframeMarkup: function (zone, place, size, div, html, opts, viewabilitySettings) {
            _logMessage('app.placeIframeHTML(' + zone + ', ' + place + ', ' + size.join('x') + ', ' + div + ', *html)');

            var contentDiv = document.getElementById(div),
                width = size.length === 2 ? size[0] : 0,
                height = size.length === 2 ? size[1] : 0;

            if(contentDiv === null){
                _logMessage("Unable to place markup. Content div not found.");
                return;
            }

            app.requests[div].refreshQueued = false;

            app.dispatchAdButlerEvent(contentDiv, app.EVENTS.RESPONSE, app.requests[div], true);

            contentDiv.innerHTML = '';

            var contentDocument, wrapperFrame;
            wrapperFrame = document.createElement("iframe");
            wrapperFrame.id = 'placement_' + zone + '_' + place + '_iframe';
            wrapperFrame.frameBorder = 0;
            wrapperFrame.scrolling = "no";
            wrapperFrame.noresize = "noresize";
            wrapperFrame.marginheight = 0;
            wrapperFrame.marginwidth = 0;
            wrapperFrame.height = height;
            wrapperFrame.width = width;

            contentDiv.appendChild(wrapperFrame);

            if (viewabilitySettings) {
                document.getElementById(wrapperFrame.id).setAttribute('eligible-callback', viewabilitySettings.eligibleURL);
                document.getElementById(wrapperFrame.id).setAttribute('viewable-callback', viewabilitySettings.viewableURL);
                app.viewability.addViewableEntity(wrapperFrame.id, viewabilitySettings.options);
            }

            app._addEventListener(wrapperFrame, 'load', function _func() {
                app.handleIframeHTMLOnLoad(div, zone, place);
                app.removeEventListener(wrapperFrame, "load", _func);
            });

            html = "<!DOCTYPE HTML><html><head><style>html,body{padding:0;margin:0;}</style></head><body>" + html + "</body></html>";
            if (/msie/.test(navigator.userAgent.toLowerCase()) || _w.opera) {
                wrapperFrame.contentWindow.contents = html;
                return wrapperFrame.src = "javascript:window[\"contents\"]";
            } else {
                contentDocument = wrapperFrame.contentDocument;
                contentDocument.open();
                contentDocument.write(html);
                contentDocument.close();
                return wrapperFrame;
            }
        },

        handleIframeHTMLOnLoad: function (div, zone, place) {
            _logMessage('app.handleIframeHTMLOnLoad(' + div + ', ' + zone + ', ' + place + ')');

            var ifrm = document.getElementById('placement_' + zone + '_' + place + '_iframe');
            if (ifrm !== null && ifrm.readyState !== "complete" && app.isString(ifrm.readyState)) {
                return setTimeout((function () {
                    return app.handleIframeHTMLOnLoad(div, zone, place);
                }), 50);
            }
            else {
                var el = document.getElementById(div);

                app.placeRegisteredPixels(div);
                app.dispatchAdButlerEvent(el, app.EVENTS.LOAD, app.requests[div]);
            }
        },

        servePlainMarkup: function(div, ad) {
            _logMessage('app.servePlainMarkup(' + div + ', *html)');

            var contentDiv = document.getElementById(div);
            if (typeof(contentDiv) != 'undefined')
                contentDiv.innerHTML = ad.markup;

            app.placeRegisteredPixels(div);
        },

        serveIframeByMarkup: function(div, ad, viewabilitySettings) {
            _logMessage('app.serveFramedMarkup(' + ad.zone + ', ' + ad.place + ', ' + ad.size.join('x') + ', ' + div + ', *html)');
            var contentDiv = document.getElementById(div),
                frameID = 'placement_' + ad.zone + '_' + ad.place + '_iframe',
                width = ad.size.length === 2 ? ad.size[0] : 0,
                height = ad.size.length === 2 ? ad.size[1] : 0,
                contentDocument, wrapperFrame,
                markup, i;

            if(contentDiv === null){
                _logMessage("Unable to serve markup. Content div not found.");
                return;
            }

            app.requests[div].refreshQueued = false;

            app.dispatchAdButlerEvent(contentDiv, app.EVENTS.RESPONSE, app.requests[div], true);

            contentDiv.innerHTML = '';

            wrapperFrame = document.createElement("iframe");
            wrapperFrame.id = frameID;
            wrapperFrame.frameBorder = 0;
            wrapperFrame.scrolling = "no";
            wrapperFrame.noresize = "noresize";
            wrapperFrame.marginheight = 0;
            wrapperFrame.marginwidth = 0;
            wrapperFrame.height = height;
            wrapperFrame.width = width;

            //
            contentDiv.appendChild(wrapperFrame);

            if (viewabilitySettings) {
                document.getElementById(wrapperFrame.id).setAttribute('eligible-callback', viewabilitySettings.eligibleURL);
                document.getElementById(wrapperFrame.id).setAttribute('viewable-callback', viewabilitySettings.viewableURL);
                app.viewability.addViewableEntity(wrapperFrame.id, viewabilitySettings.options);
            }

            //
            app._addEventListener(wrapperFrame, 'load', function() {
                return app.processFrameOnLoad(div, frameID, ad);
            });

            //
            app.processAdScripts(div, frameID, ad);

            //
            markup = "<!DOCTYPE HTML><html><head><style>html,body{padding:0;margin:0;}</style></head><body>" + ad.markup + "</body></html>";
            if (/msie/.test(navigator.userAgent.toLowerCase()) || _w.opera) {
                wrapperFrame.contentWindow.contents = markup;
                return wrapperFrame.src = "javascript:window[\"contents\"]";
            } else {
                contentDocument = wrapperFrame.contentDocument;
                contentDocument.open();
                contentDocument.write(markup);
                contentDocument.close();
                return wrapperFrame;
            }
        },

        serveIframeByURL: function(div, ad, viewabilitySettings) {
            _logMessage('app.serveFramedMarkup(' + ad.zone + ', ' + ad.place + ', ' + ad.size.join('x') + ', ' + div + ', *url)');
            var contentDiv = document.getElementById(div),
                frameID = 'placement_' + ad.zone + '_' + ad.place + '_iframe',
                width = ad.size.length === 2 ? ad.size[0] : 0,
                height = ad.size.length === 2 ? ad.size[1] : 0,
                wrapperFrame;

            if(contentDiv === null){
                _logMessage("Unable to serve markup. Content div not found.");
                return;
            }

            app.requests[div].refreshQueued = false;

            app.dispatchAdButlerEvent(contentDiv, app.EVENTS.RESPONSE, app.requests[div], true);

            contentDiv.innerHTML = '';

            wrapperFrame = document.createElement("iframe");
            wrapperFrame.id = frameID;
            wrapperFrame.frameBorder = 0;
            wrapperFrame.scrolling = "no";
            wrapperFrame.noresize = "noresize";
            wrapperFrame.marginheight = 0;
            wrapperFrame.marginwidth = 0;
            wrapperFrame.height = height;
            wrapperFrame.width = width;

            //
            contentDiv.appendChild(wrapperFrame);

            if (viewabilitySettings) {
                document.getElementById(wrapperFrame.id).setAttribute('eligible-callback', viewabilitySettings.eligibleURL);
                document.getElementById(wrapperFrame.id).setAttribute('viewable-callback', viewabilitySettings.viewableURL);
                app.viewability.addViewableEntity(wrapperFrame.id, viewabilitySettings.options);
            }
            //
            app._addEventListener(wrapperFrame, 'load', function() {
                return app.processFrameOnLoad(div, frameID, ad);
            });

            //
            app.processAdScripts(div, frameID, ad);

            // begin
            wrapperFrame.src = ad.src;

            return wrapperFrame;
        },

        processAdScripts: function(div, frameID, ad) {
            var contentDiv = document.getElementById(div),
                i, mediaScript, loadFn;

            // media scripts?
            if ( !(app.isArray(ad.scripts) && ad.scripts.length > 0) ) {
                return;
            }

            for (i = 0; i < ad.scripts.length; i++) {
                loadFn = null;
                mediaScript = ad.scripts[i];
                // if a loader is present
                if (app.isFunction(mediaScript.loadFn)) {
                    loadFn = function(){
                        mediaScript.loadFn(div, frameID, ad);
                    };
                }
                app.insertScriptBefore(contentDiv, mediaScript.src, true, loadFn);
            }
        },

        processFrameOnLoad: function(div, frameID, ad) {
            _logMessage('app.processFrameOnLoad(' + div + ', ' + ad.zone + ', ' + ad.place + ')');

            var ifrm = document.getElementById(frameID);
            if (ifrm !== null && ifrm.readyState !== "complete" && app.isString(ifrm.readyState)) {
                return setTimeout((function () {
                    return app.processFrameOnLoad(div, frameID, ad);
                }), 50);
            }
            else {
                var el = document.getElementById(div);
                app.placeRegisteredPixels(div);
                app.dispatchAdButlerEvent(el, app.EVENTS.LOAD, app.requests[div]);
            }
        },

        queuePlacementRefresh: function (div, rct, delay) {
            _logMessage('app.queuePlacementRefresh(' + div + ', ' + rct + ', ' + delay + ')');
            var request = app.getRequestMeta(div),
                domain = app.getAccountDomain(request.core.ID);

            request.core.rct = rct;
            request.refreshQueued = true;

            setTimeout(function () {
                app.load(domain, request);
            }, delay);
        },

        triggerZoneReload: function(div) {
            _logMessage('app.triggerZoneReload(' + div + ')');
            var request = app.getRequestMeta(div),
                domain = app.getAccountDomain(request.core.ID);

            request.core.rct++;

            app.load(domain, request);
        },

        randomNumber: function () {
            return Math.floor(Math.random() * 10e6);
        },

        getZoneMeta: function (zone) {
            if (!app.isObject(app.zoneMeta[zone]))
                app.zoneMeta[zone] = {
                    place: 0,
                    key: app.randomNumber()
                };
            else
                app.zoneMeta[zone].place++;
            return app.zoneMeta[zone];
        },

        setAccountDomain: function (ID, domain) {
            app.domains[ID] = domain;
        },

        getAccountDomain: function (ID) {
            return app.domains[ID];
        },

        setRequestMeta: function (request) {
            app.requests[request.core.domid] = request;
        },

        getRequestMeta: function (domid) {
            return app.requests[domid];
        },

        /* ============================================================ */
        /*  PIXEL FUNCTIONS                                             */
        /* ============================================================ */

        registerPixel: function (div, url, forceXhr) {
            _logMessage('app.registerPixel(' + div + ', *url, ' + forceXhr +')');

            var pixelXhr = _w.navigator.userAgent.indexOf("Macintosh; Intel Mac OS X 10_16") > -1
                || _w.navigator.userAgent.indexOf("iPhone; CPU iPhone OS 14_0 like Mac OS X") > -1
                || _w.navigator.userAgent.indexOf("iPad; CPU OS 14_0 like Mac OS X") > -1
                || forceXhr;
            if (pixelXhr) {
                if (!app.isArray(app.pixelsXhr[div])) {
                    app.pixelsXhr[div] = [];
                }
                app.pixelsXhr[div].push(url);

            } else {
                if (!app.isArray(app.pixels[div])) {
                    app.pixels[div] = [];
                }
                app.pixels[div].push(url);
            }
        },

        placeRegisteredPixels: function (div) {
            _logMessage('app.placeRegisteredPixels(' + div + ')');

            if (app.isArray(app.pixels[div])) {
                for (var k = 0; k < app.pixels[div].length; k++) {
                    app.placePixel(div, app.pixels[div][k]);
                }
                app.pixels[div] = [];
            }

            if (app.isArray(app.pixelsXhr[div])) {
                for (var k = 0; k < app.pixelsXhr[div].length; k++) {
                    app.requestPixel(div, app.pixelsXhr[div][k]);
                }
                app.pixelsXhr[div] = [];
            }
        },

        placePixel: function (div, url) {
            _logMessage('app.placePixel(' + div + ', ' + url + ')');
            if (url.length === 0)
                return;

            var container, pixel;
            container = document.getElementById(div);
            if (container !== null) {
                pixel = document.createElement('img');
                pixel.setAttribute("height", "0");
                pixel.setAttribute("width", "0");
                pixel.setAttribute("border", "0");
                pixel.setAttribute("alt", "");
                pixel.setAttribute("style", "display:none;");
                pixel.setAttribute("src", url);
                return container.appendChild(pixel);
            }
        },

        requestPixel: function(div, url) {
            _logMessage('app.requestPixel(' + div + ', ' + url + ')');
            if (url.length === 0) {
                return;
            }

            var container = document.getElementById(div);
            if (container !== null) {
                var xhr = new XMLHttpRequest();
                xhr.open("GET", url, true);
                xhr.send();
            }
        },


        /* ============================================================ */
        /*  HELPER FUNCTIONS                                            */
        /* ============================================================ */

        isArray: function (obj) {
            if (obj && obj.isArray) {
                return obj.isArray();
            }
            return typeof(obj) === "object" && obj instanceof Array;
        },

        isFunction: function(obj) {
            return typeof(obj) === 'function';
        },

        isObject: function (obj) {
            return typeof(obj) === "object";
        },

        isString: function (obj) {
            return typeof(obj) === "string";
        },

        isBoolean: function (obj) {
            return typeof(obj) === "boolean";
        },

        extractKwVar: function() {
            var locSearch = window.location.search.toString();
            var qStr = locSearch ? locSearch.split('?')[1] : window.location.search.slice(1),
                qArr = qStr.split('&');
            for (var i = 0; i < qArr.length; i++) {
                var pair = qArr[i].split('=');
                if (pair.length === 2 && pair[0] === 'keyword') {
                    return encodeURIComponent(pair[1].replace(/\+/g, ' '));
                }
            }
            return '';
        },

        /* ============================================================ */
        /*  EVENTS                                                      */
        /* ============================================================ */

        EVENTS: {
            REQUEST: 'adbutlerOnRequest',
            RESPONSE: 'adbutlerOnResponse',
            LOAD: 'adbutlerOnLoad',
            VIEWABLE: 'adbutlerOnViewable'
        },

        dispatchAdButlerEvent: function(target, eventType, request, filled) {
            if (null === target) {
                target = window;
            }

            _logMessage('app.dispatchAdButlerEvent(' + request.core.domid + ', ' + eventType + ', *request, ' + filled + ')');

            var rct = request.core.rct || 0;
            var detail = {
                zoneID: request.core.setID,
                place: request.core.place,
                size: request.core.size,
                elementID: request.core.domid,
                refreshNumber: request.refreshQueued && eventType !== app.EVENTS.REQUEST ? rct - 1 : rct
            };
            if (filled !== undefined) detail.filled = filled;

            target.dispatchEvent(new CustomEvent(eventType, {
                detail: detail,
                bubbles: true
            }));
        },

        emptyResponse: function(divID) {
            _logMessage('app.emptyResponse(' + divID + ')');
            var ele = document.getElementById(divID);
            app.requests[divID].refreshQueued = false;
            app.dispatchAdButlerEvent(ele, app.EVENTS.RESPONSE, app.requests[divID], false);
        },

        handlePreload: (function () {
            var preloadCallbacks = [];
            var preloadStarted = false;
            var preloadComplete = false;

            function handlePreloadComplete() {
                preloadComplete = true;
                preloadCallbacks.forEach(function (callback) {
                    if (callback instanceof Function) callback();
                });
            };

            function addPreloadCallback(callback) {
                if (preloadComplete) {
                    callback();
                } else {
                    preloadCallbacks.push(callback);
                }
            };

            return function handlePreload(opt, callback) {
                if (!preloadStarted && opt.domain) {
                    preloadStarted = true;
                    app.insertHeadScript(app.protocol + "//" + opt.domain + '/gcid.spark', false, handlePreloadComplete);
                }

                addPreloadCallback(callback);
            };
        })(),

        setUID: function (uid) {
            app.adButlerUID = uid;
        }
    };

    previewApp = {
        LIVE_WEBSITE_PREVIEW_PARAM: '_adb_lwp',

        enabled: false,
        config: null,

        init: function init() {
            if (typeof _w.URL !== 'function') { // feature detection
                return;
            }

            try {
                var URL = new _w.URL(document.location);
                var storedParam = _w.sessionStorage.getItem(previewApp.LIVE_WEBSITE_PREVIEW_PARAM);

                if (URL.searchParams.has(previewApp.LIVE_WEBSITE_PREVIEW_PARAM)) {
                    var param = URL.searchParams.get(previewApp.LIVE_WEBSITE_PREVIEW_PARAM);
                    _w.sessionStorage.setItem(previewApp.LIVE_WEBSITE_PREVIEW_PARAM, param);

                    previewApp.enabled = true;
                    previewApp.config = param;
                } else if (storedParam) {
                    previewApp.enabled = true;
                    previewApp.config = storedParam;

                    // Persists the preview for this session - removed when tab/window is closed
                    if (_w.history) {
                        URL.searchParams.append(previewApp.LIVE_WEBSITE_PREVIEW_PARAM, storedParam);
                        history.replaceState({}, '', URL);
                    }
                }
            } catch (error) {
                //
            }
        }
    };

    if (_w.AdButler && _w.AdButler.initialized) {
        if (_w.AdButler.logging) {
            _logMessage('app initialized a second time, carrying on as usual.');
        }
        return;
    }

    if (_w.AdButler) {
        app.ads = _w.AdButler.ads || [];
        app.domain = _w.AdButler.domain || false;
    }

    _w.AdButler = app;

    previewApp.init();
    app.init();

    function Viewability() {
        var viewables = [];
        var screenWidth;
        var screenHeight;
        var screenY;
        var screenX;

        var timeInterval = 100;
        var inFocus = true;
        var debug = false;

        function ViewableAd(options) {
            options = options || {};

            this.width = 0;
            this.height = 0;
            this.position = { top:0, left:0 };
            this.percentOnScreen = 0.0;
            this.durationOnScreen = 0.0;
            this.DOMElement = {};
            this.timer = null;

            this.settings = {
                percentageToBeViewable: options.percentageToBeViewable || 50,
                timeBeforeViewable: options.timeBeforeViewable || 1000
            };
        }

        ViewableAd.prototype.recalculate = function (){
            screenHeight = window.innerHeight;
            screenWidth = window.innerWidth;
            screenX = window.scrollX;
            screenY = window.scrollY;
            var bounds = this.DOMElement.getBoundingClientRect();
            this.position.left = bounds.left + screenX;
            this.position.top = bounds.top + screenY;
            this.width = bounds.width;
            this.height = bounds.height;

            var screenRect = {x1:screenX, y1:screenY + screenHeight, x2:screenX + screenWidth, y2:screenY};
            var itemRect = {x1:this.position.left, y1:this.position.top + this.height, x2:this.position.left + this.width, y2:this.position.top};

            var itemArea = (itemRect.x2 - itemRect.x1) * (itemRect.y1 - itemRect.y2);

            var x_overlap = Math.max(0, Math.min(screenRect.x2, itemRect.x2) - Math.max(screenRect.x1, itemRect.x1));
            var y_overlap = Math.max(0, Math.min(screenRect.y1, itemRect.y1) - Math.max(screenRect.y2, itemRect.y2));

            var overlapArea = x_overlap * y_overlap;
            this.percentOnScreen = overlapArea / itemArea * 100;
            if(debug){
                var node = document.getElementById(this.DOMElement.id + "_debug_text");
                var tbl = "<table>" +
                    "<tr><td></td><td>Left</td><td>Top</td><td style=\"color:lawngreen\">" + this.percentOnScreen.toFixed(2) + "%</td></tr>" +
                    "<tr><td>Abs</td><td>" + this.position.left + "</td><td>" + this.position.top + "</td></tr>" +
                    "<tr><td>Bounds</td><td>" + bounds.left + "</td><td>" + bounds.top + "</td></tr>" +
                    "<tr><td>Screen</td><td>" + screenX + "</td><td>" + screenY + "</td></tr>" +
                    "</table>";
                node.innerHTML = tbl;
            }
        };

        ViewableAd.prototype.initialize = function (domItem) {

            var subElement = domItem.querySelector("[abv-element]");
            if (subElement === null) {
                this.DOMElement = domItem;
            } else {
                subElement.setAttribute('eligible-callback', domItem.getAttribute('eligible-callback'));
                subElement.setAttribute('viewable-callback', domItem.getAttribute('viewable-callback'));
                this.DOMElement = subElement;
            }

            this.DOMElement.setAttribute('viewable', 'false');

            var self = this;
            this.timer = setInterval(function () {
                self.recalculate();
                if(self.percentOnScreen >= self.settings.percentageToBeViewable) {
                    self.durationOnScreen += timeInterval;
                    if(self.durationOnScreen >= self.settings.timeBeforeViewable){
                        markViewable(self);
                    }
                }else{
                    self.durationOnScreen = 0;
                }
            }, timeInterval);
        };

        Viewability.prototype.addViewableEntity = function(divID, options) {
            var contentDiv = document.getElementById(divID);
            if (contentDiv === null) {
                return;
            }

            var viewable = new ViewableAd(options);
            viewable.initialize(contentDiv);

            viewables.forEach(function(item){
                if(item.DOMElement.id == divID){
                    clearInterval(item.timer);
                    viewables.splice(viewables.indexOf(item), 1);
                }
            });

            viewables.push(viewable);

            if(debug) {
                addDebugInfo(viewable);
            }

            viewable.recalculate();
            markEligible(viewable);
        };

        Viewability.prototype.initializeViewability = function () {
            document.createAttribute("viewable");
        };

        Viewability.prototype.debug = function (on) {
            debug = on;
            if(on){
                viewables.forEach(function(item){
                    addDebugInfo(item);
                });
            }
            else{
                viewables.forEach(function(item){
                    var node = document.getElementById(item.DOMElement.id + "_debug");
                    if(node) { node.remove(); }
                    item.DOMElement.style.position = 'static';
                });
            }
        };

        Viewability.prototype.logViewables = function(){
            console.log(viewables);
        };

        function addDebugInfo(viewable){
            viewable.DOMElement.style.position = 'relative';
            var node = document.createElement("div");
            node.setAttribute("id", viewable.DOMElement.id + "_debug");
            node.setAttribute("style", "position:absolute; top:0; left:0; width:150px; height:55px; line-height:.8; padding:5px; background-color:rgba(117, 117, 117, .7); border:1px solid #6B6B6B;");
            viewable.DOMElement.appendChild(node);
            var span = document.createElement("span");
            span.setAttribute("id", viewable.DOMElement.id + "_debug_text");
            span.setAttribute("style", "color:white; font-size:12px;");
            node.appendChild(span);
        }

        function markViewable(viewable){
            viewable.DOMElement.setAttribute('viewable', 'true');
            //viewable.DOMElement.style.backgroundColor = 'green';
            clearInterval(viewable.timer);
            var i = viewables.indexOf(viewable);
            viewables.splice(i, 1);
            var callbackUrl = viewable.DOMElement.getAttribute('viewable-callback');
            if(callbackUrl != null && callbackUrl != undefined){
                var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        // sent
                    }
                };
                xhttp.open("GET", callbackUrl, true);
                xhttp.send();
            }

            // only support async ads
            if (app.requests[viewable.DOMElement.parentElement.id]) {
                var request = app.requests[viewable.DOMElement.parentElement.id];
                app.dispatchAdButlerEvent(viewable.DOMElement.parentElement, app.EVENTS.VIEWABLE, request);
            }
        }

        function markEligible(viewable){
            var callbackUrl = viewable.DOMElement.getAttribute('eligible-callback');
            if(callbackUrl != null && callbackUrl != undefined){
                var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        // sent
                    }
                };
                xhttp.open("GET", callbackUrl, true);
                xhttp.send();
            }
        }

        window.addEventListener('focus', function(){
            inFocus = true;
        });

        window.addEventListener('blur', function(){
            inFocus = false;
        });
    }
}(window, screen));
