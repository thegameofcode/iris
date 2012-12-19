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

        iris.include(p_jsUrl); // TODO Must be async

        _welcomeCreated = true;

        var path = "";
        _screenUrl[path] = p_jsUrl;
        _screenContainer[path] = $(document.body);
        
        var screenObj = _instanceScreen(path);
        screenObj.id = "welcome-screen";

        if ( screenObj.cfg === null ) {
            screenObj.cfg = {};
        }

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
        iris.include(p_jsUrl);

        var uiInstance = new UI();
        uiInstance.id = p_uiId;
        uiInstance.uis = [];
        uiInstance.el = {};
        uiInstance.events = {};
        uiInstance.con = p_$container;
        uiInstance.fileJs = p_jsUrl;
        
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
        iris.include(p_htmlUrl);

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
    iris.goto = _goto;
    iris.ui = _registerUI;



    // TODO Should be no public?
    iris.Settable = Settable;
    iris.Component = Component;
    iris.UI = UI;
    iris.Screen = Screen;


})(jQuery);
