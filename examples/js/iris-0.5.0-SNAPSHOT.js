/*! Iris - v0.5.0-SNAPSHOT - 2012-12-05
* http://iris-js.github.com/iris
* Copyright (c) 2012 Iris; Licensed New-BSD */

var iris = {};

// Expose iris to the global object
window.iris = iris;

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
    function init() {

        if ( typeof jQuery === "undefined" ) {
            throw "jQuery " + _JQ_MIN_VER + "+ previous load required";
        } else if($().jquery < _JQ_MIN_VER) {
            throw "jQuery " + $().jquery + " currently loaded, jQuery " + _JQ_MIN_VER + "+ required";
        }

        _hasConsole = ( window.console && window.console.log );

        _logEnabled = urlContains("localhost", "127.0.0.1");
    }

    function urlContains () {
        for(var host in arguments) {
            if ( document.location.href.indexOf(host) > -1 ) {
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
            return _logEnabled;
        }
    };


    init();

})(jQuery);


(function ($) {

    // static object to store all app callbacks
    var _events = {};

    iris.on = function (p_eventName, f_func) {
        if ( !_events.hasOwnProperty(p_eventName) ) {
            _events[p_eventName] = [];
        }

        var callbacks = _events[p_eventName];
        var index = callbacks.indexOf(f_func);
        if ( index === -1 ) {
            callbacks.push(f_func);
        }

    };

    iris.off = function (p_eventName, f_func){
        var callbacks = _events[p_eventName];
        if ( callbacks ){
            callbacks.splice(callbacks.indexOf(f_func), 1);
        }
    };

    iris.notify = function (p_eventName, p_data){
        if ( _events[p_eventName] ) {
            var callbacks = _events[p_eventName];
            for ( var i=0; i < callbacks.length; i++ ) {
                callbacks[i](p_data);
            }
        }
    };

    iris.destroyEvents = function (p_eventName, p_callbacks) {
        var callbacks = _events[p_eventName];
        if ( callbacks ) {
            for ( var i=0; i < p_callbacks.length; i++ ) {
                callbacks.splice(callbacks.indexOf(p_callbacks[i]), 1);
            }
        }
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
        if ( callbacks.indexOf(f_func) === -1 ) {
            callbacks.push(f_func);
            iris.on(p_eventName, f_func);
        }

    };

    eventPrototype.off = function (p_eventName, f_func){
        var callbacks = this.events[p_eventName];

        if ( callbacks ) {
            var index = callbacks.indexOf(f_func);

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


})(jQuery);

(function($) {

    var _translations = {};


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
            cache: iris.cache(),
            success: function _loadTranslationsSuccess(p_data) {
                _addTranslations(p_locale, p_data);
                iris.log("[translations]", p_data);

                if(p_settings && p_settings.hasOwnProperty("success")) {
                    p_settings.success(p_locale);
                }
            },
            error: function(p_err) {
                if(p_settings && p_settings.hasOwnProperty("error")) {
                    p_settings.error(p_locale);
                }
                throw "Error " + p_err.status + " loading lang file[" + p_uri + "]";
            }
        };


        if(iris.cache() && iris.cacheVersion()) {
            ajaxSettings.data = "_=" + iris.cacheVersion();
        }

        iris.ajax(ajaxSettings);
    }


    //
    // Public
    //

    iris.translations = function (p_label, p_value, p_settings) {
        if(typeof p_value === "object") {
            _addTranslations(p_label, p_value);
        } else {
            _loadTranslations(p_label, p_value, p_settings);
        }
    };

    iris.translate = function (p_label) {
        var value;
        var locale = iris.locale();
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

})(jQuery);
(function() {

    var _locale, _regional = {};

    iris.locale = function (p_locale, p_regional) {
        if ( typeof p_regional === "object" ) {
            if ( !_regional[p_locale] ) {
                _regional[p_locale] = {};
            }
            $.extend(_regional[p_locale], p_regional);

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
                throw "[regional] setting '" + p_label + "' not found for locale '" + _locale + "'";
            }
        } else {
            throw "[regional] for locale '" + _locale + "' not found";
        }
    };


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
        if(!p_format) {
            p_format = iris.regional("dateFormat");
        }

        if(typeof p_date !== "object") {
            p_date = new Date(Number(p_date));
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

    iris.currency = function (p_value) {
        var settings = iris.regional("currency");

        var val = Number(p_value);
        var format = (val >= 0) ? settings.formatPos : settings.formatNeg;

        var decimal = val % 1;
        var num = String(Math.abs(val - decimal));

        decimal = String(Math.abs(decimal).toFixed(settings.precision));
        decimal = decimal.substr(2);

        for(var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
            num = num.substring(0, num.length - (4 * i + 3)) + settings.thousand + num.substring(num.length - (4 * i + 3));
        }

        return format.replace("n", num + settings.decimal + decimal);
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

})(jQuery);
(function($) {

    var _screen = {},
        _screenUrl = {},
        _screenContainer = {},
        _lastScreen = {},
        _prevHash = "",
        _includes = {},
        _lastIncludePath, _head = $("head").get(0),
        _welcomeCreated = false,
        _gotoCancelled = false;

    function _welcome(p_jsUrl) {

        if ( window.console && window.console.log ) {
            window.console.log("[iris] noCache[" + iris.noCache() + "] enableLog[" + iris.enableLog() + "]");
        }

        _include(p_jsUrl); // TODO Must be async

        _welcomeCreated = true;

        var path = "";
        _screenUrl[path] = p_jsUrl;
        _screenContainer[path] = $(document.body);
        
        var screenObj = _instanceScreen(path);
        screenObj.id = "welcome-screen";
        screenObj.create();
        screenObj._awake();
        screenObj.show();

        // CHECK HASH SUPPORT
        if(!("onhashchange" in window)) {
            throw "hashchange event unsupported";
        } else {

            if(document.location.hash) {
                _onHashChange();
            }

            $(window).bind("hashchange", _onHashChange);
        }
    }

    function _goto(p_hashUri) {
        _prevHash = document.location.hash;
        document.location.hash = p_hashUri; // Trigger hashchange event, then execute _onHashChange()
    }

    function _onHashChange() {

        if(!_welcomeCreated) {
            throw "set the first screen using iris.welcome()";
        }

        iris.notify(iris.BEFORE_NAVIGATION);

        if(_gotoCancelled) {
            _gotoCancelled = false;
            return false;
        }

        var prev = _prevHash.split("/"),
            curr = document.location.hash.split("/"),
            prevPath = "",
            currPath = "",
            pathWithoutParams, hasRemainingChilds = false,
            i;

        // Check if all screen.canSleep() are true
        if(_prevHash !== "") {
            for(i = 0; i < prev.length; i++) {

                if(prev[i] !== "") {
                    prevPath += prev[i] + "/";
                    pathWithoutParams = _removeURLParams(prevPath);

                    if(_screen.hasOwnProperty(pathWithoutParams) && _screen[pathWithoutParams].canSleep() === false) {
                        _gotoCancelled = true;
                        document.location.hash = _prevHash;
                        return false;
                    }
                }
            }
        }
        prevPath = "";

        // Hide screens and its childs that are not showed
        if(prev.length > curr.length) {

            for(i = 0; i < prev.length; i++) {
                prevPath += prev[i] + "/";

                if(curr[i]) {
                    currPath += curr[i] + "/";
                }

                if(hasRemainingChilds || currPath !== prevPath) {
                    hasRemainingChilds = true;
                    pathWithoutParams = _removeURLParams(prevPath);

                    _screen[pathWithoutParams]._sleep();
                    _screen[pathWithoutParams].hide();
                }
            }
        }

        // Show child screens
        prevPath = "";
        currPath = "";
        hasRemainingChilds = false;
        for(i = 0; i < curr.length; i++) {
            currPath += curr[i] + "/";

            if(prev[i]) {
                prevPath += prev[i] + "/";
            }

            if(hasRemainingChilds || currPath !== prevPath) {
                hasRemainingChilds = true;

                pathWithoutParams = _removeURLParams(currPath);
                _showScreen(pathWithoutParams, _navGetParams(curr[i]));

            }
        }

        _prevHash = _removeLastSlash(currPath);
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


    //
    // INCLUDE
    //

    function _includeFiles() {
        for(var f = 0, F = arguments.length; f < F; f++) {
            _include(arguments[f]);
        }
    }

    function _include(p_uiFile) {

        if(!_includes.hasOwnProperty(p_uiFile)) {
            _includes[p_uiFile] = true;

            var fileUrl = p_uiFile.indexOf("http") === 0 ? p_uiFile : iris.baseUri() + p_uiFile;
            iris.log("[include]", fileUrl);

            if(p_uiFile.lastIndexOf(".css") > -1) {
                var link = document.createElement('link');
                link.rel = 'stylesheet';
                link.type = 'text/css';
                link.href = fileUrl;
                _head.appendChild(link);
            } else {
                var isHtml = p_uiFile.lastIndexOf(".html") > -1;

                var ajaxSettings = {
                    url: fileUrl,
                    dataType: (isHtml ? "html" : "text"),
                    async: false,
                    cache: iris.cache()
                };

                if(iris.cache() && iris.cacheVersion()) {
                    ajaxSettings.data = "_=" + iris.cacheVersion();
                }

                iris.ajax(ajaxSettings)
                    .done(function(p_data) {
                        _lastIncludePath = p_uiFile;

                        if(isHtml) {
                            _includes[p_uiFile] = _parseLangTags(p_data);
                        } else {
                            var script = document.createElement("script");
                            script.language = "javascript";
                            script.type = "text/javascript";
                            script.text = p_data;
                            _head.appendChild(script);
                        }

                    }).fail(function(p_err) {
                        delete _includes[fileUrl];
                        throw "error [" + p_err.status + "] loading file '" + fileUrl + "'";
                    });
            }
        }
    }

    function _parseLangTags(p_html) {
        var html = p_html;
        var matches = html.match(/@@[A-Za-z_\.]+@@/g);

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

    function _registerUI(f_ui) {
        _includes[_lastIncludePath] = f_ui;
    }

    function _instanceUI(p_$container, p_uiId, p_jsUrl, p_uiSettings, p_templateMode) {
        _include(p_jsUrl);

        var uiInstance = new UI();
        _includes[p_jsUrl](uiInstance);
        uiInstance.id = p_uiId;
        uiInstance.el = {};
        uiInstance.con = p_$container;
        uiInstance.uis = [];
        uiInstance.events = {};
        uiInstance.cfg = {};
        uiInstance.fileJs = p_jsUrl;
        if(p_templateMode !== undefined) {
            uiInstance._tmplMode = p_templateMode;
        }

        p_uiSettings = p_uiSettings === undefined ? {} : p_uiSettings;
        var jqToHash = _jqToHash(p_$container);

        $.extend(uiInstance.cfg, jqToHash, p_uiSettings);

        uiInstance.create(jqToHash, p_uiSettings);

        return uiInstance;
    }

    // @private

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

    function _registerScreen(f_screen) {
        _includes[_lastIncludePath] = f_screen;
    }

    function _instanceScreen(p_screenPath) {

        var jsUrl = _screenUrl[p_screenPath];
        _include(jsUrl);

        var screenObj = new Screen();
        _includes[jsUrl](screenObj);

        screenObj.id = p_screenPath;
        screenObj.el = {};
        screenObj.uis = [];
        screenObj.events = {};
        screenObj.con = _screenContainer[p_screenPath];
        screenObj.fileJs = jsUrl;

        _screen[p_screenPath] = screenObj;

        return screenObj;
    }

    function _destroyScreen(p_screenPath) {
        if(_screen.hasOwnProperty(p_screenPath)) {
            var contextId = _screen[p_screenPath].get().parent().data("screen_context");
            if(_lastScreen[contextId] === _screen[p_screenPath]) {
                delete _lastScreen[contextId];
            }
            _screen[p_screenPath]._destroy();
            _screen[p_screenPath].get().remove();
            delete _screen[p_screenPath];
        } else {
            iris.log("Error removing the screen \"" + p_screenPath + "\", path not found.");
        }
    }

    function _showScreen(p_screenPath, p_params) {

        if(!_screenContainer.hasOwnProperty(p_screenPath)) {
            throw "'" + p_screenPath + "' must be registered using self.screen()";
        } else {
            if(!_screen.hasOwnProperty(p_screenPath)) {
                var screenObj = _instanceScreen(p_screenPath);
                screenObj.create();
                screenObj.hide();
            }

            var currentScreen = _screen[p_screenPath];
            var contextId = currentScreen.get().parent().data("screen_context");
            if(_lastScreen.hasOwnProperty(contextId)) {
                var lastScreen = _lastScreen[contextId];
                lastScreen._sleep();
                lastScreen.hide();
            }
            currentScreen._awake(p_params ? p_params : {});
            currentScreen.show();

            _lastScreen[contextId] = currentScreen;
        }
    }

    function _tmplParse(p_html, p_data, p_htmlUrl) {
        var result = p_html,
            formatLabel, value, regExp = /##([0-9A-Za-z_\.]+)(?:\|(date|currency)(?:\(([^\)]+)\))*)?##/g,
            matches = regExp.exec(p_html);

        while(matches) {
            value = iris.val(p_data, matches[1]);

            if(value !== undefined) {
                formatLabel = matches[2];
                if(formatLabel) {
                    switch(formatLabel) {
                    case "date":
                        value = iris.date(value, matches[3]);
                        break;
                    case "currency":
                        value = iris.currency(value);
                        break;
                    default:
                        iris.log("Unknow template format label '" + formatLabel + "' in '" + p_htmlUrl + "'");
                    }
                }
            } else {
                iris.log("Template param '" + matches[1] + "' in '" + p_htmlUrl + "' not found", p_data);
            }

            result = result.replace(matches[0], value);

            matches = regExp.exec(p_html);
        }

        return result;
    }


    var Settable = function() {
        this.cfg = null;
    };

    Settable.prototype = new iris.Event();

    Settable.prototype.settings = function(p_settings) {
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
        this.con = null; // JQ container
        this.sleeping = null;
        this.el = null; // cached elements
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
        for(var f = 0, F = this.uis.length; f < F; f++) {
            this.uis[f]._awake();
        }
        this.sleeping = false;
        this.awake(p_params);
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

    Component.prototype._tmpl = function(p_htmlUrl, p_params, p_mode) {
        this.fileTmpl = p_htmlUrl;

        // TODO
        if(typeof p_htmlUrl === "undefined") {
            this.template = this.con;
            return this.template;
        }
        //
        _include(p_htmlUrl);

        var tmplHtml = p_params ? _tmplParse(_includes[p_htmlUrl], p_params, p_htmlUrl) : _includes[p_htmlUrl];
        var $tmpl = $(tmplHtml);

        this.template = $tmpl;
        if($tmpl.size() > 1) {
            throw "'" + p_htmlUrl + "' must have only one root node";
        }
        switch(p_mode) {
            case this.APPEND:
                this.con.append($tmpl);
                break;
            case this.REPLACE:
                this.con.replaceWith($tmpl);
                break;
            case this.PREPEND:
                this.con.prepend($tmpl);
                break;
            default:
                throw "Unknown template mode '" + p_mode + "'";
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

    Component.prototype.ui = function(p_id, p_jsUrl, p_uiSettings, p_templateMode) {
        var $container = this.get(p_id);
        if($container.size() === 1) {
            var uiInstance = _instanceUI($container, $container.data("id"), p_jsUrl, p_uiSettings, p_templateMode);
            this.uis[this.uis.length] = uiInstance;
            return uiInstance;
        }
    };


    Component.prototype.destroyUI = function(p_ui) {
        for(var f = 0, F = this.uis.length; f < F; f++) {
            if(this.uis[f] === p_ui) {
                this.uis.splice(f, 1);
                p_ui._destroy();
                p_ui.get().remove();
                break;
            }
        }
    };

    Component.prototype.destroyUIs = function(p_idOrJq) {
        var contSelector = typeof p_idOrJq === "string" ? "[data-id=" + p_idOrJq + "]" : p_idOrJq.selector;
        var ui;
        for(var f = 0, F = this.uis.length; f < F; f++) {
            ui = this.uis[f];

            if(ui.con.selector === contSelector) {
                this.uis.splice(f--, 1);
                F--;

                ui._destroy();
                ui.get().remove();
            }
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

    UI.prototype.tmpl = function(p_htmlUrl, p_params) {
        this._tmpl(p_htmlUrl, p_params, this._tmplMode);
    };


    //
    // SCREEN
    //
    var Screen = function() {};

    Screen.prototype = new Component();

    Screen.prototype.tmpl = function(p_htmlUrl, p_params) {
        this._tmpl(p_htmlUrl, p_params, this.APPEND);
    };

    Screen.prototype.screen = function(p_containerId, p_screenPath, p_jsUrl) {
        var $cont = this.get(p_containerId);

        if($cont.data("screen_context") === undefined) {

            // Set a unique screen context id to the screen container
            // like: #path/to/screen|containerid
            $cont.data("screen_context", this.id + "|" + p_containerId);
        }

        _screenUrl[p_screenPath] = p_jsUrl;
        _screenContainer[p_screenPath] = $cont;
    };

    
    
    iris.include = _includeFiles;
    iris.screen = _registerScreen;
    iris.destroyScreen = _destroyScreen;
    iris.welcome = _welcome;
    iris.navigate = _goto;
    iris.ui = _registerUI;



    // TODO Should be no public?
    iris.Settable = Settable;
    iris.Component = Component;
    iris.UI = UI;
    iris.Screen = Screen;


})(jQuery);

(function() {

    var Service = function() {};

    Service.prototype = new iris.Settable();

    Service.prototype.ajax = function(p_method, p_path, p_params, f_success, f_error) {

        var type = this.setting("type");
        var path = this.setting("path");

        iris.ajax({
            "url": (path ? path : "") + p_path,
            "type": p_method,
            "data": p_params,
            "cache": false,
            "dataType": (type ? type : "json"),
            "async": true,
            "success": f_success,
            "error": f_error // function (p_request, p_textStatus, p_errorThrown)
        });
    };

    Service.prototype.get = function(p_path, f_success, f_error) {
        this.ajax("GET", p_path, null, f_success, f_error);
    };

    Service.prototype.del = function(p_path, f_success, f_error) {
        this.ajax("DELETE", p_path, null, f_success, f_error);
    };

    Service.prototype.put = function(p_path, p_params, f_success, f_error) {
        this.ajax("PUT", p_path, p_params, f_success, f_error);
    };

    Service.prototype.post = function(p_path, p_params, f_success, f_error) {
        this.ajax("POST", p_path, p_params, f_success, f_error);
    };

    iris.service = function (f_service) {
        var serv = new Service();
        serv.cfg = {};
        f_service(serv);
        return serv;
    };

})();
