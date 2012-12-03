(function($) {

    var iris = {};
    window.iris = iris;

    var _globals = {},
        _locals = {},
        _locale = null,
        _config = {},
        _appBaseUri = "",
        _env, _logPrefix = "",
        _hasConsole, _JQ_MIN_VER = 1.5;

    var _log = {
        "error": true
    };

    function _init() {
        // CHECK JQ DEPENDENCY
        if(typeof jQuery === "undefined") {
            iris.e("jQuery " + _JQ_MIN_VER + "+ previous load required");
        } else if($().jquery < _JQ_MIN_VER) {
            iris.e("jQuery " + $().jquery + " currently loaded, jQuery " + _JQ_MIN_VER + "+ required");
        }

        // CHECK CONSOLE SUPPORT
        _hasConsole = (window.console && window.console.debug && window.console.warn && window.console.error);
        if(!_hasConsole && window.console && window.console.log) {
            window.console.log("advanced console not supported");
        }
    }


    // Log

    function _logMsg() {
        if(_hasConsole && window.console.log) {
            window.console.log(_logPrefix, arguments);
        }
    }

    function _logDebug() {
        if(_hasConsole && _log["debug"]) {
            window.console.debug(_logPrefix, arguments);
        }
    }

    function _logWarning() {
        if(_hasConsole && _log["warning"]) {
            window.console.warn(_logPrefix, arguments);
        }
    }

    function _logError() {
        if(_hasConsole && _log["error"]) {
            window.console.error(_logPrefix, arguments);
        }
    }


    // Configuration

    function _getOrSetConfig(p_json) {
        if(typeof p_json === "object") {
            _configLoad(p_json);
        } else {
            return _config;
        }
    }

    function _configLoad(p_json) {
        $.extend(_config, p_json);

        // set environment
        _env = _config["environment-default"];
        for(var p in _config.environment) {
            if(document.location.href.indexOf(p) > -1) {
                _env = _config.environment[p];
                break;
            }
        }
        if(!_env) {
            _env = "pro";
        }

        // set log level
        var log = iris.config().log;
        if(log) {
            var logConfig = log[iris.env()];
            var logs = logConfig.split(",");
            for(var i = 0; i < logs.length; i++) {
                _log[$.trim(logs[i])] = true;
            }
        }

        _logPrefix = "[" + iris.env() + "]";

        // add configuration values
        _addGlobal(_config.global);
        _addLocal(_config.local);

        return _config;
    }

    function _getEnv(p_env) {
        if(p_env) {
            _env = p_env;
        } else {
            return _env;
        }
    }

    // Global

    function _addGlobal(p_hash) {
        $.extend(_globals, p_hash);
        return _globals;
    }

    function _getOrSetGlobal(p_label, p_value) {
        if(p_label && p_value !== undefined) {
            _globals[p_label] = p_value;
        } else if(p_label) {
            return _globals[p_label];
        } else {
            return _globals;
        }
    }

    function _global(p_labelOrObject, p_value) {
        if(typeof p_labelOrObject === "object") {
            _addGlobal(p_labelOrObject);
        } else {
            return _getOrSetGlobal(p_labelOrObject, p_value);
        }
    }


    // Local

    function _addLocal(p_hash) {
        $.extend(_locals, p_hash);
        return _local;
    }

    function _getOrSetLocal(p_label, p_value) {
        if(p_label && p_value !== undefined) {
            if(_locals[p_label] === undefined) {
                _locals[p_label] = {};
            }
            _locals[p_label][_env] = p_value;
        } else if(p_label) {
            return _locals[p_label][_env];
        } else {
            return _locals;
        }
    }

    function _local(p_labelOrObject, p_value) {
        if(typeof p_labelOrObject === "object") {
            _addLocal(p_labelOrObject);
        } else {
            return _getOrSetLocal(p_labelOrObject, p_value);
        }
    }

    function _baseUri(p_baseUri) {
        if(p_baseUri !== undefined) {
            _appBaseUri = p_baseUri;
        } else {
            var base = document.getElementsByTagName("base");
            base = base.length > 0 ? base[0].attributes.href.value : "/";
            _appBaseUri = document.location.protocol + "//" + document.location.host + base;
        }
        return _appBaseUri;
    }


    iris.l = _logMsg;
    iris.d = _logDebug;
    iris.w = _logWarning;
    iris.e = _logError;
    iris.config = _getOrSetConfig;
    iris.env = _getEnv;
    iris.global = _global;
    iris.local = _local;
    iris.baseUri = _baseUri;

    _init();

})(jQuery);