
var iris = {};

// Expose iris to the global object
window.iris = iris;


(function ($) {

    // static object to store all app callbacks
    var _events;
    
    function _init() {

        _events = {};

        iris.on("iris-reset", _init);
    }

    iris.on = function (p_eventName, f_func) {
        if ( !_events.hasOwnProperty(p_eventName) ) {
            _events[p_eventName] = [];
        }

        var callbacks = _events[p_eventName];
        var index = $.inArray(f_func, callbacks);
        if ( index === -1 ) {
            callbacks.push(f_func);
        }

    };

    iris.off = function (p_eventName, f_func){
        if ( _events.hasOwnProperty(p_eventName) ){
            if (f_func !== undefined) {
                var index = $.inArray(f_func, _events[p_eventName]);
                if ( index !== -1 ) {
                    _events[p_eventName].splice(index, 1);
                }

            } else {
                delete _events[p_eventName];
            }
        }
    };

    iris.notify = function (p_eventName, p_data){
        if ( p_eventName === undefined ) {
            throw "[notify] event name parameter is not defined";
        }
        
        if ( _events[p_eventName] ) {
            var callbacks = _events[p_eventName];
            for ( var i=0; i < callbacks.length; i++ ) {
                callbacks[i](p_data);
            }
        }
    };

    iris.destroyEvents = function (p_eventName, p_callbacks) {
        // Create an array copy, to prevent concurrent modification of _events[p_eventName] array.
        // This occur if an event that destroy uis is notified
        var callbacks = _events[p_eventName].concat([]);
        for ( var i=0; i < p_callbacks.length; i++ ) {
            var index = $.inArray(p_callbacks[i], callbacks);
            if ( index !== -1 ) {
                callbacks.splice(index, 1);
            }
        }
        _events[p_eventName] = callbacks;
    };


    iris.Event = function () {

        this.events = {}; // { "event1" : [f1, f2], "event2" : [f3, f4, f5, f6] }

    };

    var eventPrototype = iris.Event.prototype;

    eventPrototype.on = function (p_eventName, f_func) {
        if ( !this.events.hasOwnProperty(p_eventName) ) {
            this.events[p_eventName] = [];
        }

        var callbacks = this.events[p_eventName];
        var index = $.inArray(f_func, callbacks);
        if ( index === -1 ) {
            callbacks.push(f_func);
            iris.on(p_eventName, f_func);
        }

    };

    eventPrototype.off = function (p_eventName, f_func){
        var callbacks = this.events[p_eventName];
        if ( callbacks ) {
            var index = $.inArray(f_func, callbacks);

            if ( index !== -1 ) {
                callbacks.splice(index, 1);
            }
        }
    };

    eventPrototype.notify = function (p_eventName, p_data){
        iris.notify(p_eventName, p_data);
    };

    //
    // Iris custom events
    //
    iris.BEFORE_NAVIGATION = "iris_before_navigation";
    iris.AFTER_NAVIGATION = "iris_after_navigation";
    iris.RESOURCE_ERROR = "iris_resource_error";
    iris.SCREEN_NOT_FOUND = "iris_screen_not_found";
    
    _init();

})(jQuery);

(function($) {

    var _JQ_MIN_VER = 1.5,
        _appBaseUri,
        _cache,
        _cacheVersion,
        _hasConsole,
        _logEnabled;

    //
    // Private
    //
    function _init() {

        if ( typeof jQuery === "undefined" ) {
            throw "jQuery " + _JQ_MIN_VER + "+ previous load required";
        } else if($().jquery < _JQ_MIN_VER) {
            throw "jQuery " + $().jquery + " currently loaded, jQuery " + _JQ_MIN_VER + "+ required";
        }

        _hasConsole = ( window.console && window.console.log );

        var isLocalEnv = urlContains("localhost", "127.0.0.1");
        _logEnabled = isLocalEnv;
        _cache = !isLocalEnv;

        iris.on("iris-reset", _init);
    }

    function urlContains () {
        for(var i = 0 ; i< arguments.length; i++) {
            if ( document.location.href.indexOf(arguments[i]) > -1 ) {
                return true;
            }
        }
        return false;
}

    //
    // Public
    //
    iris.baseUri = function (p_baseUri) {
        if ( p_baseUri !== undefined ) {
            _appBaseUri = p_baseUri;

        } else if ( _appBaseUri === undefined ) {
            var base = document.getElementsByTagName("base");
            base = base.length > 0 ? base[0].attributes.href.value : "/";
            _appBaseUri = document.location.protocol + "//" + document.location.host + base;
        }
        return _appBaseUri;
    };

    iris.cache = function (p_value) {
        if(p_value !== undefined) {
            _cache = p_value;
        } else {
            return _cache;
        }
    };

    iris.cacheVersion = function (p_value) {
        if(p_value !== undefined) {
            _cacheVersion = p_value;
        } else {
            return _cacheVersion;
        }
    };

    iris.log = function () {
        if ( _hasConsole && _logEnabled ) {
            window.console.log("[iris]", arguments[0], arguments[1], arguments[2], arguments[3]); // TODO
        }
    };

    iris.enableLog = function () {
        if ( arguments.length > 0 ) {
            _logEnabled = urlContains(arguments);
        } else {
            return _logEnabled;
        }
    };

    iris.noCache = function () {
        if ( arguments.length > 0 ) {
            _cache = !urlContains(arguments);
        } else {
            return !_cache;
        }
    };
    
    
    _init();

})(jQuery);

