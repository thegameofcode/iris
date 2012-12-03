(function($, window) {

    var iris = window.iris;

    var _globals = {},
        _locals = {},
        _locale = null,
        _config = {},
        _appBaseUri = "",
        _env;

    //
    // Configuration
    //
    function _getOrSetConfig(p_json) {
        if(typeof p_json === "object") {
            _configLoad(p_json);
        } else {
            return _config;
        }
    }

    function _configLoad(p_json) {
        if(p_json) {
            $.extend(_config, p_json);

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

            _addGlobal(_config.global);
            _addLocal(_config.local);
        }
        return _config;
    }

    function _getEnv(p_env) {
        if(p_env) {
            _env = p_env;
        } else {
            return _env;
        }
    }

    //
    // Global
    //


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


    //
    // Local
    //
    function _addLocal(p_hash) {
        $.extend(_locals, p_hash);
        return _local;
    }

    function _getOrSetLocal(p_label, p_value) {
        if(p_label && p_value !== undefined) {
            if ( _locals[p_label] === undefined ) {
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



    iris.config = _getOrSetConfig;
    iris.env = _getEnv;
    iris.global = _global;
    iris.local = _local;
    iris.baseUri = _baseUri;



})(jQuery, window);