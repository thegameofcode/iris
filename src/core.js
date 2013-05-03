(function($) {

    var _JQ_MIN_VER = 1.5,
        _appBaseUri,
        _cache,
        _cacheVersion,
        _logEnabled,
        _logger;

    //
    // Private
    //
    function _init() {

        if ( typeof jQuery === "undefined" ) {
            throw "jQuery " + _JQ_MIN_VER + "+ previous load required";
        } else if($().jquery < _JQ_MIN_VER) {
            throw "jQuery " + $().jquery + " currently loaded, jQuery " + _JQ_MIN_VER + "+ required";
        }

        if ( window.console && window.console.log && Function.prototype.bind ) {
            _logger = Function.prototype.bind.call(window.console.log, window.console);
        }

        var isLocalEnv = urlContains("localhost", "127.0.0.1");
        _logEnabled = isLocalEnv;
        _cache = !isLocalEnv;

        iris.on("iris-reset", _init);
    }

    function urlContains (args) {
        for(var i = 0 ; i< args.length; i++) {
            if ( document.location.href.indexOf(args[i]) > -1 ) {
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
        if ( _logger && _logEnabled ) {
            _logger.apply(this, arguments);
        }
    };

    iris.enableLog = function () {
        if ( arguments.length > 0 ) {
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
    
    
    _init();

})(jQuery);