(function($) {

    var _translations;

    function _init() {
        _translations = {};
    }

    //
    // Private
    //
    function _addTranslations(p_locale, p_data) {
        iris.log("[translations]", p_locale, p_data);

        if(iris.locale() === undefined) {
            iris.locale(p_locale);
        }

        if(!_translations.hasOwnProperty(p_locale)) {
            _translations[p_locale] = {};
        }

        $.extend(_translations[p_locale], p_data);
    }

    function _loadTranslations(p_locale, p_uri, p_settings) {
        
        iris.log("[translations]", p_locale, p_uri);

        var ajaxSettings = {
            url: p_uri,
            dataType: "json",
            async: false,
            cache: iris.cache()
        };

        if(iris.cache() && iris.cacheVersion()) {
            ajaxSettings.data = "_=" + iris.cacheVersion();
        }

        iris.ajax(ajaxSettings)
        .done(function (p_data) {
            _addTranslations(p_locale, p_data);
            iris.log("[translations]", p_data);

            if(p_settings && p_settings.hasOwnProperty("success")) {
                p_settings.success(p_locale);
            }
        })
        .fail(function(p_err) {
            if(p_settings && p_settings.hasOwnProperty("error")) {
                p_settings.error(p_locale);
            }
            throw "Error " + p_err.status + " loading lang file[" + p_uri + "]";
        });
    }


    //
    // Public
    //
    iris.translations = function (p_locale, p_value, p_settings) {
        if(typeof p_value === "object") {
            _addTranslations(p_locale, p_value);
        } else {
            _loadTranslations(p_locale, p_value, p_settings);
        }
    };

    iris.translate = function (p_label, p_locale) {
        var value;
        var locale = null;
        if (p_locale !== undefined) {
            locale = p_locale;
        } else {
            locale = iris.locale();
        }
        
        var logPrefix = "[translate]";
        if(_translations.hasOwnProperty(locale)) {
            value = iris.val(_translations[locale], p_label);
            if(value === undefined) {
                iris.log(logPrefix + " label '" + p_label + "' not found in Locale '" + locale + "'", _translations[locale]);
            }
            if(typeof value === "object") {
                iris.log(logPrefix + "label '" + p_label + "' is an object but must be a property in Locale '" + locale + "'", _translations[locale]);
            }
        } else {
            iris.log(logPrefix + " locale '" + locale + "' not loaded", this);
        }
        return (value) ? value : "??" + p_label + "??";
    };
    
    _init();

})(jQuery);

(function() {

    var _locale, _regional;
    
    function _init() {
        _locale = undefined;
        _regional = {};

        iris.on("iris-reset", _init);
    }

    iris.locale = function (p_locale, p_regional) {
        if ( typeof p_regional === "object" ) {
            if ( !_regional[p_locale] ) {
                _regional[p_locale] = {};
            }
            $.extend(_regional[p_locale], p_regional);

            if ( _locale === undefined ) {
                _locale = p_locale;
            }

        } else if ( p_locale !== undefined ) {
            _locale = p_locale;

        } else {
            return _locale;
        }
    };

    iris.regional = function (p_label) {
        if(_regional.hasOwnProperty(_locale)) {
            if(typeof p_label === "undefined") {
                return _regional[_locale];
            } else if(_regional[_locale].hasOwnProperty(p_label)) {
                return _regional[_locale][p_label];
            } else {
                return undefined;
                //throw "[regional] setting '" + p_label + "' not found for locale '" + _locale + "'";
            }
        } else {
            throw "[regional] for locale '" + _locale + "' not found";
        }
    };
    
    _init();
    

})();

