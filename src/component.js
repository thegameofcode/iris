(function($) {

    var _screen,
    _screenJsUrl,
    _screenContainer,
    _jsUrlScreens,
    _prevHash,
    _prevHashString,
    _includes,
    _lastIncludePath,
    _welcomeCreated,
    _gotoCancelled,
    _lastFullHash,
    _head = document.getElementsByTagName('head')[0],
    _loadJsCallback,
    _dependencyCount,
    _srcToCheckDependencies,
    _dependency,
    _firstDiffNode,
    _notLoadedScreens,
    _lastScreenPathLoaded
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
        _lastIncludePath = undefined;
        _welcomeCreated = false;
        _gotoCancelled = false;
        _lastFullHash = "";

        $(window).off("hashchange");
        document.location.hash = "#";

        // dependencies
        _dependencyCount = 0;
        _srcToCheckDependencies = "";
        _dependency={};

        // Array with hash paths of new screens
        _notLoadedScreens = undefined;

        // Last hash-path loaded
        _lastScreenPathLoaded = undefined;

        // Indicate the first screen that is different of the previos hash-url
        _firstDiffNode = undefined;

        iris.on("iris-reset", _init);
    }


    function _loadJs (paths, callback) {
        iris.log("[load-js]", paths);

        for (var i = 0; i < paths.length; i++) {
            var script= document.createElement('script');
            script.type= 'text/javascript';
            script.src= iris.baseUri() + paths[i];
            script.onload = _loadJsOnLoad;
            _head.appendChild(script);
                
            _dependencyCount++;
        }

        if ( callback !== undefined ) {
            _loadJsCallback = callback;
        }
    }

    function _loadJsOnLoad () {

        if ( --_dependencyCount === 0 ) {

            // remove comments blocks
            _srcToCheckDependencies = _srcToCheckDependencies.replace(/(\/\*[\w\'\s\r\n\*]*\*\/)|(\/\/[\w\s\']*)|(<![\-\-\s\w\>\/]*\>)/g, "");

            var regex = /self\.ui\s*\(\s*[^,]+\s*,\s*"([^\.]+\.js)"/g; // to extract ui dependencies
            var dependencies = [];

            var matches = regex.exec(_srcToCheckDependencies);
            while (matches) {

                if ( !_dependency.hasOwnProperty(matches[1]) ) {
                    iris.log("[load-js] new dependency found: " + matches[1]);

                    dependencies.push(matches[1]);
                    _dependency[ matches[1] ] = true;
                }
                matches = regex.exec(_srcToCheckDependencies);
            }

            _srcToCheckDependencies = "";

            if ( dependencies.length > 0 ) {
                _loadJs(dependencies);
                
            } else if ( (dependencies.length === 0) && (_loadJsCallback !== undefined) ) {
                _loadJsCallback();
            }
            
        }

    }
    

    function _welcome(p_jsUrl) {
        
        if (_welcomeCreated === true) {
            throw "the welcome screen already exists";
        }
        _welcomeCreated = true;

        if ( window.console && window.console.log ) {
            window.console.log("[iris] noCache[" + iris.noCache() + "] enableLog[" + iris.enableLog() + "]");
        }

        _screenJsUrl["#"] = p_jsUrl;
        _screenContainer["#"] = $(document.body);
        
        // check hashchange event support
        if(!("onhashchange" in window)) {
            throw "hashchange event unsupported";
        } else {
            // force to do an initial navigation
            _startHashChange();
            $(window).on("hashchange", _startHashChange);
        }
    }

    function _goto(p_hashUri) {
        document.location.hash = p_hashUri; // Trigger hashchange event, then execute _startHashChange()
    }

    function _startHashChange() {

        // when document.location.href is [http://localhost:8080/#] then document.location.hash is [] (empty string)
        // to avoid the use of empty strings and prevent mistakes, we replace it by #. (# == welcome-screen)
        var hash = document.location.hash;
        if ( hash === "" ) {
            hash = "#";
        }

        // http://stackoverflow.com/questions/4106702/change-hash-without-triggering-a-hashchange-event#fggij
        if ( _lastFullHash === hash ) {
            return false;
        }
        
        // when a screen cannot sleep then window.history.back() & and finish navegation process
        if(_gotoCancelled) {
            _gotoCancelled = false;
            iris.notify(iris.AFTER_NAVIGATION);
            _lastFullHash = _prevHashString;
            return false;
        }

        if(!_welcomeCreated) {
            throw "set the first screen using iris.welcome()";
        }


        iris.notify(iris.BEFORE_NAVIGATION);
        _lastFullHash = hash;

        
        var curr = hash.split("/"), i, screenPath;
        var firstDiffNode = -1;
        if ( _prevHash !== undefined ) {

            // get firstDiffNode attending to current hash
            for ( i = 0; i < curr.length; i++ ) {
                if ( _prevHash[i] === undefined || _prevHash[i] !== curr[i] ) {
                    firstDiffNode = i;
                    break;
                }
                
            }

            // This case:
            // prev = #/s1/s2
            // curr = #/s1
            // we need sleep s2, therefor firstNodeToSleep = curr.length
            var firstNodeToSleep = firstDiffNode;
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
            firstDiffNode = 0;
        }

        // check if new screens are loaded
        _notLoadedScreens = [];
        if ( firstDiffNode !== -1 ) {
            for ( i = firstDiffNode; i < curr.length; i++ ) {

                screenPath = _getScreenPath(curr, i);
                if(!_screen.hasOwnProperty(screenPath)) {
                    _notLoadedScreens.push(screenPath);
                }
            }
        }

        // set navigation variables to the next hashchange event
        _prevHash = curr;
        _prevHashString = hash;
        _firstDiffNode = firstDiffNode;

        if ( _notLoadedScreens.length > 0 ) {
            _loadNewScreens();
        }
        else {
            _FinishHashChange();
        }
    }

    function _loadNewScreens () {

        if (_lastScreenPathLoaded) {
            var screenObj = _instanceScreen(_lastScreenPathLoaded);
            screenObj.create();
        }

        if ( _notLoadedScreens.length > 0 ) {
            var path = _notLoadedScreens.splice(0,1)[0];
            var fileJs = _screenJsUrl[path];

            if ( fileJs !== undefined ) {
                _lastScreenPathLoaded = path;
                _loadJs([fileJs], _loadNewScreens);
            } else {
                throw "The path[" + path + "] hasn't associated screen, use self.screens to register the screen first";
            }
            
        } else {
            _lastScreenPathLoaded = undefined;
            _FinishHashChange();
        }

    }

    function _FinishHashChange () {
        var i, screenPath;
        if ( _firstDiffNode !== -1 ) {
            // show new screens
            for ( i = _firstDiffNode; i < _prevHash.length; i++ ) {

                screenPath = _getScreenPath(_prevHash, i);

                if ( !_screenContainer.hasOwnProperty(screenPath) ) {
                    throw "'" + screenPath + "' must be registered using self.screens()";
                } else {
                    var screenInstance = _screen[screenPath];
                    var screenParams = _navGetParams(_prevHash[i]);
                    screenInstance._awake(screenParams);
                    screenInstance.show();
                }

            }
        }

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


    //
    // INCLUDE
    //

    function _include(p_uiFile, p_value) {

        if ( p_value !== undefined ) {
            _includes[p_uiFile] = p_value;
            
        } else if(!_includes.hasOwnProperty(p_uiFile)) {

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
                        script.text = p_data + '//@ sourceURL=/'+p_uiFile;
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

    function _registerUI(f_ui, path) {
        _includes[path] = f_ui;
        _srcToCheckDependencies += f_ui.toString();
    }

    function _instanceUI(p_$container, p_uiId, p_jsUrl, p_uiSettings, p_templateMode) {
        //iris.include(p_jsUrl);

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

    function _registerScreen(f_screen, path) {
        _includes[path] = f_screen;
        _srcToCheckDependencies += f_screen.toString();
    }

    function _instanceScreen (p_screenPath) {
        var jsUrl = _screenJsUrl[p_screenPath];
        var screenObj = new Screen();
        _includes[jsUrl](screenObj);

        screenObj.id = p_screenPath;
        screenObj.el = {};
        screenObj.uis = [];
        screenObj.events = {};
        screenObj.con = _screenContainer[p_screenPath];
        screenObj.fileJs = jsUrl;
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
            if ( (hash !== "") && (p_screenPath.indexOf(hash) === 0 || hash.indexOf(p_screenPath) === 0) ) {
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

    Component.prototype._tmpl = function(p_htmlUrl, p_params, p_mode) {
        
        if (this.template !== null) {
            throw "self.tmpl() has already been called in '" + this.fileJs + "'";
        }
        
        
        this.fileTmpl = p_htmlUrl;
        iris.include(p_htmlUrl);

        var tmplHtml = p_params ? _tmplParse(_includes[p_htmlUrl], p_params, p_htmlUrl) : _includes[p_htmlUrl];
        var tmpl = $(tmplHtml);

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
                break;
            case this.PREPEND:
                this.con.prepend(tmpl);
                break;
            default:
                throw "Unknown template mode '" + p_mode + "'";
        }

        // create bind-components map
        this.bind = {};
        var bindings = this.bind;
        $("[data-bind]", tmpl).each(function(){
            var el = $(this);
            var bindId = el.data("bind");

            if ( !bindings.hasOwnProperty(bindId) ) {
                bindings[bindId] = [];
            }
            bindings[bindId].push(el);
        });

    };

    Component.prototype.inflate = function(data) {
        if ( this.bind === undefined ) {
            throw "[self.inflate] first set a html node with any data-bind attribute";
        } else {

            var bindId, value, elements, nodeName, i, format, el, formatParams, formatMatches;
            var formatRegExp = /(date|currency)(?:\(([^\)]+)\))/;

            for ( bindId in this.bind ) {
                value = iris.val(data, bindId);

                if ( value !== undefined ) {
                    elements = this.bind[bindId];
                    formatParams = undefined;

                    for ( i = 0; i < elements.length; i++ ) {
                        el = elements[i];
                        format = el.data("format");

                        if ( format && formatRegExp.test(format) ) {
                          formatMatches = format.match(formatRegExp);

                          format = formatMatches[1];
                          formatParams = formatMatches[2]; // TODO manage multiple parameter using: formatParams.splice(2);
                        }

                        if ( format ) {
                            switch ( format ) {
                                case "date":
                                    value = iris.date(value, formatParams);
                                    break;
                                case "currency":
                                    value = iris.currency(value);
                                    break;
                            }
                        }

                        nodeName = el.prop("nodeName").toLowerCase();
                        if ( nodeName === "input" || nodeName === "textarea" ) {
                            el.val(value);
                        } else {
                            el.text(value);
                        }
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
        var $container = this.get(p_id);
        
        if($container !== undefined && $container.size() === 1) {
            var uiInstance = _instanceUI($container, $container.data("id"), p_jsUrl, p_uiSettings, p_templateMode);
            if (uiInstance._tmplMode === undefined || uiInstance._tmplMode === uiInstance.REPLACE) {
                this.el[p_id] = undefined;
            }
            this.uis[this.uis.length] = uiInstance;
            
            return uiInstance;
        } else {
            throw "The container does not exist or has been replaced.";
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

            if ( ui.con.selector.indexOf(contSelector) !== -1 ) {
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

    UI.prototype.ui = function(p_id, p_jsUrl, p_uiSettings, p_templateMode) {
        return this._ui(p_id, p_jsUrl, p_uiSettings, p_templateMode);
    };


    //
    // SCREEN
    //
    var Screen = function() {
        this.screenConId = null;
    };

    Screen.prototype = new Component();

    Screen.prototype.ui = function(p_id, p_jsUrl, p_uiSettings, p_templateMode) {

        if ( p_id === this.screenConId ) {
            throw "'" + p_id + "' has already been registered as a screen container";
        }

        return this._ui(p_id, p_jsUrl, p_uiSettings, p_templateMode);
    };

    Screen.prototype.tmpl = function(p_htmlUrl, p_params) {
        this._tmpl(p_htmlUrl, p_params, this.APPEND);
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

                iris.log("register screen ", js, hashUrl);

                _screenJsUrl[hashUrl] = js;
                _screenContainer[hashUrl] = $cont;
                _jsUrlScreens[js] = true;

                this.screenChilds[i] = hashUrl;
            }
        }
    };
    
    iris.include = _include;
    iris.screen = _registerScreen;
    iris.destroyScreen = _destroyScreenByPath;
    iris.welcome = _welcome;
    iris.navigate = _goto;
    iris.ui = _registerUI;

    //
    // Classes
    //
    iris.Settable = Settable;
    iris.Component = Component;
    iris.UI = UI;
    iris.Screen = Screen;

    _init();


})(jQuery);
