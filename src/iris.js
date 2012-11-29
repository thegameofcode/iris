/*
 * iris
 * https://github.com/iris-js/iris
 *
 * Copyright (c) 2012 Iris
 * Licensed under the New-BSD license.
 */

(function ($, window) {

  var   _CacheVersion,
        _JQ_MIN_VER = 1.5,
        _Env = null,
        _Log = {"error":true},
        _LogPrefix = "",
        _Screen = {},
        _ScreenUrl = {},
        _ScreenContainer = {},
        _LastScreen = {},
        _PrevHashUrl = "",
        _Global = {},
        _Local = {},
        _Locale = null,
        _Config = {},
        _Lang = {},
        _Event = {},
        _Includes = {},
        _AddOns = {},
        _AppBaseUri = "",
        _LastIncludePath,
        _Head = $("head").get(0),
        _Cache = true,
        _HasConsole,
        _GotoCancelled = false,
        _welcomeCreated = false
    ;
    
    function _welcome (p_jsUrl) {
        
        // CHECK JQ DEPENDENCY
        if( typeof jQuery === "undefined" ) {
            _E( "jQuery " + _JQ_MIN_VER + "+ previous load required" );
        }
        else if ( $().jquery < _JQ_MIN_VER ) {
            _E( "jQuery " + $().jquery + " currently loaded, jQuery " + _JQ_MIN_VER + "+ required" );
        }
        
        // CHECK CONSOLE SUPPORT
        _HasConsole = (window.console && window.console.debug && window.console.warn && window.console.error);
        if ( !_HasConsole && window.console && window.console.log ) {
            window.console.log("advanced console debugging is not supported in this browser");
        }

        _Include(p_jsUrl);

        var screenInstance = new Screen();
        _Includes[p_jsUrl](screenInstance);
        screenInstance.id = "welcome-screen";
        screenInstance.el = {};
        screenInstance.uis = [];
        screenInstance.con = $(document.body);
        screenInstance.fileJs = p_jsUrl;
        screenInstance.Create();
        screenInstance._awake();
        screenInstance.Show();

        _welcomeCreated = true;

        // CHECK HASH SUPPORT
        if ( !("onhashchange" in window) ) {
            _E("The browser doesn't support the hashchange event");
        }
        else {
            
            if ( document.location.hash ) {
                _Window_OnHashChange();
            }
            
            $(window).bind("hashchange", _Window_OnHashChange);
        }
    }
    
    function _LogOf (p_type) {
        return _Log[p_type];
    }
    
    function _L(){
        if ( _HasConsole && window.console.log) {
            window.console.log(_LogPrefix, arguments);
        }
    }
    
    function _D(){
        if(_HasConsole && _LogOf("debug") ){
            window.console.debug(_LogPrefix, arguments);
        }
    }
    
    function _W(){
        if(_HasConsole && _LogOf("warning") ){
            window.console.warn(_LogPrefix, arguments);
        }
    }
    
    function _E(){
        if(_HasConsole && _LogOf("error") ){
            window.console.error(_LogPrefix, arguments);
        }
    }
    
    
    
    function _Goto (p_hashUri) {
        _PrevHashUrl = document.location.hash;
        document.location.hash = p_hashUri; // Trigger hashchange event, then execute _Window_OnHashChange()
    }

    function _Window_OnHashChange () {
        
        if ( !_welcomeCreated ) {
            iris.e("You must set the welcome screen using iris.screen.WelcomeScreen()");
            return false;
        }
        
        iris.event.Notify(iris.event.BEFORE_NAVIGATION);
        
        if ( _GotoCancelled ) {
            _GotoCancelled = false;
            return false;
        }
        
        var prev = _PrevHashUrl.split("/"),
            curr = document.location.hash.split("/"),
            prevPath = "",
            currPath = "",
            pathWithoutParams,
            hasRemainingChilds = false,
            i
        ;
        
        // Check if all screen.canSleep() are true
        if ( _PrevHashUrl !== "" ) {
            for ( i=0; i<prev.length; i++ ) {
                
                if ( prev[i] !== "" ) {
                    prevPath += prev[i] + "/";
                    pathWithoutParams = _RemoveURLParams(prevPath);
                    
                    if (_Screen.hasOwnProperty(pathWithoutParams) && _Screen[pathWithoutParams].CanSleep() === false ) {
                        _GotoCancelled = true;
                        document.location.hash = _PrevHashUrl;
                        return false;
                    }
                }
            }            
        }
        prevPath = "";
        
        // Hide screens and its childs that are not showed
        if ( prev.length > curr.length ) {
            
            for ( i=0; i<prev.length; i++ ) {
                prevPath += prev[i] + "/";
                
                if ( curr[i] ) {
                    currPath += curr[i] + "/";
                }
                
                if ( hasRemainingChilds || currPath !== prevPath ) {
                    hasRemainingChilds = true;
                    pathWithoutParams = _RemoveURLParams(prevPath);

                    _Screen[pathWithoutParams]._sleep();
                    _Screen[pathWithoutParams].Hide();
                }
            }
        }
        
        // Show child screens
        prevPath = "";
        currPath = "";
        hasRemainingChilds = false;
        for ( i=0; i<curr.length; i++ ) {
            currPath += curr[i] + "/";
            
            if ( prev[i] ) {
                prevPath += prev[i] + "/";
            }
            
            if ( hasRemainingChilds || currPath !== prevPath ) {
                hasRemainingChilds = true;
                
                pathWithoutParams = _RemoveURLParams(currPath);
                _ShowScreen(pathWithoutParams, _NavGetParams(curr[i]) );
                
            }
        }
        
        _PrevHashUrl = _RemoveLastSlash(currPath);
    }
    
    function _RemoveURLParams (p_url) {
        return _RemoveLastSlash(p_url.replace(/\?[^\/]*/, ""));
    }
    
    function _RemoveLastSlash (p_url) {
        return p_url.replace(/\/$/, "");
    }
    
    function _NavGetParams(p_hashPart) {
        var params = {},
            regex = /([\.\w_\-]*)=([^&]*)/g,
            matches = regex.exec(p_hashPart)
        ;
        
        while ( matches ) {
            params[matches[1]] = decodeURIComponent(matches[2]);
            matches = regex.exec(p_hashPart);
        }

        return params;
    }
    
    function _BaseUri(p_baseUri){
        if ( p_baseUri !== undefined ) {
            _AppBaseUri = p_baseUri;
        }
        else {
            var base = document.getElementsByTagName("base");
            base = base.length > 0 ? base[0].attributes.href.value : "/";
            _AppBaseUri = document.location.protocol + "//" + document.location.host + base;
        }
        return _AppBaseUri;
    }

    function _Ajax (p_settings) {
        return $.ajax(p_settings);
    }
    
    function _AjaxSync (p_uri, p_dataType, f_success, f_error) {
        var ajaxSettings = {
            url: p_uri,
            dataType: p_dataType,
            async: false,
            cache: _Cache,
            success : f_success,
            error : f_error
        };
        
        if ( _Cache && _CacheVersion !== undefined ) {
            ajaxSettings.data = "_=" + _CacheVersion;
        }
        
        $.ajax(ajaxSettings);
    }
    
    function _SetCacheVersion (p_value) {
        _CacheVersion = p_value;
    }
    
    
    function _IncludeFiles () {
        for ( var f=0,F=arguments.length; f<F; f++ ){
            _Include( arguments[f] );
        }
    }

    function _Include(p_uiFile) {

        if ( !_Includes.hasOwnProperty(p_uiFile) ) {
            _Includes[p_uiFile] = true;
            
            var fileUrl = p_uiFile.indexOf("http") === 0 ? p_uiFile: _BaseUri() + p_uiFile;
            
            _D("[iris.ui.Include]", fileUrl);
            
            if ( p_uiFile.lastIndexOf(".css") > -1 ) {
                var link  = document.createElement('link');
                link.rel = 'stylesheet';
                link.type = 'text/css';
                link.href = fileUrl;
                _Head.appendChild(link);
            }
            else {
                var isHtml = p_uiFile.lastIndexOf(".html") > -1;
                _AjaxSync(
                    fileUrl,
                    (isHtml ? "html" : "text"),
                    function (p_data) {
                        _LastIncludePath = p_uiFile;
                        
                        if ( isHtml ) {
                            _Includes[p_uiFile] = _LocaleParse(p_data);
                        }
                        else {
                            var script = document.createElement("script");
                            script.language = "javascript";
                            script.type = "text/javascript";
                            script.text = p_data;
                            _Head.appendChild(script);
                        }
                        
                    },
                    function (p_err) {
                        delete _Includes[fileUrl];
                        _E(p_err.status, "Error loading file '" + fileUrl + "'");
                    }
                );
            }
        }
    }
    
    
    function _ConfigLoad (p_json){
        if ( p_json ) {
            $.extend(_Config, p_json);

            _addGlobal( _Config.global );

            var currentEnv = _GetEnv();
            if ( _Config.log ) {
                var logConfig = _Config.log[currentEnv];
                var logs = logConfig.split(",");
                for ( var i=0; i < logs.length; i++ ) {
                    _Log[ $.trim(logs[i]) ] = true;
                }
            }
            
            _Cache = true;
            if ( _Config.hasOwnProperty("environments-nocache") ) {
                var envNocache = _Config["environments-nocache"].split(",");
                for ( var f=0, F=envNocache.length; f<F; f++ ) {
                    if ( envNocache[f] === currentEnv ) {
                        _Cache = false;
                        break;
                    }
                }
            }
            
            _addLocal( _Config.local );
        }
        return _Config;
    }
    
    function _GetEnv (p_env) {
        if ( p_env !== undefined ) {
            _Env = p_env;
        }
        else {
            if ( !_Env ) {
                _Env = _Config["environment-default"];
                for (var p in _Config.environment ){
                    if ( document.location.href.indexOf( p ) > -1 ) {
                        _Env = _Config.environment[p];
                        break;
                    }
                }
                if ( !_Env ) {
                    _Env = "pro";
                }
                _LogPrefix = "[" + _Env + "]";
            }
            return _Env;
        }
    }
    
    //
    // Global
    //
    function _addGlobal(p_hash){
        $.extend(_Global, p_hash);
        return _Global;
    }

    function _getOrSetGlobal (p_label, p_value){
        if ( p_label && p_value !== undefined ) {
            _Global[p_label] = p_value;     
        }
        else if ( p_label ) {
            return _Global[p_label];
        }
        else {
            return _Global;
        }
    }

    function _global (p_labelOrObject, p_value){
        if ( typeof p_labelOrObject === "object" ) {
            _addGlobal(p_labelOrObject);
        } else {
            _getOrSetGlobal(p_labelOrObject, p_value);
        }
    }


    //
    // Local
    //
    function _addLocal(p_hash){
        $.extend(_Local, p_hash);
        return _Local;
    }

    function _getOrSetLocal(p_label, p_value){
        if ( p_label && p_value !== undefined ) {
            _Local[p_label][_GetEnv()] = p_value;     
        }
        else if ( p_label ) {
            return _Local[p_label][_GetEnv()];
        }
        else  {
            return _Local;
        }
    }
    
    function _local (p_labelOrObject, p_value) {
        if ( typeof p_labelOrObject === "object" ) {
            _addLocal(p_labelOrObject);
        } else {
            _getOrSetLocal(p_labelOrObject, p_value);
        }
    }
    
    //
    // EVENT
    //
    function _FindEvent(p_eventName, f_func){
        var events = _Event[p_eventName];
        if ( events ) {
            for ( var f=0, F=events.length; f<F; f++ ) {
                if ( events[f] === f_func ) {
                    return f;
                }
            }
        }
        return -1;
    }
    
    function _EventSubscribe(p_eventName, f_func){
        if ( !_Event[p_eventName] ) {
            _Event[p_eventName] = [];
        }

        var index = _FindEvent( p_eventName, f_func );
        if ( index === -1 ) {
            index = _Event[p_eventName].length;
        }

        _Event[p_eventName][index] = f_func;
    }
    
    function _EventRemove(p_eventName, f_func){
        var index = _FindEvent(p_eventName, f_func);
        if ( index !== -1 ){
            _Event[p_eventName].splice(index,1);
        }
    }

    function _EventNotify(p_eventName, p_data){
        if ( _Event[p_eventName] ) {
            var funcs = _Event[p_eventName];
            for ( var f=0, F=funcs.length; f<F; f++ ) {
                funcs[f](p_data);
            }
        }
    }
    
    
    
    
    function _GetObjectValue (p_obj, p_label) {
        var value;
        if ( p_label.indexOf(".") > -1 ){
            var labels = p_label.split(".");
            var f,F=labels.length;
            for(f=0; f<F; f++){
                if (p_obj !== undefined ) {
                    p_obj = p_obj[labels[f]];
                }
                else {
                    break;
                }
            }
            value = p_obj;
        }
        else {
            value  = p_obj[p_label];
        }
        return value;
    }
    

    //
    // LANG
    //
    function _LocaleGet(p_locale) {
        if ( p_locale !== undefined ) {
            _Locale = p_locale;
        }
        else {
            return _Locale;
        }
    }

    function _LocaleParse(p_html){
        var html = p_html;
        var matches = html.match(/@@[A-Za-z_\.]+@@/g);
        
        if ( matches ) {
            var f, F = matches.length;
            for ( f=0; f<F; f++ ) {
                html = html.replace(matches[f], _getLang(matches[f].substring(2,matches[f].length-2)));
            }
        }
        return html;
    }

    //
    // LANG
    //
    function _lang (p_label, p_value, p_settings) {
        if ( typeof p_value === "undefined" ) {
            return _getLang(p_label);
        } else if ( typeof p_value === "object" ) {
            _addLang(p_label, p_value);
        } else {
            _loadLang(p_label, p_value, p_settings);
        }
    }

    function _addLang(p_locale, p_data){
        _D("[add lang]", p_locale, p_data);
        
        if ( _Locale === null ) {
            _Locale = p_locale;
        }
        
        if ( !_Lang.hasOwnProperty(p_locale) ) {
            _Lang[p_locale] = {};
        }
        
        $.extend(_Lang[p_locale], p_data);
    }

    function _getLang (p_label) {
        var value;
        if ( _Lang.hasOwnProperty(_Locale) ) {
            value = _GetObjectValue(_Lang[_Locale], p_label);
            if ( value === undefined ) {
                iris.w("Label '" + p_label + "' not found in Locale '" + _Locale + "'", _Lang[_Locale]);
            }
            if ( typeof value === "object" ) {
                iris.w("Label '" + p_label + "' is an object but must be a property in Locale '" + _Locale + "'", _Lang[_Locale]);
            }
        }
        else {
            iris.w("Locale '" + _Locale + "' not loaded");
        }
        return ( value ) ? value : "??" + p_label + "??";
    }

    function _loadLang (p_locale, p_uri, p_settings) {
        _D("[iris.lang.LoadFrom]", p_locale, p_uri);
        
        _AjaxSync(
            p_uri,
            "json",
            function (p_data) {
                  _addLang(p_locale, p_data);
                  _D("[iris.lang.LoadFrom] loaded", p_data);

                  if ( p_settings && p_settings.hasOwnProperty("success") ) {
                      p_settings.success(p_locale);
                  }
            },
            function (p_err) {
                  _E(p_err.status, "Error loading lang file", p_uri);
                  
                  if ( p_settings && p_settings.hasOwnProperty("error") ) {
                      p_settings.error(p_locale);
                  }
            }
        );
    }


    

    
    //
    // ADDON
    //
    function _ApplyAddOn( p_id, p_uis, p_settings ){
        _Include(p_id);
        
        var addOn = new AddOn ();
        addOn._components = [];
        addOn.settings =  {};
        
        _AddOns[p_id]( addOn );
        addOn.Settings(p_settings);
        addOn.AddAll(p_uis);
        addOn.Create();
        return addOn;
    }

    
    function _CreateAddOn( f_addOn  ){
        _AddOns[ _LastIncludePath ] = f_addOn;
    }
    
    //
    // UI
    //
    function _CreateUI (f_ui) {
        _Includes[_LastIncludePath] = f_ui;
    }
    
    function _InstanceUI (p_$container, p_uiId, p_jsUrl, p_uiSettings, p_templateMode) {
        _Include(p_jsUrl);
        
        var uiInstance = new UI();
        _Includes[p_jsUrl](uiInstance);
        uiInstance.id = p_uiId;
        uiInstance.el = {};
        uiInstance.con = p_$container;
        uiInstance.uis = [];
        uiInstance.settings = {};
        uiInstance.fileJs = p_jsUrl;
        if ( p_templateMode !== undefined ) {
            uiInstance._tmplMode = p_templateMode;
        }
        
        p_uiSettings = p_uiSettings === undefined ? {} : p_uiSettings;
        var jqToHash = _JqToHash(p_$container);
        
        $.extend(uiInstance.settings, jqToHash, p_uiSettings);

        uiInstance.Create(jqToHash, p_uiSettings);
        
        return uiInstance;
    }

    // @private
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
    
    
    //
    // SCREEN
    //
    function _CreateScreen (f_screen) {
        f_screen.prototype = new Screen();
        _Includes[_LastIncludePath] = f_screen;
    }
    
    function _InstanceScreen (p_screenPath) {
        
        var jsUrl = _ScreenUrl[p_screenPath];
        _Include(jsUrl);
        
        var screenInstance = new Screen();
        _Includes[jsUrl](screenInstance);

        screenInstance.id = p_screenPath;
        screenInstance.el = {};
        screenInstance.uis = [];
        screenInstance.con = _ScreenContainer[p_screenPath];
        screenInstance.fileJs = jsUrl;
        screenInstance.Create();
        screenInstance.Hide();
        
        _Screen[p_screenPath] = screenInstance;
    }
    
    function _DestroyScreen (p_screenPath) {
        if ( _Screen.hasOwnProperty(p_screenPath) ) {
            var contextId = _Screen[p_screenPath].$Get().parent().data("screen_context");
            if ( _LastScreen[contextId] === _Screen[p_screenPath] ) {
                delete _LastScreen[contextId];
            }
            _Screen[p_screenPath]._destroy();
            _Screen[p_screenPath].$Get().remove();
            delete _Screen[p_screenPath];
        }
        else {
            iris.w("Error removing the screen \"" + p_screenPath + "\", path not found.");
        }
    }
    
    function _ShowScreen (p_screenPath, p_params) {

        if ( !_ScreenContainer.hasOwnProperty(p_screenPath) ) {
            _E( "Screen '" + p_screenPath + "' must be registered with self.AddScreen() before go to" );
        }
        else {
            if ( !_Screen.hasOwnProperty(p_screenPath) ) {
                _InstanceScreen(p_screenPath);
            }

            var currentScreen = _Screen[p_screenPath];
            var contextId = currentScreen.$Get().parent().data("screen_context");
            if ( _LastScreen.hasOwnProperty(contextId) ) {
                var lastScreen = _LastScreen[contextId];
                lastScreen._sleep();
                lastScreen.Hide();
            }
            currentScreen._awake( p_params ? p_params : {} );
            currentScreen.Show();

            _LastScreen[contextId] = currentScreen;
        }
    }

    function _TemplateParse (p_html, p_data, p_htmlUrl) {
        var result = p_html,
            formatLabel,
            value,
            regExp = /##([0-9A-Za-z_\.]+)(?:\|(date|currency)(?:\(([^\)]+)\))*)?##/g,
            matches = regExp.exec(p_html)
        ;

        while ( matches ) {
            value = _GetObjectValue(p_data, matches[1]);
            
            if ( value !== undefined ) {
                formatLabel = matches[2];
                if ( formatLabel ) {
                    switch (formatLabel) {
                        case "date":
                            value = _DateFormat(value, matches[3]);
                            break;
                        case "currency":
                            value = _ParseCurrency(value);
                            break;
                        default:
                            iris.w("Unknow template format label '" + formatLabel + "' in '" + p_htmlUrl + "'");
                    }
                }
            }
            else {
                iris.w("Template param '" + matches[1] + "' in '" + p_htmlUrl + "' not found", p_data);
            }

            result = result.replace(matches[0], value);
            
            matches = regExp.exec(p_html);
        }
        
        return result;
    }
    
    function _ParseCurrency (p_value) {
        var settings = _GetRegionalSetting("currency");
            
        var val = Number(p_value);
        var format = (val >= 0) ? settings.formatPos : settings.formatNeg;
        
        var decimal = val % 1;
        var num = String( Math.abs(val-decimal) );
        
        decimal = String(Math.abs(decimal).toFixed(settings.precision));
        decimal = decimal.substr(2);
        
        for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
            num = num.substring(0, num.length - (4 * i + 3)) + settings.thousand + num.substring(num.length - (4 * i + 3));
        }
        
        return format.replace("n", num + settings.decimal + decimal );
    }
    
    function _DateFormat (p_date, p_format) {
        if ( !p_format ) {
            p_format = _GetRegionalSetting("dateFormat");
        }
        
        if ( typeof p_date !== "object" ) {
            p_date = new Date(Number(p_date));
        }
        
        var dateFormat = "";
        for (var f=0, F=p_format.length; f<F; f++) {
            dateFormat += _DateFormatChar(p_format[f], p_date);
        }
        return dateFormat;
    }
    
    function _GetRegionalSetting (p_label) {
        if ( _Regional.hasOwnProperty(_Locale) ) {
            if ( _Regional[_Locale].hasOwnProperty(p_label) ) {
                return _Regional[_Locale][p_label];
            }
            else {
                iris.e("Regional setting '" + p_label + "' not found for locale '" + _Locale + "'");
            }
        }
        else {
            iris.e("Regional for locale '" + _Locale + "' not found");
        }
    }
    
    function _LeadingZero (p_number) {
        return (p_number < 10) ? "0" + p_number : p_number;
    }
    
    function _DateFormatChar (p_formatChar, p_date) {
        var regional = _Regional[_Locale];
        switch (p_formatChar) {
            case "y":
                return String(p_date.getFullYear()).substring(2);
            case "Y":
                return p_date.getFullYear();
            case "m":
                var m = p_date.getMonth()+1;
                return _LeadingZero(m);
            case "n":
                return p_date.getMonth()+1;
            case "M":
                return regional.monthNames[p_date.getMonth()].substring(0, 3);
            case "b":
                return regional.monthNames[p_date.getMonth()].substring(0, 3).toLowerCase();
            case "F":
                return regional.monthNames[p_date.getMonth()];
            case "d":
                var d = p_date.getDate();
                return _LeadingZero(d);
            case "D":
                return regional.dayNames[p_date.getDay()].substring(0, 3);
            case "l":
                return regional.dayNames[p_date.getDay()];
            case "s":
                var s = p_date.getSeconds();
                return _LeadingZero(s);
            case "i":
                var i = p_date.getMinutes();
                return _LeadingZero(i);
            case "H":
                var h = p_date.getHours();
                return _LeadingZero(h);
            case "h":
                var hour = p_date.getHours();
                hour = (hour % 12) === 0 ? 12 : hour % 12;
                return _LeadingZero(hour);
            case "a":
                return (p_date.getHours() > 12) ? "p.m." : "a.m.";
            case "A":
                return (p_date.getHours() > 12) ? "PM" : "AM";
            case "U":
                return Math.floor(p_date.getTime() * 0.001);
            default:
                return p_formatChar;
        }
    }

    var _Regional = {
         "en-US" : {
            dayNames : ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
            monthNames : ["January","February","March","April","May","June","July","August","September","October","November","December"],
            dateFormat : "m/d/Y h:i:s",
            currency : {
                formatPos : "n",
                formatNeg : "(n)",
                decimal : ".",
                thousand : ",",
                precision : 2
            }
        },
        "es-ES" : {
            dayNames : ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"],
            monthNames : ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],
            dateFormat : "d/m/Y H:i:s",
            currency : {
                formatPos : "n",
                formatNeg : "-n",
                decimal : ",",
                thousand : ".",
                precision : 2
            }
        }
    };

    function _AddRegional (p_locale, p_regional) {
        _Regional[p_locale] = p_regional;
    }
    
    /**
     * @class
     * Provide mechanism to store and retrieve settings values.
     */
    var Settable = function () {
        this.settings = null;
    };
    
    /**
     * Set multiple Component settings.
     * You can access to this values using {@link iris-Settable#Setting}.
     * @function
     * @example
     * 
     * self.Settings({
     *      "min" : 0
     *     ,"label" : "example" 
     * });
     */
    Settable.prototype.Settings = function (p_settings) {
        return $.extend(this.settings, p_settings);
    };

    /**
     * Set or get a single Component setting.
     * @function
     * @example
     * 
     * var label = self.Setting("label"); // Get setting value
     * 
     * self.Setting("label", "example"); // Set setting value
     */
    Settable.prototype.Setting = function (p_label, p_value) {
        if ( p_value === undefined ) {
            if ( !this.settings.hasOwnProperty(p_label) ) {
                iris.w("The setting ", p_label, " is not in ", this.settings, this);
            }
            return this.settings[p_label];
        }
        else {
            this.settings[p_label] = p_value;
        }
    };
    
        
    /**
     * @class
     * Abstract Component for UIs / Screens extending.
     * Common properties and functions.
     */
    var Component = function () {
        
        this.TEMPLATE_APPEND = "append";
        this.TEMPLATE_REPLACE = "replace";
        this.TEMPLATE_PREPEND = "prepend";
        
        this._$tmpl = null;
        this.id = null;
        this.uis = null;
        this.con = null;
        this._sleeping = null;
        this.fileJs = null;
        this.fileTmpl = null;
        this.el = null;
    };
    
    Component.prototype = new Settable();
    
    Component.prototype._sleep = function () {
        for ( var f=0, F=this.uis.length; f < F; f++ ) {
            this.uis[f]._sleep();
        }
        this._sleeping = true;
        this.Sleep();
    };
    
    Component.prototype._awake = function (p_params) {
        for ( var f=0, F=this.uis.length; f < F; f++ ) {
            this.uis[f]._awake();
        }
        this._sleeping = false;
        this.Awake(p_params);
    };
    
    Component.prototype._destroy = function () {
        if ( !this._sleeping ) {
            this._sleep();
        }

        for ( var f=0, F=this.uis.length; f < F; f++ ) {
            this.uis[f]._destroy();
        }
        this.uis = null;
        this.Destroy();
    };

    Component.prototype._tmpl = function (p_htmlUrl, p_params, p_mode) {
        this.fileTmpl = p_htmlUrl;
        
        if ( typeof p_htmlUrl === "undefined" ) {
            this._$tmpl = this.con;
            return this._$tmpl;
        }
        
        iris.Include(p_htmlUrl);
        
        var tmplHtml = p_params ? _TemplateParse(_Includes[p_htmlUrl], p_params, p_htmlUrl) : _Includes[p_htmlUrl];
        var $tmpl = $(tmplHtml);
        
        this._$tmpl = $tmpl;
        if ( $tmpl.size() > 1 ) {
            iris.e("Template '" + p_htmlUrl + "' must have only one root node");
        }
        switch ( p_mode ) {
            case this.TEMPLATE_APPEND:
                this.con.append($tmpl);
                break;
            case this.TEMPLATE_REPLACE:
                this.con.replaceWith($tmpl);
                break;
            case this.TEMPLATE_PREPEND:
                this.con.prepend($tmpl);
                break;
            default:
                iris.e("Unknown template mode '" + p_mode + "'");
        }
        
    };
    
    // Check if the template is set (https://github.com/intelygenz/iris/issues/19)
    Component.prototype._checkTmpl = function () {
        if ( this._$tmpl === null ) {
            iris.e("You must set a template using self.Template() in '" + this.fileJs + "'");
            return undefined;
        }
    };

    /**
     * Show the template object.
     * If the Component is a screen, this is called automatically 
     * after self.Awake() when iris navigates.
     * 
     * See {@link iris.Goto} for more details.
     * @function
     */
    Component.prototype.Show = function () {
        this._checkTmpl();
        
        this._$tmpl.show();
    };

    /**
     * Hide the template object.
     * If the Component is the current screen, this is called automatically 
     * after self.Sleep() when iris navigates to other screen. Is called too 
     * when a new screen is created.
     * 
     * See {@link iris.Goto} for more details.
     * @function
     */
    Component.prototype.Hide = function () {
        this._checkTmpl();
        
        this._$tmpl.hide();
    };
    
    
    
    /**
     * Find a JQuery object, using its <code>data-id</code> attribute, in the template.
     * The template must be defined using <code>self.Template()</code>.<br>
     * The <code>data-id</code> must be unique in the template.
     * 
     * @function
     * @param {String} [p_id] Element <code>data-id</code> value, if no set return root element (optional)
     * @example
     * 
     * var $label = self.$Get("span_label");
     * 
     * var $root = self.$Get();
     */
    Component.prototype.$Get = function(p_id) {
    this._checkTmpl();

    if (p_id) {

      if (!this.el.hasOwnProperty(p_id)) {
        var id = "[data-id=" + p_id + "]", filter = this._$tmpl.filter(id), $element = null;

        if (filter.length > 0) {
          $element = filter;
        } else {
          var find = this._$tmpl.find(id);
          if (find.size() > 0) {
            $element = find;
          }
        }

        if ($element === null) {
          iris.e("[data-id=" + p_id + "] not found in '" + this.fileTmpl + "' used by '" + this.fileJs + "'");
          return undefined;
        } else if ($element.size() > 1) {
          iris.e("[data-id=" + p_id + "] must be unique in '" + this.fileTmpl + "' used by '" + this.fileJs + "'");
          return undefined;
        }

        this.el[p_id] = $element;
      }

      return this.el[p_id];
    }

    return this._$tmpl;
  };
    
    /**
   * Create a new UI Component instance.
   * 
   * The created Component is registered into the parent screen or UI, so you
   * must use {@link iris-Component#DestroyUI} in order to remove it.
   * 
   * The Component is added to <code>p_id</code> container or replace it.
   * See {@link iris-UI#TemplateMode} for more details.
   * 
   * @function
   * @param {String}
   *            p_id Container <code>data-id</code>
   * @param {String}
   *            p_jsUrl UI file path
   * @param {Object}
   *            [p_uiSettings] UI Settings is optional
   * @param {Constant}
   *            [p_templateMode] Use self.TEMPLATE_APPEND,
   *            self.TEMPLATE_PREPEND, the default mode
   *            isself.TEMPLATE_REPLACE (optional)
   * @example
   * 
   * self.InstanceUI("custom_ui", "custom_ui.js");
   * 
   * self.InstanceUI("btn_ok", "button.js", {"label":"OK","ico":"accept"});
   * 
   * self.InstanceUI("btn_ok", "button.js", {"label":"example"},
   * self.TEMPLATE_PREPEND);
   */
    Component.prototype.InstanceUI = function (p_id, p_jsUrl, p_uiSettings, p_templateMode) {
        var $container = this.$Get(p_id);
        if ( $container.size() === 1 ) {
            var uiInstance = _InstanceUI($container, $container.data("id"), p_jsUrl, p_uiSettings, p_templateMode);
            this.uis[this.uis.length] = uiInstance;
            return uiInstance;
        }
    };
    
    /**
     * Remove a child UI Component completely previously created using {@link self.InstanceUI}.
     * Remove parent references.
     * @function
     * @param {UI} p_ui UI to be removed
     * @example
     * 
     * var customUI = self.InstanceUI("custom_ui", "custom_ui.js");
     * self.DestroyUI(customUI);
     */
    Component.prototype.DestroyUI = function (p_ui) {
        for (var f=0, F=this.uis.length; f < F; f++) {
            if (this.uis[f] === p_ui) {
                this.uis.splice(f, 1);
                p_ui._destroy();
                p_ui.$Get().remove();
                break;
            }
        }
    };
    
    /**
     * Remove all UI Components from a container.
     * The UIs must be previously created using {@link self.InstanceUI}.<br>
     * Remove parent references.
     * @function
     * @param {String|JQuery} p_idOrJq UI Container <code>data-id</code> or JQuery object
     * @example
     * self.DestroyAllUIs("container");
     * 
     * self.DestroyAllUIs($container);
     */
    Component.prototype.DestroyAllUIs = function (p_idOrJq) {
        var contSelector = typeof p_idOrJq === "string" ? "[data-id=" + p_idOrJq + "]" : p_idOrJq.selector;
        var ui;
        for (var f=0, F=this.uis.length; f < F; f++) {
            ui = this.uis[f];
            
            if (ui.con.selector === contSelector) {
                this.uis.splice(f--, 1);
                F--;
                
                ui._destroy();
                ui.$Get().remove();
            }
        }
    };
    
    /**
     * Get the Component container.
     * If the Component is a screen, the container is
     * set using {@link iris-Screen#AddScreen} function.
     * Otherwise if the Component is a UI, the container is
     * set using {@link iris-Component#InstanceUI} function.
     * @function
     * @example
     * 
     * var screenContainer = self.$Container();
     */
    Component.prototype.$Container = function () {
        return this.con;
    };
    
    // To override functions
    
    /**
     * Called automatically only once at the creation phase.
     * Function to override.
     * @function
     */
    Component.prototype.Create = function () {};
    
    /**
     * Called automatically when a screen is showed.
     * Function to override.
     * @function 
     */
    Component.prototype.Awake = function () {};
    
    /**
     * Called automatically when a screen is going to sleep, before {@link iris-Component#Sleep}.
     * If return false, the <code>self.Sleep()</code> function is not called.
     * @function 
     */
    Component.prototype.CanSleep = function () {
        return true;
    };
    
    /**
     * Called automatically when a screen is hidden.
     * Function to override.
     * @function
     */
    Component.prototype.Sleep = function () {};
    
    /**
     * Called automatically by {@link iris-Component#DestroyUI}.
     * Function to override.
     */
    Component.prototype.Destroy = function () {};
    
    /**
     * @class
     * Abstract class for AddOn extending.
     * Common AddOn functions and properties.
     */
    var AddOn = function () {
        this._components = null;
    };
    
    AddOn.prototype = new Settable();
        
    /**
     * Add a array of UIs to the AddOn.
     * It is called automatically from {@link iris.ApplyAddOn}.
     * @param p_uis {Array} Array of UIs
     * @function
     */
    AddOn.prototype.AddAll = function (p_uis) {
        for (var f=0, F=p_uis.length; f<F; f++) {
            this.Add( p_uis[f] );
        }
    };
    
    /**
     * Add a UI to the AddOn.
     * @param p_uis {UI} UI instance
     * @function
     */
    AddOn.prototype.Add = function (p_ui) {
        if ( this.hasOwnProperty("UIAddOn") ) {
            this.UIAddOn( p_ui );
        }
        this._components[this._components.length] = p_ui;
    };
    
    /**
     * Remove a UI from the AddOn.
     * @param p_uis {UI} UI instance
     * @function
     */
    AddOn.prototype.Remove = function (p_ui) {
        var ui;
        for (var f=0, F=this._components.length; f<F; f++) {
            ui = this._components[f];
            if ( ui === p_ui ) {
                this._components.splice(f, 1);
            }
        }
    };

    /**
     * Get a registered UI from the AddOn.
     * The UI must be previosly registered using {@link iris.ApplyAddOn},
     * {@link iris-AddOn#AddAll} or {@link iris-AddOn#Add}
     * @param p_idx {integer} UI instance position
     * @function
     */
    AddOn.prototype.Get = function (p_idx) {
        return this._components[p_idx];
    };

    /**
     * The number of UI Components registered.
     * @function
     */
    AddOn.prototype.Size = function () {
        return this._components.length;
    };
    
    // To override
    
    /**
     * Called automatically when all UIs have been added.
     * Function to override.
     * @function
     */
    AddOn.prototype.Create = function () {};
    
    /**
     * @class
     * Abstract class for UI extending.
     * Common UI functions and properties.
     */
    var UI = function () {
        this._tmplMode = "replace";
    };
    
    UI.prototype = new Component();
        
    /**
     * Set the template behaviour.
     * The template can be added to the container
     * or can replace it. The default mode is <code>self.TEMPLATE_REPLACE</code>.
     * Use this function before call {@link iris-UI.Template}.
     * @function
     * @example
     * self.TemplateMode(self.TEMPLATE_APPEND);
     * self.Template("tmpl.html");
     */
    UI.prototype.TemplateMode = function (p_mode) {
        this._tmplMode = p_mode;
    };
    
    /**
     * Create the Component template.
     * Translate multilanguage values, draw parameters, 
     * create DOM elements and insert into container or replace it.
     * 
     * See {@link iris-UI.TemplateMode}.
     * @function
     * @example
     * self.TemplateMode(self.TEMPLATE_APPEND);
     * self.Template("tmpl.html", {"age":23});
     */
    UI.prototype.Template = function (p_htmlUrl, p_params) {
        this._tmpl(p_htmlUrl, p_params, this._tmplMode);
    };
        

    /**
     * @class
     * Abstract class for screen extending.
     * Common screen functions and properties.
     */
    var Screen = function () {};
    
    Screen.prototype = new Component();
        
    /**
     * Create the screen template.
     * Translate multilanguage values, draw parameters, 
     * create DOM elements and it is insert into the screen container.
     * @function
     * @example
     * self.Template("tmpl.html", {"name":"Jonh"});
     */
    Screen.prototype.Template = function (p_htmlUrl, p_params) {
        this._tmpl(p_htmlUrl, p_params, this.TEMPLATE_APPEND);
    };
        
    /**
     * Add a new screen.
     * You can navigate to this using <code>iris.Goto</code>.
     * See {@link iris.Goto} for more details.
     * @function
     * @param {JQuery} p_containerId Screen container <code>data-id</code>
     * @param {String} p_screenPath Screen URL path
     * @param {String} p_jsUrl Screen controller
     * @example
     * self.AddScreen(
     *     "screens"
     *   , "#books/edit"
     *   , "screen/book_edit.js"
     * );
     * 
     * iris.Goto("#books/edit");
     */
    Screen.prototype.AddScreen = function (p_containerId, p_screenPath, p_jsUrl) {
        var $cont = this.$Get(p_containerId);
        
        if ( $cont.data("screen_context") === undefined ) {
            
            // Set a unique screen context id to the screen container
            // like: #path/to/screen|containerid
            $cont.data("screen_context", this.id + "|" + p_containerId);
        }

        _ScreenUrl[p_screenPath] = p_jsUrl;
        _ScreenContainer[p_screenPath] = $cont;
    };


    var iris = {
        config : _ConfigLoad,
        env : _GetEnv,
        global : _global,
        local : _local,

        lang : _lang,
        locale : _LocaleGet,

        l : _L,
        d : _D,
        w : _W,
        e : _E,

        BEFORE_NAVIGATION : "iris_before_navigation",

        notify : _EventNotify,
        on : _EventSubscribe,
        off : _EventRemove,

        baseUri : _BaseUri,
        ajax : _Ajax,
        cacheVersion : _SetCacheVersion,

        include : _IncludeFiles,
        screen : _CreateScreen,
        ui :  _CreateUI,
        
        regional : _AddRegional,
        welcome : _welcome,
        goto : _Goto,

        destroyScreen : _DestroyScreen,

        date : _DateFormat,
        currency : _ParseCurrency,

        addOn : _CreateAddOn,
        applyAddOn : _ApplyAddOn

    };

    window.iris = iris;

})(jQuery, window);