(function($) {

    //
    // Private
    //
    
    function leadingZero(p_number) {
        return(p_number < 10) ? "0" + p_number : p_number;
    }

    function formatDateChar(p_formatChar, p_date) {
        var regional = iris.regional();
        switch(p_formatChar) {
        case "y":
            return String(p_date.getFullYear()).substring(2);
        case "Y":
            return p_date.getFullYear();
        case "m":
            var m = p_date.getMonth() + 1;
            return leadingZero(m);
        case "n":
            return p_date.getMonth() + 1;
        case "M":
            return regional.monthNames[p_date.getMonth()].substring(0, 3);
        case "b":
            return regional.monthNames[p_date.getMonth()].substring(0, 3).toLowerCase();
        case "F":
            return regional.monthNames[p_date.getMonth()];
        case "d":
            var d = p_date.getDate();
            return leadingZero(d);
        case "D":
            return regional.dayNames[p_date.getDay()].substring(0, 3);
        case "l":
            return regional.dayNames[p_date.getDay()];
        case "s":
            var s = p_date.getSeconds();
            return leadingZero(s);
        case "i":
            var i = p_date.getMinutes();
            return leadingZero(i);
        case "H":
            var h = p_date.getHours();
            return leadingZero(h);
        case "h":
            var hour = p_date.getHours();
            hour = (hour % 12) === 0 ? 12 : hour % 12;
            return leadingZero(hour);
        case "a":
            return(p_date.getHours() > 12) ? "p.m." : "a.m.";
        case "A":
            return(p_date.getHours() > 12) ? "PM" : "AM";
        case "U":
            return Math.floor(p_date.getTime() * 0.001);
        default:
            return p_formatChar;
        }
    }

    iris.date = function (p_date, p_format) {
        if ( p_date === null ) {
            return "";
        }
        
        if(!p_format) {
            p_format = iris.regional("dateFormat");
        }

        if(typeof p_date !== "object") {
            p_date = new Date(p_date);
        }

        var dateFormat = "";
        for(var f = 0, F = p_format.length; f < F; f++) {
            dateFormat += formatDateChar(p_format[f], p_date);
        }
        return dateFormat;
    };


    //
    // Public
    //

    iris.ajax = function (p_settings) {
        return $.ajax(p_settings);
    };

    iris.currency = function (value, config) {
        var settings = {
            formatPos: "sn",
            formatNeg: "(sn)",
            symbol : "$"
        };
        $.extend(settings, iris.regional("currency"), config);

        var num = iris.number(value, settings);

        return num.replace("s", settings.symbol);
    };

    iris.number = function (value, config) {
        var settings = {
            formatPos: "n",
            formatNeg: "- n",
            decimal: ".",
            thousand: ",",
            precision: 2
        };
        $.extend(settings, iris.regional("number"), config);

        var val = Number(value);
        var format = (val >= 0) ? settings.formatPos : settings.formatNeg;

        var dec = val % 1;
        var num = String(Math.abs(val - dec));

        if ( settings.precision === 0 ) {
            num = parseInt(val.toFixed(), 10);

        } else {
            dec = String(Math.abs(dec).toFixed(settings.precision));
            dec = dec.substr(2);

            for(var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
                num = num.substring(0, num.length - (4 * i + 3)) + settings.thousand + num.substring(num.length - (4 * i + 3));
            }

            num = num + settings.decimal + dec;
        }

        return format.replace("n", num);
    };

    iris.val = function (p_obj, p_label) {
        var value;
        if(p_label.indexOf(".") > -1) {
            var labels = p_label.split(".");
            var f, F = labels.length;
            for(f = 0; f < F; f++) {
                if(p_obj !== undefined) {
                    p_obj = p_obj[labels[f]];
                } else {
                    break;
                }
            }
            value = p_obj;
        } else {
            value = p_obj[p_label];
        }
        return value;
    };

    // The jQuery.browser() method has been deprecated since jQuery 1.3 and is removed in 1.9. If needed, it is available as part of the jQuery Migrate plugin
    // https://github.com/jquery/jquery-migrate/blob/master/src/core.js

    var browser;

    function setBrowser (ua) {
        ua = ua.toLowerCase();

        var match = /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
            /(webkit)[ \/]([\w.]+)/.exec( ua ) ||
            /(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
            /(msie) ([\w.]+)/.exec( ua ) ||
            ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
            [];

        return {
            name: match[ 1 ] || "",
            version: match[ 2 ] || "0"
        };
    }

    iris.browser = function () {
        if ( !browser ) {
            var matched = setBrowser( navigator.userAgent );
            browser = {};

            if ( matched.name ) {
                browser[ matched.name ] = true;
                browser.version = matched.version;
            }

            // Chrome is Webkit, but Webkit is also Safari.
            if ( browser.chrome ) {
                browser.webkit = true;
            } else if ( browser.webkit ) {
                browser.safari = true;
            }
        }
        return browser;
    };

})(jQuery);
(function($) {

    var _screen,
    _screenJsUrl,
    _screenContainer,
    _jsUrlScreens,
    _prevHash,
    _prevHashString,
    _includes,
    _welcomeCreated,
    _gotoCancelled,
    _lastFullHash,
    _head = document.getElementsByTagName('head')[0],
    _loadJsCallback,
    _dependencyCount,
    _lastLoadedDependencies,
    _dependency,
    _notCreatedScreenHashses,
    _paths,
    FORMAT_REG_EXP = /(date|currency|number)(?:\(([^\)]+)\))/
    ;

    function _init() {
        // _screenJsUrl["#hash"] return the js-url associated with #hash
        _screenJsUrl = {};

        // _screenContainer["#hash"] return the parent container associated with #hash
        _screenContainer = {};

        // _screen["#hash"] return the screen instance
        _screen = {};

        // _jsUrlScreens["/path/to/file.js"] indicates if a js-URL has been used by some screen
        _jsUrlScreens = {};

        _prevHash = undefined;
        _includes = {};
        _welcomeCreated = false;
        _gotoCancelled = false;
        _lastFullHash = "";

        // dependencies
        _dependencyCount = 0;
        _lastLoadedDependencies = [];
        _dependency={};

        _paths = [];

        iris.on("iris-reset", function () {
            $(window).off("hashchange");
            document.location.hash = "#";

            _init();
        });
    }


    function _welcome(p_jsUrl) {
        if (_welcomeCreated === true) {
            throw "the welcome screen already exists";
        }
        _welcomeCreated = true;
        _screenJsUrl["#"] = p_jsUrl;
        _screenContainer["#"] = $(document.body);

        if ( window.console && window.console.log ) {
            window.console.log("[iris] noCache[" + iris.noCache() + "] enableLog[" + iris.enableLog() + "]");
        }

        if ( iris.hasOwnProperty("path") ) {
            _loadPaths(iris.path);
        }
        if ( _paths.length > 0 ) {
            _load(_paths, _pathsLoaded);
        } else {
            _pathsLoaded();
        }
    }

    function _loadPaths (paths) {
        if ( typeof paths === "string" ) {
            if ( !_includes.hasOwnProperty(paths) ) {
                _paths.push(paths);
            }
        } else {
            for ( var p in paths ) {
                _loadPaths(paths[p]);
            }
        }
    }

    // Ensure include is defined
    function _setInclude (include, path, type) {
        if ( $.type(path) !== "string" || path === "" ) {
            iris.log("[error] path[" + path + "]", include);
            throw "Invalid path on " + type +" registration";
        }
        _includes[path] = include;
    }

    function _pathsLoaded () {
        
        // check hashchange event support
        if(!("onhashchange" in window)) {
            throw "hashchange event unsupported";
        } else {
            // force to do an initial navigation
            _startHashChange();
            $(window).on("hashchange", _startHashChange);
        }
    }

    //
    // Scripts load
    //
    function _load (paths, callback) {
        iris.log("[load-js]", paths);

        _loadJsCallback = callback;

        var path, script;
        for (var i = 0; i < paths.length; i++) {
            if ( !_includes.hasOwnProperty(paths[i]) ) {
                _dependencyCount++;

                // If the path doesn't start with http or https, it's concatenated to the iris base uri
                path = /^https?:\/\//.test(paths[i]) ? paths[i] : String(iris.baseUri() + paths[i]);

                if ( !iris.cache() ) {
                    path += "?_=" + new Date().getTime();
                } else if( iris.cacheVersion() ) {
                    path += "?_=" + iris.cacheVersion();
                }
                
                if ( /\.html$/.test(paths[i]) ) {
                    iris.ajax({
                        url: path,
                        dataType: "html",
                        async: true,
                        componentPath: paths[i]
                    })
                    .done(_templateLoaded);
                } else {
                    script = document.createElement("script");
                    script.type = "text/javascript";
                    script.src = path;
                    script.charset = "UTF-8";
                    if (iris.browser().msie  && parseInt(iris.browser().version, 10) < 9) {
                        script.onreadystatechange = onReadyStateChange;
                    } else {
                        script.onload = _checkLoadFinish;
                    }
                    _head.appendChild(script);
                }
            }
        }
    }

    function onReadyStateChange () {
        if ( this.readyState === "loaded" ) {
            _checkLoadFinish();
        }
    }

    function _templateLoaded (data, textStatus, jqXHR) {
        _includes[this.componentPath] = data;
        _checkLoadFinish();
    }

    function _checkLoadFinish () {
        if ( --_dependencyCount === 0 ) {
            _loadJsCallback();
        }
    }

    //
    // Navigation
    //
    function _goto(p_hashUri) {
        document.location.hash = p_hashUri; // Trigger hashchange event, then execute _startHashChange()
    }

    function _startHashChange(e) {

        // Check if welcome screen has been created
        if(!_welcomeCreated) {
            throw "set the first screen using iris.welcome()";
        }
        
        // when document.location.href is [http://localhost:8080/#] then document.location.hash is [] (empty string)
        // to avoid the use of empty strings and prevent mistakes, we replace it by #. (# == welcome-screen)
        var hash = document.location.hash;
        if ( hash === "" ) {
            hash = "#";
        }

        // Prevent multiple calls with the same hash
        // http://stackoverflow.com/questions/4106702/change-hash-without-triggering-a-hashchange-event#fggij
        if ( _lastFullHash === hash ) {
            return false;
        }

        // when a screen cannot sleep, finish navegation process
        if(_gotoCancelled) {
            _gotoCancelled = false;
            iris.notify(iris.AFTER_NAVIGATION);
            _lastFullHash = _prevHashString;
            return false;
        }

        iris.log("Starting a new navigation["+hash+"]");
        _lastFullHash = hash;
        iris.notify(iris.BEFORE_NAVIGATION);

        
        var i, screenPath, firstDiffNode = -1, curr = hash.split("/"), firstNodeToSleep;

        // Call to canSleeps and sleeps of previous screens
        if ( _prevHash !== undefined ) {

            // get firstDiffNode attending to current hash
            for ( i = 0; i < curr.length; i++ ) {
                if ( _prevHash[i] === undefined || _prevHash[i] !== curr[i] ) {
                    firstDiffNode = i;
                    break;
                }
            }
            
            firstNodeToSleep = firstDiffNode;

            // For cases like this: prev = #/s1/s2, curr = #/s1
            // we need sleep s2, therefor firstNodeToSleep = curr.length
            if ( (firstNodeToSleep === -1) && (curr.length < _prevHash.length) ) {
                firstNodeToSleep = curr.length;

            // if welcome screen has been changed firstDiffNode == 0, and there are not previous screens to sleep, _prevHash.length == 1
            // ignore cansleep and sleep of welcome screen, firstNodeToSleep = -1
            } else if ( firstDiffNode === 0 && _prevHash.length === 1 ) {
                firstNodeToSleep = -1;
            }

            // if goto welcome screen [curr.length === 1] and there are not differents [firstDiffNode === -1],
            // then sleep the previous screens except welcome screen
            if ( curr.length === 1 && firstDiffNode === -1 ) {
                firstDiffNode = 1;
            }

            if ( firstNodeToSleep !== -1 ) {

                // check if can sleep
                for ( i = _prevHash.length-1; i >= firstNodeToSleep; i-- ) {
                    screenPath = _getScreenPath(_prevHash, i);
                    if( _screen[screenPath].canSleep() === false ) {
                        _gotoCancelled = true;
                        document.location.href = _prevHashString;
                        return false;
                    }
                }

                // hide previous screens
                for ( i = _prevHash.length - 1; i >= firstNodeToSleep; i-- ) {
                    var screenToSleep = _screen[ _getScreenPath(_prevHash, i) ];
                    screenToSleep._sleep();
                    screenToSleep.hide();
                }
            }

        } else {
            // No previous screens loaded
            firstDiffNode = 0;
        }
        
        if ( firstDiffNode !== -1 ) {
            // show new screens
            for ( i = firstDiffNode; i < curr.length; i++ ) {

                screenPath = _getScreenPath(curr, i);

                if ( !_screenContainer.hasOwnProperty(screenPath) ) {
                    
                    // Notify event and print message instead of raise exception, since v0.5.2
                    iris.notify(iris.SCREEN_NOT_FOUND, screenPath);
                    iris.log("[warning] '" + screenPath + "' must be registered using self.screens()");
                    return;

                } else {

                    if ( !_screen.hasOwnProperty(screenPath) ) {
                        var screenObj = _instanceScreen(screenPath);
                        screenObj.create();
                        _screen[screenPath] = screenObj;
                    }

                    var screenInstance = _screen[screenPath];
                    var screenParams = _navGetParams(curr[i]);
                    screenInstance.params = screenParams;
                    screenInstance.show();
                    screenInstance._awake(screenParams);
                }

            }
        }

        // set navigation variables to the next hashchange event
        _prevHash = curr;
        _prevHashString = hash;

        iris.log("Navigation finished");
        iris.notify(iris.AFTER_NAVIGATION);
    }

    function _removeURLParams(p_url) {
        return _removeLastSlash(p_url.replace(/\?[^\/]*/, ""));
    }

    function _removeLastSlash(p_url) {
        return p_url.replace(/\/$/, "");
    }

    function _navGetParams(p_hashPart) {
        var params = {},
        regex = /([\.\w_\-]*)=([^&]*)/g,
        matches = regex.exec(p_hashPart);

        while(matches) {
            params[matches[1]] = decodeURIComponent(matches[2]);
            matches = regex.exec(p_hashPart);
        }

        return params;
    }

    function _getScreenPath (paths, pos) {
        var path = "";
        for(var i = 0; i <= pos; i++) {
            path += "/" + _removeURLParams( paths[i] );
        }
        return path.substr(1);
    }

    function _parseLangTags(p_html) {
        var html = p_html;
        var matches = html.match(/@@[0-9A-Za-z_\.]+@@/g);
        if(matches) {
            var f, F = matches.length;
            for(f = 0; f < F; f++) {
                html = html.replace(matches[f], iris.translate(matches[f].substring(2, matches[f].length - 2)));
            }
        }
        return html;
    }


    //
    // UI
    //

    function _registerTmpl(path, html) {
        _includes[path] = html;
    }

    function _registerUI(ui, path) {
        _setInclude(ui, path, "ui");
    }

    function _instanceUI(p_$container, p_uiId, p_jsUrl, p_uiSettings, p_templateMode, parentComponent) {

        var uiInstance = new UI();
        uiInstance.id = p_uiId;
        uiInstance.uis = [];
        uiInstance.uisMap = {};
        uiInstance.el = {};
        uiInstance.events = {};
        uiInstance.con = p_$container;
        uiInstance.fileJs = p_jsUrl;
        uiInstance.parentComponent = parentComponent;
        
        _includes[p_jsUrl](uiInstance);
        if(p_templateMode !== undefined) {
            uiInstance._tmplMode = p_templateMode;
        }

        p_uiSettings = p_uiSettings === undefined ? {} : p_uiSettings;
        var jqToHash = _jqToHash(p_$container);

        if ( uiInstance.cfg === null ) {
            uiInstance.cfg = {};
        }

        $.extend(uiInstance.cfg, jqToHash, p_uiSettings);

        uiInstance.create(jqToHash, p_uiSettings);
        uiInstance._awake();
        
        return uiInstance;
    }

    function _jqToHash(p_$obj) {
        var hash = {};
        var attrs = p_$obj.get(0).attributes;
        var label;
        for(var f = 0, F = attrs.length; f < F; f++) {
            label = attrs[f].name;
            if(label.indexOf("data-") === 0) {
                label = label.substr(5);
            }
            hash[label] = attrs[f].value;
        }
        return hash;
    }


    //
    // SCREEN
    //

    function _registerScreen(screen, path) {
        _setInclude(screen, path, "screen");
    }

    function _instanceScreen (p_screenPath) {

        var jsUrl = _screenJsUrl[p_screenPath];
        var screenObj = new Screen();
        _includes[jsUrl](screenObj);

        screenObj.id = p_screenPath;
        screenObj.el = {};
        screenObj.uis = [];
        screenObj.uisMap = {};
        screenObj.events = {};
        screenObj.con = _screenContainer[p_screenPath];
        screenObj.fileJs = jsUrl;
        screenObj.params = {};
        if ( screenObj.cfg === null ) {
            screenObj.cfg = {};
        }

        _screen[p_screenPath] = screenObj;

        return screenObj;
    }

    function _destroyScreenByPath(p_screenPath) {
        
        if(_screen.hasOwnProperty(p_screenPath)) {

            if ( p_screenPath === "#" ) {
                throw "Welcome screen cannot be deleted";
            }


            var hash = document.location.hash;

            // if url=http://example.com/#, the document.location.hash="" empty string
            // check if current screen is welcome screen (hash !== "")
            // check if the current hash belongs to the path to delete
            if ( hash !== "#" && hash !== "" && (p_screenPath.indexOf(hash) === 0 || hash.indexOf(p_screenPath) === 0) ) {
                throw "Cannot delete the current screen or its parents";
            }

            _destroyScreen(p_screenPath);
            
        } else {
            iris.log("Error removing the screen \"" + p_screenPath + "\", path not found.");
        }
    }

    function _destroyScreen (path) {

        var screen = _screen[path];

        // the screen can be register using self.screens() but no instanciated using navigation
        if ( screen !== undefined ) {

            // destroy child screens
            if ( screen.screenChilds !== undefined ) {
                for (var i = 0; i < screen.screenChilds.length; i++ ) {
                    _destroyScreen(screen.screenChilds[i]);
                }
            }

            screen._destroy();
            screen.get().remove();
            delete _jsUrlScreens[_screenJsUrl[path]];
            delete _screen[path];
            delete _screenJsUrl[path];
            delete _screenContainer[path];
        }

    }


    var Settable = function() {
        this.cfg = null;
    };

    Settable.prototype = new iris.Event();

    Settable.prototype.settings = function(p_settings) {
        if ( this.cfg === null ) {
            this.cfg = {};
        }

        return $.extend(this.cfg, p_settings);
    };

    Settable.prototype.setting = function(p_label, p_value) {
        if(p_value === undefined) {
            if(!this.cfg.hasOwnProperty(p_label)) {
                iris.log("setting " + p_label + " not found", this.cfg, this);
            }
            return this.cfg[p_label];
        } else {
            this.cfg[p_label] = p_value;
        }
    };


    var Component = function() {

        this.APPEND = "append";
        this.REPLACE = "replace";
        this.PREPEND = "prepend";

        this.id = null;
        this.fileJs = null;
        this.fileTmpl = null;
        this.template = null;
        this.uis = null; // child UIs
        this.uisMap = null; // UIs sorted by id
        this.con = null; // JQ container
        this.sleeping = null;
        this.el = null; // cached elements
        this.events = null;
    };

    Component.prototype = new Settable();

    Component.prototype._sleep = function() {
        for(var f = 0, F = this.uis.length; f < F; f++) {
            this.uis[f]._sleep();
        }
        this.sleeping = true;
        this.sleep();
    };

    Component.prototype._awake = function(p_params) {
        this.sleeping = false;
        this.awake(p_params);
        for(var f = 0, F = this.uis.length; f < F; f++) {
            if (this.uis[f].sleeping !== false) {
                this.uis[f]._awake();
            }
        }
    };

    Component.prototype._destroy = function() {
        if(!this.sleeping) {
            this._sleep();
        }

        // propage destroys
        for(var f = 0, F = this.uis.length; f < F; f++) {
            this.uis[f]._destroy();
        }

        // remove component events
        for ( var eventName in this.events ) {
            iris.destroyEvents(eventName, this.events[eventName]);
        }
        this.destroy();

        this.uis = null;
        this.events = null;
    };

    Component.prototype._tmpl = function(p_htmlUrl, p_mode) {

        var f, childrens, tmpl;
        
        if (this.template !== null) {
            throw "self.tmpl() has already been called in '" + this.fileJs + "'";
        }
        
        this.fileTmpl = p_htmlUrl;

        tmpl = $( _parseLangTags(_includes[p_htmlUrl]) );

        this.template = tmpl;
        if(tmpl.size() > 1) {
            throw "'" + p_htmlUrl + "' must have only one root node";
        }
        switch(p_mode) {
            case this.APPEND:
                this.con.append(tmpl);
                break;
            case this.REPLACE:
                this.con.replaceWith(tmpl);
                this.con = {selector: this.con.selector};
                break;
            case this.PREPEND:
                this.con.prepend(tmpl);
                break;
            default:
                throw "Unknown template mode '" + p_mode + "'";
        }

        // Process elements with data-* attributes
        this.el = {};
        this.inflateTargets = {};

        // The tmpl root node
        this._data_attrs(tmpl);

        // And all tmpl child nodes
        childrens = tmpl.get(0).getElementsByTagName("*");
        for (f = childrens.length; f--;) {
            this._data_attrs( $(childrens[f]) );
        }
    };

    Component.prototype._data_attrs = function ($el) {
        var f, key, attr, attrs = $el.get(0).attributes,
            inflate, inflateFormats = {}, inflatesByKeys = {},
            target, targetParams, format, formatParams, formatMatches
            ;

        for (f = attrs.length; f--;) {
            attr = attrs[f];

            if ( attr.name.indexOf("data-") === 0 ) {
                key = attr.name.substr(5);
            } else {
                continue;
            }

            // data-id
            if ( key === "id" ) {
                this.el[ attr.value ] = $el;
                continue;
            }

            // data-*-format
            if ( key.indexOf("-format", key.length - 7) !== -1 ) {
                format = attr.value;
                formatParams = undefined;

                if ( format && FORMAT_REG_EXP.test(format) ) {
                    formatMatches = format.match(FORMAT_REG_EXP);

                    format = formatMatches[1];
                    formatParams = formatMatches[2]; // TODO manage multiple parameter using: formatParams[2].splice(",");
                }
                // inflateFormats key = "jq-xxxx-format" -> "xxxx"
                inflateFormats[ key.substr(3, key.length - 10) ] = { key: format, params: formatParams };
                continue;
            }

            if ( key.indexOf("jq-") === 0 ) {
                key = key.substr(3);
                if ( /^(text|html|val|toggle)$/.test(key) ) {
                    target = key;

                } else if ( /^(prop-|attr-)/.test(key) ) {
                    target = key.substr(0, 4);
                    targetParams = key.substr(5);

                } else {
                    // Other data-* attribute
                    continue;
                }
            }

            if ( !this.inflateTargets.hasOwnProperty(attr.value) ) {
                this.inflateTargets[ attr.value ] = [];
            }

            inflate = { target: target, targetParams: targetParams, el: $el };

            this.inflateTargets[ attr.value ].push( inflate );
            inflatesByKeys[key] = inflate;
        }

        // After of iterate the element data attributes, set the formatting to each target
        for ( key in inflateFormats ) {
            if ( inflatesByKeys.hasOwnProperty(key) ) {
                inflatesByKeys[key].format = inflateFormats[key].key;
                inflatesByKeys[key].formatParams = inflateFormats[key].params;
            }
        }
    };

    Component.prototype.inflate = function(data) {

        var dataKey, f, F, targets, inflate, format, unformattedValue, value;

        for ( dataKey in this.inflateTargets ) {
            unformattedValue = iris.val(data, dataKey);

            if ( unformattedValue !== undefined ) {

                targets = this.inflateTargets[dataKey];

                for ( f = 0, F = targets.length; f < F; f++ ) {
                    inflate = targets[f];

                    switch ( inflate.format ) {
                        case "date":
                            value = iris.date(unformattedValue, inflate.formatParams);
                            break;
                        case "currency":
                            value = iris.currency(unformattedValue);
                            break;
                        case "number":
                            value = iris.number(unformattedValue);
                            break;
                        default:
                            value = unformattedValue;
                    }

                    switch ( inflate.target ) {
                        case "text":
                            inflate.el.text(value);
                            break;
                        case "html":
                            inflate.el.html(value);
                            break;
                        case "val":
                            inflate.el.val(value);
                            break;
                        case "toggle":
                            inflate.el.toggle(value);
                            break;
                        case "prop":
                            inflate.el.prop(inflate.targetParams, value);
                            break;
                        case "attr":
                            inflate.el.attr(inflate.targetParams, value);
                    }
                }
            }
        }
    };

    // Check if the template is set (https://github.com/intelygenz/iris/issues/19)
    Component.prototype._checkTmpl = function() {
        if(this.template === null) {
            throw "Set a template using self.tmpl() in '" + this.fileJs + "'";
        }
    };

    Component.prototype.show = function() {
        this._checkTmpl();
        this.template.show();
    };

    Component.prototype.hide = function() {
        this._checkTmpl();
        this.template.hide();
    };

    Component.prototype.get = function(p_id) {
        this._checkTmpl();

        if(p_id) {

            if(!this.el.hasOwnProperty(p_id)) {
                var id = "[data-id=" + p_id + "]",
                filter = this.template.filter(id),
                $element = null;

                if(filter.length > 0) {
                    $element = filter;
                } else {
                    var find = this.template.find(id);
                    if(find.size() > 0) {
                        $element = find;
                    }
                }

                if($element === null) {
                    throw "[data-id=" + p_id + "] not found in '" + this.fileTmpl + "' used by '" + this.fileJs + "'";
                } else if($element.size() > 1) {
                    throw "[data-id=" + p_id + "] must be unique in '" + this.fileTmpl + "' used by '" + this.fileJs + "'";
                }

                this.el[p_id] = $element;
            }

            return this.el[p_id];
        }

        return this.template;
    };

    Component.prototype._ui = function(p_id, p_jsUrl, p_uiSettings, p_templateMode) {
        if ( p_jsUrl === undefined ) {
            
            // Get UI
            return this.uisMap[p_id];

        } else {
            // Create UI
            return this._createUi(p_id, p_jsUrl, p_uiSettings, p_templateMode);
        }
    };

    Component.prototype._createUi = function(p_id, p_jsUrl, p_uiSettings, p_templateMode) {
        var $container = this.get(p_id);
        
        if($container !== undefined && $container.size() === 1) {
            var uiInstance = _instanceUI($container, $container.data("id"), p_jsUrl, p_uiSettings, p_templateMode, this);
            if (uiInstance._tmplMode === undefined || uiInstance._tmplMode === uiInstance.REPLACE) {
                this.el[p_id] = undefined;
            }
            this.uis.push(uiInstance);

            // Add uiInstance to the UIs map
            if ( uiInstance._tmplMode === uiInstance.REPLACE ) {
                this.uisMap[p_id] = uiInstance;
            } else {
                if ( !this.uisMap.hasOwnProperty(p_id) ) {
                    this.uisMap[p_id] = [];
                }
                this.uisMap[p_id].push(uiInstance);
            }
            
            return uiInstance;
        } else {
            throw "The container does not exist or has been replaced.";
        }
    };


    Component.prototype.destroyUI = function(p_ui) {
        if ( p_ui === undefined ) {
            // Self destroy
            this.parentComponent.destroyUI(this);
        } else {
            var idx;

            // Remove p_ui from the UIs array
            idx = $.inArray(p_ui, this.uis);
            if ( idx !== -1 ) {
                this.uis.splice(idx, 1);
            }

            // Remove p_ui from the UIs map
            if ( p_ui._tmplMode === p_ui.REPLACE ) {
                this.uisMap[p_ui.id] = null;
                delete this.uisMap[p_ui.id];
            } else {
                var uis = this.uisMap[p_ui.id];

                idx = $.inArray(p_ui, uis);
                if ( idx !== -1 ) {
                    uis.splice(idx, 1);
                }
            }

            // Destroy p_ui
            p_ui._destroy();
            p_ui.get().remove();
        }
    };

    Component.prototype.destroyUIs = function(id) {
        var uis = this.uisMap[id];
        if ( $.isArray(uis) ) {
            var f, F;
            for ( f=uis.length-1; f >= 0; f-- ) {
                this.destroyUI(uis[f]);
            }

        } else if ( uis && uis._tmplMode === this.REPLACE ) {
            // uis is a single UI
            this.destroyUI(uis);
        }
    };

    Component.prototype.container = function() {
        return this.con;
    };

    //
    // To override functions
    //
    Component.prototype.create = function() {};

    Component.prototype.awake = function() {};

    Component.prototype.canSleep = function() {
        return true;
    };

    Component.prototype.sleep = function() {};

    Component.prototype.destroy = function() {};


    //
    // UI
    //
    var UI = function() {
        this._tmplMode = "replace";
    };

    UI.prototype = new Component();

    UI.prototype.tmplMode = function(p_mode) {
        this._tmplMode = p_mode;
    };

    UI.prototype.tmpl = function(p_htmlUrl) {
        this._tmpl(p_htmlUrl, this._tmplMode);
    };

    UI.prototype.ui = function(p_id, p_jsUrl, p_uiSettings, p_templateMode) {
        return this._ui(p_id, p_jsUrl, p_uiSettings, p_templateMode);
    };


    //
    // SCREEN
    //
    var Screen = function() {
        this.screenConId = null;
        this.params = null;
    };

    Screen.prototype = new Component();

    Screen.prototype.param = function(p_key) {
        return this.params[p_key];
    };

    Screen.prototype.ui = function(p_id, p_jsUrl, p_uiSettings, p_templateMode) {
        if ( p_id === this.screenConId ) {
            throw "'" + p_id + "' has already been registered as a screen container";
        }

        return this._ui(p_id, p_jsUrl, p_uiSettings, p_templateMode);
    };

    Screen.prototype.tmpl = function(p_htmlUrl) {
        this._tmpl(p_htmlUrl, this.APPEND);
    };

    Screen.prototype.screens = function(p_containerId, p_screens) {

        this.screenConId = p_containerId;

        if (this.hasOwnProperty("screenChilds")) {
            throw "Multiple calls to self.screens() are not allowed: " + this.id;

        } else if (this.template === null){
            throw "self.tmpl() must be called before self.screens(): " + this.id;

        } else {
            var $cont = this.get(p_containerId);
            this.screenChilds = [];

            for ( var i=0; i < p_screens.length; i++ ) {

                var screen = p_screens[i];
                var hashUrl = screen[0];
                if ( hashUrl.indexOf("#") !== -1 ) {
                    throw "[self.screens] incorrect screen path[" + hashUrl + "] cannot contain #";
                }
                hashUrl = this.id + "/" + hashUrl;

                var js = screen[1];
                if ( _jsUrlScreens.hasOwnProperty(js) ) {
                    throw "[self.screens] js-URL repeated '" + js + "': " + this.id;
                }

                if ( _screenContainer.hasOwnProperty(hashUrl) ) {
                    throw "[self.screens] hash-URL repeated  '" + hashUrl + "' in " + this.fileJs;
                }

                iris.log("Register screen hash[" + hashUrl + "] js[" + js + "]");

                _screenJsUrl[hashUrl] = js;
                _screenContainer[hashUrl] = $cont;
                _jsUrlScreens[js] = true;

                this.screenChilds[i] = hashUrl;
            }
        }
    };

    function _registerRes (resourceOrPath, path) {

        if ( typeof resourceOrPath === "string" ) {
            // resourceOrPath == path
            if ( !_includes.hasOwnProperty(resourceOrPath) ) {
                throw "add service[" + resourceOrPath + "] to iris.path";
            }
            return _includes[resourceOrPath];

        } else {
            // resourceOrPath == resource
            var serv = new iris.Resource();
            serv.cfg = {};
            serv.settings({ type: "json", path: "" });
            resourceOrPath(serv);

            _setInclude(serv, path, "resource");
        }

    }
    
    iris.screen = _registerScreen;
    iris.destroyScreen = _destroyScreenByPath;
    iris.welcome = _welcome;
    iris.navigate = _goto;
    iris.ui = _registerUI;
    iris.tmpl = _registerTmpl;
    iris.resource = _registerRes;
    iris.include = _load;

    //
    // Classes
    //
    iris.Settable = Settable;
    iris.Component = Component;
    iris.UI = UI;
    iris.Screen = Screen;

    _init();


})(jQuery);

