(function($) {

    var _JQ_MIN_VER = 1.5,
        _appBaseUri,
        _cache,
        _cacheVersion,
        _log,
        _logEnabled,
        _isLocalEnv;

    //
    // Private
    //
    function _init() {

        if ( typeof jQuery === "undefined" ) {
            throw "jQuery " + _JQ_MIN_VER + "+ previous load required";
        } else if($().jquery < _JQ_MIN_VER) {
            throw "jQuery " + $().jquery + " currently loaded, jQuery " + _JQ_MIN_VER + "+ required";
        }

        var console = window.console;
        if ( typeof console !== 'undefined' && typeof console.log === 'object' ) {
            var bind = Function.prototype.bind;
            if ( bind ) {
                // Fix IE 9 Problem with console.
                // http://stackoverflow.com/questions/5538972/console-log-apply-not-working-in-ie9
                _log = bind.call(console.log, console);
            } else {
                // Fix IE 8 Problem with console.
                // http://patik.com/blog/complete-cross-browser-console-log/
                _log = function () {
                    Function.prototype.call.call(console.log, console, Array.prototype.slice.call(arguments));
                };
            }
        } else if ( console && console.log ) {
            // Modern browser
            _log = console.log;
        }

        _isLocalEnv = urlContains("localhost", "127.0.0.1");
        _logEnabled = _isLocalEnv;
        _cache = !_isLocalEnv;

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
        if ( _logEnabled && _log ) {
            _log.apply(window.console, arguments);
        }
    };

    iris.enableLog = function () {
        if ( typeof arguments[0] === "boolean" ) {
            _logEnabled = arguments[0];

        } else if ( arguments.length > 0 ) {
            _logEnabled = urlContains.apply(this, arguments);
            
        } else {
            return _logEnabled;
        }
    };

    iris.noCache = function () {
        if ( arguments.length > 0 ) {
            _cache = !urlContains.apply(this, arguments);
        } else {
            return !_cache;
        }
    };

    iris.isLocalhost = function () {
        return _isLocalEnv;
    };
    
    _init();

})(jQuery);
