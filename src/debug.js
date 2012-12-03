(function($, window) {

    var iris = {};
    window.iris = iris;


    var _log = {
        "error": true
    };

    var _logPrefix = "",
        _hasConsole, _JQ_MIN_VER = 1.5;


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

    function _logOf(p_type) {
        if(typeof _log === "undefined") {
            var log = iris.config().log;
            if(log) {
                var logConfig = log[iris.env()];
                var logs = logConfig.split(",");
                for(var i = 0; i < logs.length; i++) {
                    _log[$.trim(logs[i])] = true;
                }
            }

            _logPrefix = "[" + iris.env() + "]";
        }
        return _log[p_type];
    }

    function _logMsg() {
        if(_hasConsole && window.console.log) {
            window.console.log(_logPrefix, arguments);
        }
    }

    function _logDebug() {
        if(_hasConsole && _logOf("debug")) {
            window.console.debug(_logPrefix, arguments);
        }
    }

    function _logWarning() {
        if(_hasConsole && _logOf("warning")) {
            window.console.warn(_logPrefix, arguments);
        }
    }

    function _logError() {
        if(_hasConsole && _logOf("error")) {
            window.console.error(_logPrefix, arguments);
        }
    }


    iris.l = _logMsg;
    iris.d = _logDebug;
    iris.w = _logWarning;
    iris.e = _logError;

    _init();

})(jQuery, window);