(function() {

    var Resource = function() {};

    Resource.prototype = new iris.Settable();

    Resource.prototype.ajax = function(p_method, p_path, p_params, f_success, f_error) {

        return iris.ajax({
            "url": this.setting("path") + p_path,
            "type": p_method,
            "data": p_params,
            "cache": false,
            "dataType": this.setting("type"),
            "async": true,
            "success": f_success,
            "error": function (p_request, p_textStatus, p_errorThrown) {

                iris.notify(iris.RESOURCE_ERROR, {request: p_request, status: p_textStatus, error: p_errorThrown});

                if ( f_error !== undefined ) {
                    f_error( p_request, p_textStatus, p_errorThrown );
                }
            }
        });
    };

    Resource.prototype.get = function(p_path, f_success, f_error) {
        return this.ajax("GET", p_path, null, f_success, f_error);
    };

    Resource.prototype.del = function(p_path, f_success, f_error) {
        return this.ajax("DELETE", p_path, null, f_success, f_error);
    };

    Resource.prototype.put = function(p_path, p_params, f_success, f_error) {
        return this.ajax("PUT", p_path, p_params, f_success, f_error);
    };

    Resource.prototype.post = function(p_path, p_params, f_success, f_error) {
        return this.ajax("POST", p_path, p_params, f_success, f_error);
    };

    iris.Resource = Resource;

})();
