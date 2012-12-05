(function ($) {

    /** @deprecated */
    iris.net = {};

    /** @deprecated */
    iris.util = {};

    /** @deprecated */
    iris.config = {};

    /** @deprecated */
    iris.config.Load = iris.settings;
    
    


    /** @deprecated */
    iris.global = {};

    /** @deprecated */
    iris.global.Load = iris.setting;
    
    /** @deprecated */
    iris.global.Data = iris.setting;


    /** @deprecated */
    iris.local = {};

    /** @deprecated */
    iris.local.Load = iris.envSetting;
    
    /** @deprecated */
    iris.local.Data = iris.envSetting;


    /** @deprecated */
    iris.lang = {};

    /** @deprecated */
    iris.lang.Load = iris.translations;
    
    /** @deprecated */
    iris.lang.LoadFrom = iris.translations;
    
    /** @deprecated */
    iris.lang.Get = iris.translate;
    
    /** @deprecated */
    iris.lang.Locale = iris.locale;





    /** @deprecated */
    iris.event = {};
    
    /** @deprecated */
    iris.event.BEFORE_NAVIGATION = iris.BEFORE_NAVIGATION;



    
    /** @deprecated */
    iris.event.Subscribe = iris.on;
    
    /** @deprecated */
    iris.event.Notify = iris.notify;
    
    /** @deprecated */
    iris.event.Remove = iris.off;
    



    /** @deprecated */
    iris.net.BaseUri = iris.baseUri;
    
    /** @deprecated */
    iris.net.Ajax = iris.ajax;
    
    /** @deprecated */
    iris.net.CacheVersion = iris.cacheVersion;




    /** @deprecated */
    iris.Include = iris.include;
    
    /** @deprecated */
    iris.screenAux = iris.screen;

    /** @deprecated */
    iris.Screen = iris.screenAux;

    /** @deprecated */
    iris.screen = {};

    /** @deprecated */
    iris.Screen = iris.screenAux;

    /** @deprecated */
    iris.screen.WelcomeScreen = iris.welcome;
    
    /** @deprecated */
    iris.screen.Destroy = iris.destroyScreen;


    
    /** @deprecated */
    function _HashToJq(p_hash, p_$obj, p_filter){
        var dom = p_$obj.get(0);
        if ( p_filter ){
            var filter;
            for ( var f=0, F=p_filter.length; f<F; f++ ){
                filter = p_hash[p_filter[f]];
                if ( filter ) {
                    dom.setAttribute(p_filter[f], filter);
                }
            }
        }
        else {
            for ( var label in p_hash){
                if ( p_hash.hasOwnProperty(label) ) {
                    dom.setAttribute(label, p_hash[label]);
                }
            }
        }
        return p_$obj;
    }

    /** @deprecated */
    function _JqToHash(p_$obj) {
        var hash = {};
        var attrs = p_$obj.get(0).attributes;
        var label;
        for( var f=0, F=attrs.length; f<F; f++ ) {
            label = attrs[f].name;
            if ( label.indexOf("data-") === 0 ){
                label = label.substr(5);
            }
            hash[label] = attrs[f].value;
        }
        return hash;
    }

    var ComPro = iris.Component.prototype;
    ComPro.InstanceUI = ComPro.ui;
    ComPro.Show = ComPro.show;
    ComPro.Hide = ComPro.hide;
    ComPro.$Get = ComPro.get;
    ComPro.DestroyUI = ComPro.destroyUI;
    ComPro.DestroyAllUIs = ComPro.destroyUIs;
    ComPro.$Container = ComPro.container;
    ComPro.TEMPLATE_APPEND = ComPro.APPEND;
    ComPro.TEMPLATE_REPLACE = ComPro.REPLACE;
    ComPro.TEMPLATE_PREPEND = ComPro.PREPEND;


    var UIPro = iris.UI.prototype;
    UIPro.TemplateMode = UIPro.tmplMode;
    UIPro.Template = UIPro.tmpl;

    var ScreenPro = iris.Screen.prototype;
    ScreenPro.AddScreen = ScreenPro.screen;
    ScreenPro.Template = ScreenPro.tmpl;
    
    var SettingPro = iris.Setting.prototype;
    SettingPro.Settings = SettingPro.settings;
    SettingPro.Setting = SettingPro.setting;

    
    /** @deprecated */
    var uiAux = iris.ui;

    /** @deprecated */
    iris.ui = {};

    /** @deprecated */
    iris.UI = uiAux;

    /** @deprecated */
    iris.ui.JqToHash = _JqToHash;
    
    /** @deprecated */
    iris.ui.HashToJq = _HashToJq;




    
    /** @deprecated */
    iris.util.DateFormat = iris.date;
    
    /** @deprecated */
    iris.util.Currency = iris.currency;

    /** @deprecated */
    function _Deserialize (p_$form, p_data) {
        var element, tag, value;
        for ( var name in p_data ) {
            if ( p_data.hasOwnProperty(name) ) {
                element = p_$form.find('[name="' + name + '"]');
                
                if ( element.length > 0 ) {
                    tag = element[0].tagName.toLowerCase();
                    value = p_data[name];
                    switch (tag) {
                    case "select":
                    case"textarea":
                        $(element).val(value);
                        break;
                    case "input":
                        switch (tag) {
                        case "checkbox":
                            if (value) {
                                element.attr("checked", "checked"); 
                            }
                            break;
                        case "radio":
                            element.filter('[value="' + value + '"]').attr("checked", "checked");
                            break;
                        default:
                            element.val(value);
                        }
                    }
                }
            }
        }
    }
    /** @deprecated */
    iris.util.Deserialize = _Deserialize;

    /** @deprecated */
    function _Serialize (p_$form) {
        var json = {};
        $.map(p_$form.serializeArray(), function(p_obj){
            json[ p_obj.name ] = p_obj.value;
        });
        return json;
    }
    /** @deprecated */
    iris.util.Serialize = _Serialize;
    
    /** @deprecated */
    iris.Goto = iris.goto;
    
    /** @deprecated */
    iris.AddOn = function (f_addon){
        iris.addOn(
            function (self) {

                self.Settings = self.settings;
                self.Setting = self.setting;

                self.Create = self.create;

                self.AddAll = self.addAll;
                self.Add = self.add;
                self.Remove = self.remove;
                self.Get = self.get;
                self.Size = self.size;
                self.UIAddOn = self.addOn;

                f_addon(self);
            }
        );
    };
    
    
    /** @deprecated */
    iris.Regional = iris.regional;

/*

    //
    // ADDON
    //

    var _addOns = {}

    var AddOn = function() {
        this._components = null;
    };

    AddOn.prototype = new Settable();

    AddOn.prototype.addAll = function(p_uis) {
        for(var f = 0, F = p_uis.length; f < F; f++) {
            this.add(p_uis[f]);
        }
    };

    AddOn.prototype.add = function(p_ui) {
        if(this.hasOwnProperty("addOn")) {
            this.addOn(p_ui);
        }
        this._components.push(p_ui);
    };

    AddOn.prototype.remove = function(p_ui) {
        for(var f = 0, F = this._components.length; f < F; f++) {
            if(this._components[f] === p_ui) {
                this._components.splice(f, 1);
            }
        }
    };

    AddOn.prototype.get = function(p_idx) {
        return this._components[p_idx];
    };

    AddOn.prototype.size = function() {
        return this._components.length;
    };

    // To override
    AddOn.prototype.create = function() {};


    function _applyAddOn(p_id, p_uis, p_settings) {
        iris.include(p_id);

        var addOn = new AddOn();
        addOn._components = [];
        addOn.cfg = {};

        _addOns[p_id](addOn);
        addOn.settings(p_settings);
        addOn.addAll(p_uis);
        addOn.create();
        return addOn;
    }

    function _createAddOn(f_addOn) {
        _addOns[_lastIncludePath] = f_addOn;
    }

    

iris.AddOn = _createAddOn;
iris.ApplyAddOn = _applyAddOn;
*/

// Log

var _log = {
        "error": true
    };

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

iris.l = _logMsg;
    iris.d = _logDebug;
    iris.w = _logWarning;
    iris.e = _logError;










var _globals = {},
        _locals = {},
        _config = {},
        _env, _logPrefix = "",
        _hasConsole,
        _cache;

    function _addConfigurations(p_json) {
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
        var log = _config.log;
        if(log) {
            var logConfig = log[iris.env()];
            var logs = logConfig.split(",");
            for(var i = 0; i < logs.length; i++) {
                _log[$.trim(logs[i])] = true;
            }
        }

        _logPrefix = "[" + iris.env() + "]";

        // set cache
        var currentEnv = iris.env();
        _cache = true;
        if(_config.hasOwnProperty("environments-nocache")) {
            var envNocache = _config["environments-nocache"].split(",");
            for(var f = 0, F = envNocache.length; f < F; f++) {
                if(envNocache[f] === currentEnv) {
                    _cache = false;
                    break;
                }
            }
        }

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

    function _setting(p_labelOrObject, p_value) {
        if(typeof p_labelOrObject === "object") {
            _addGlobal(p_labelOrObject);
        } else {
            return _getOrSetGlobal(p_labelOrObject, p_value);
        }
    }


    // Local

    function _addLocal(p_hash) {
        $.extend(_locals, p_hash);
        return _locals;
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

    function _envSetting(p_labelOrObject, p_value) {
        if(typeof p_labelOrObject === "object") {
            _addLocal(p_labelOrObject);
        } else {
            return _getOrSetLocal(p_labelOrObject, p_value);
        }
    }

    

    

    /** @deprecated */
    iris.config.Env = _getEnv;





})(jQuery);
