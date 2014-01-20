(function($) {

    var _screen,
        _includes,
        _welcomeCreated,
        _head = document.getElementsByTagName('head')[0],
        _paths,
        _loadJsCallback,
        _dependencyCount,
        _lastLoadedDependencies,
        FORMAT_REG_EXP = /(date|currency|number)(?:\(([^\)]+)\))/,
        PATH_PARAM_REGEX = /:[\d\w_\-\.]+/g,
        SCREEN_PARAM_REGEX = '[;?&][^=]+=[^;\/&]+', // Validates matrix & url params: ';param=value' & '?param=value' & '&param=value'
        _gotoCancelled,
        _prevNavigationHash, // The hash for the last navigation (finished)
        _navMap,
        _prevNav,
        _prevNavRaw,
        _jsUrlScreens, // To prevent multiple screen instances

        // _screenMetadata["#parent/hash/:id"] = {
        //     hashFragment: "hash/:id",
        //     js:"path.js", // return the js-url associated with hash (#parent/hash/:id)
        //     container: $element, // return the parent container associated with hash (#parent/hash/:id)
        //     parentNavMap: {} // Parent node in the navigation tree
        // }
        _screenMetadata
        ;

    

    function _init() {

        // _screen["#hash"] return the screen instance
        _screen = {};
        _screenMetadata = {};

        // _jsUrlScreens["/path/to/file.js"] indicates if a js-URL has been used by some screen
        _jsUrlScreens = {};

        _includes = {};
        _welcomeCreated = false;

        // Navigation
        _navMap = {};
        _prevNav = [];
        _prevNavRaw = [];
        _gotoCancelled = false;
        _prevNavigationHash = "";

        // dependencies
        _dependencyCount = 0;
        _lastLoadedDependencies = [];

        _paths = [];

        iris.on("iris-reset", function () {
            $(window).off("hashchange");
            document.location.hash = "#";

            _init();
        });
    }


    function _welcome(p_jsUrl) {
        if ( _welcomeCreated ) {
            throw "welcome screen already exists";
        }
        _welcomeCreated = true;
        _screenMetadata['#'] = {
            js : p_jsUrl,
            container : $(document.body),
            navMap : {}
        };
        _navMap['#'] = {};

        if ( iris.hasOwnProperty("path") ) {
            _loadPaths(iris.path);
        }
        if ( _paths.length > 0 ) {
            _load(_paths, _pathsLoaded);
        } else {
            _pathsLoaded();
        }
    }

    function _loadPaths (paths) {
        if ( typeof paths === "string" ) {
            if ( !_includes.hasOwnProperty(paths) ) {
                _paths.push(paths);
            }
        } else {
            for ( var p in paths ) {
                _loadPaths(paths[p]);
            }
        }
    }

    // Ensure include is defined
    function _setInclude (include, path, type) {
        if ( $.type(path) !== "string" || path === "" ) {
            iris.log("[error] path[" + path + "]", include);
            throw "Invalid path on " + type +" registration";
        }
        _includes[path] = include;
    }

    function _pathsLoaded () {
        
        // check hashchange event support
        if(!("onhashchange" in window)) {
            throw "hashchange event unsupported";
        } else {

            // force to do an initial navigation according to the actual hash
            // when finished the hashChange listener is added
            _startHashChange();
            $(window).on("hashchange", _startHashChange);
        }
    }

    //
    // Scripts load
    //
    function _load (paths, callback) {
        iris.log("[load-js]", paths);

        _loadJsCallback = callback;

        var path, script;
        for (var i = 0; i < paths.length; i++) {
            if ( !_includes.hasOwnProperty(paths[i]) ) {
                _dependencyCount++;

                // If the path doesn't start with http or https, it's concatenated to the iris base uri
                path = /^https?:\/\//.test(paths[i]) ? paths[i] : String(iris.baseUri() + paths[i]);

                if ( !iris.cache() ) {
                    path += "?_=" + new Date().getTime();
                } else if( iris.cacheVersion() ) {
                    path += "?_=" + iris.cacheVersion();
                }
                
                if ( /\.html$/.test(paths[i]) ) {
                    iris.ajax({
                        url: path,
                        dataType: "html",
                        async: true,
                        componentPath: paths[i]
                    })
                    .done(_templateLoaded);
                } else {
                    script = document.createElement("script");
                    script.type = "text/javascript";
                    script.src = path;
                    script.charset = "UTF-8";
                    if (iris.browser().msie  && parseInt(iris.browser().version, 10) < 9) {
                        script.onreadystatechange = onReadyStateChange;
                    } else {
                        script.onload = _checkLoadFinish;
                    }
                    _head.appendChild(script);
                }
            }
        }
    }

    function onReadyStateChange () {
        if ( this.readyState === "loaded" ) {
            _checkLoadFinish();
        }
    }

    function _templateLoaded (data, textStatus, jqXHR) {
        _includes[this.componentPath] = data;
        _checkLoadFinish();
    }

    function _checkLoadFinish () {
        if ( --_dependencyCount === 0 ) {
            _loadJsCallback();
        }
    }

    //
    // Navigation
    //
    function _goto(p_hashUri) {
        document.location.hash = p_hashUri; // Trigger hashchange event, then execute _startHashChange()
    }

    function _getHashRegex (hash) {
        return new RegExp('^' + hash.replace(PATH_PARAM_REGEX, '([^/]+)') + '(?:' + SCREEN_PARAM_REGEX + ')*/*' );
    }

    function _getScreenPathParams (screenHash, hash, hashRegex) {
        // Get screen path params
        var params = {};
        var paramsValues = hash.match(hashRegex);
        var i;
        
        if ( paramsValues ) {
            paramsValues = paramsValues.slice(1); // the first item is the whole match
            if ( paramsValues.length > 0 ) {
                var paramsNames = screenHash.match(PATH_PARAM_REGEX);
                for ( i = 0; i < paramsValues.length; i++ ) {
                    params[ paramsNames[i].substr(1) ] = paramsValues[i]; // Remove first ':'
                }
            }
        }

        // Get matrix params
        var mpRegex = new RegExp('^' + screenHash + '(' + SCREEN_PARAM_REGEX + ')+');
        var screenHashRaw = hash.match(mpRegex);
        if ( screenHashRaw && screenHashRaw.length > 0 ) {
            
            var matrixParams = screenHashRaw[0].match(new RegExp(SCREEN_PARAM_REGEX, 'g'));
            var idx;
            for ( i = 0; i < matrixParams.length; i++ ) {
                idx = matrixParams[i].indexOf('=');
                params[ matrixParams[i].substr(1, idx - 1) ] = matrixParams[i].substr(idx + 1);
            }
        }

        return params;
    }

    function _getRawHashRegex (hash) {
        return hash.replace(PATH_PARAM_REGEX, '(?:[^/]+)') + '(?:' + SCREEN_PARAM_REGEX + ')*(?:/?)';
    }

    function _startHashChange(e) {
        
        // when document.location.href is [http://localhost:8080/#], the document.location.hash is [] (empty string)
        // to avoid the use of empty strings and prevent mistakes, we replace it by #. (# == welcome-screen)
        var currHash = document.location.hash || "#",
            fullHash = currHash,
            hashRegex,
            fullRawHashRegex,
            currNav = _navMap,
            screenFound,
            deep = 0,
            i,
            fullScreenHash = '', // e.g.: #/user/:id/friends
            fullScreenHashRaw = '', // e.g.: #/user/1234/friends;filter=all
            historyNavRaw = [],
            historyNav = [],
            firstNodeToSleep,
            hashRaw,
            screenHash, // e.g.: user/:id
            screenChilds; // used to add the screenHashes of the current deep to search

        // If a screen cannot sleep, finish navigation
        if ( _gotoCancelled ) {
            _gotoCancelled = false;
            iris.notify(iris.AFTER_NAVIGATION);
            return false;
        }

        // Notify that a valid navigation is started
        iris.notify(iris.BEFORE_NAVIGATION);

        while ( currHash ) {

            //
            // Find the screen according to the current level.
            // Sort screenChilds (alphabetically and descending) to get the correct screen in case of contained screens, e.g.
            // 
            // screenChilds = ['screen/other', 'screen'] // 'screen/other' contains 'screen' (The array is sorted alphabetically and descending)
            //
            // currHash = 'screen/other'
            //   - search child['screen/other'] in currHash['screen/other'] : screenFound!
            //
            // currHash = 'screen'
            //   - search child['screen/other'] in currHash['screen'] : Not screenFound, screen/other contains screen but is skipped
            //   - search child['screen'] in currHash['screen'] : screenFound!
            screenFound = false;

            screenChilds = [];
            for ( screenHash in currNav ) {
                screenChilds.push(screenHash);
            }
            screenChilds.sort();
            screenChilds.reverse();

            for ( i = 0; i < screenChilds.length; i++ ) {

                screenHash = screenChilds[i];
                hashRegex = _getHashRegex(screenHash);

                if ( hashRegex.test(currHash) ) {
                    screenFound = true;

                    // fullScreenHash will be like #/user/:id/friends
                    // If it's the first screen dont add '/'
                    if ( fullScreenHash ) {
                        fullScreenHash += '/' + screenHash;
                    } else {
                        fullScreenHash = screenHash;
                    }

                    // fullRawHashRegex will match hashes like #/user/1234/friends;filter=all
                    if ( fullRawHashRegex ) {
                        fullRawHashRegex += '/' + _getRawHashRegex(screenHash);
                    } else {
                        fullRawHashRegex = '^' + _getRawHashRegex(screenHash);
                    }

                    fullScreenHashRaw = fullHash.match(fullRawHashRegex)[0].replace(/\/?$/, ''); // remove last '/'
                    break;
                }
            }

            if ( screenFound ) {

                var screenInPrevNav = _prevNav[deep] && _prevNav[deep] === fullScreenHash;

                // Prepare to the next iteration
                historyNav.push(fullScreenHash);
                historyNavRaw.push(fullScreenHashRaw);

                hashRaw = currHash;
                currHash = currHash.replace(hashRegex, '');
                currNav = currNav[screenHash];


                if ( !currHash && _prevNav.length > deep ) {

                    firstNodeToSleep = screenInPrevNav ? deep + 1 : deep;

                    // Can sleep?
                    for ( i = _prevNav.length-1; i >= firstNodeToSleep; i-- ) {
                        if ( _prevNav[i] !== "#" && _screen[_prevNav[i]].canSleep() === false ) {
                            _gotoCancelled = true;
                            document.location.href = _prevNavigationHash;
                            return false;
                        }
                    }

                    // Hide previous screens
                    while ( _prevNav.length > firstNodeToSleep ) {
                        var pathToSleep = _prevNav.pop();
                        _prevNavRaw.pop();

                        if ( pathToSleep !== "#" ) {
                            var screenToSleep = _screen[pathToSleep];
                            screenToSleep._sleep();
                            screenToSleep.hide();
                        }
                    }
                }


                // Wake up the screen at this deep (if not exists, create before)
                var hashNewParams = _prevNavRaw[deep] && _prevNavRaw[deep] !== fullScreenHashRaw;
                var params = _getScreenPathParams(screenHash, hashRaw, hashRegex);
                var screenInstance;

                if ( screenInPrevNav ) {

                    // The screen is in the previous navigation. If the screen receives new parameters, wake up
                    screenInstance = _screen[fullScreenHash];
                    if ( hashNewParams ) {
                        screenInstance.params = params;
                        screenInstance._awake(params);
                    }

                } else {
                    // The screen is not in the previous navigation

                    // Instantiate the screen if it wasn't created previously
                    if ( !_screen.hasOwnProperty(fullScreenHash) ) {

                        if ( !_screenMetadata.hasOwnProperty(fullScreenHash) ) {
                            throw '"' + fullScreenHash + '" not found';
                        }

                        // Instantiate the new screen
                        screenInstance = new Screen(fullScreenHash);
                        screenInstance.params = params;
                        screenInstance.create();
                        _screen[fullScreenHash] = screenInstance;

                    } else {
                        // Get the screen instance
                        screenInstance = _screen[fullScreenHash];
                    }

                    // Wake up
                    screenInstance.show();
                    screenInstance._awake(params);
                }

            } else {
                // Invalid hash, screen not found

                iris.notify(iris.SCREEN_NOT_FOUND, fullHash);
                iris.log("[warning] '" + fullHash + "' must be registered using self.screens()");
                return;
            }

            deep++;
        }

        // Prepare to the next iteration
        _prevNavigationHash = fullHash;
        _prevNav = historyNav;
        _prevNavRaw = historyNavRaw;

        iris.log("Navigation finished");
        iris.notify(iris.AFTER_NAVIGATION);        
    }    

    function _parseLangTags(p_html) {
        var html = p_html;
        var matches = html.match(/@@[0-9A-Za-z_\.]+@@/g);
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

    function _registerTmpl(path, html) {
        _includes[path] = html;
    }

    function _registerUI(ui, path) {
        _setInclude(ui, path, "ui");
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

    function _registerScreen(screen, path) {
        _setInclude(screen, path, "screen");
    }

    function _destroyScreenByPath(p_screenPath) {
        
        if ( _screen.hasOwnProperty(p_screenPath) ) {

            if ( p_screenPath === "#" ) {
                throw "Welcome screen cannot be deleted";
            }


            var hash = document.location.hash || '#'; // if url=http://example.com/#, the document.location.hash="" empty string

            // check if current screen is welcome screen (hash !== "#")
            // check if the current hash belongs to the path to delete
            if ( hash !== "#" && (p_screenPath.indexOf(hash) === 0 || hash.indexOf(p_screenPath) === 0) ) {
                throw "Cannot delete the current screen or its parents";
            }

            _destroyScreen(p_screenPath);
            
        } else {
            iris.log('[warning] "' + p_screenPath + '" was not instantiated, nothing to destroy');
        }
    }

    function _destroyScreen (path) {

        var screen = _screen[path];

        // the screen can be register using self.screens() but no instantiated using navigation
        if ( screen !== undefined ) {

            // destroy child screens
            if ( screen.screenChilds !== undefined ) {
                for (var i = 0; i < screen.screenChilds.length; i++ ) {
                    _destroyScreen(screen.screenChilds[i]);
                }
            }

            screen._destroy();
            screen.get().remove();

            // Remove instance
            delete _screen[path];

            // Remove the screen completely (no reusable)
            var screenMeta = _screenMetadata[path];
            delete screenMeta.parentNavMap[ screenMeta.hashFragment ]; // remove from parent's navMap
            delete _jsUrlScreens[screenMeta.js];
            delete _screenMetadata[path];
        }
    }


    var Component = function(id, $container, fileJs) {
        iris.Settable.call(this);

        this.id = id;
        this.uis = []; // child UIs
        this.uisMap = {}; // UIs sorted by id
        this.el = {}; // Map contains data-id elements
        
        this.con = $container; // JQ container
        this.fileJs = fileJs; // Path to the script

        this.fileTmpl = null;
        this.template = null;
        this.sleeping = null;

        _includes[fileJs](this);
    };

    iris.inherits(Component, iris.Settable);

    var pComponent = Component.prototype;

    pComponent.APPEND = "append";
    pComponent.REPLACE = "replace";
    pComponent.PREPEND = "prepend";


    pComponent._sleep = function() {
        for(var f = 0, F = this.uis.length; f < F; f++) {
            this.uis[f]._sleep();
        }
        this.sleeping = true;
        this.sleep();
    };

    pComponent._awake = function(p_params) {
        this.sleeping = false;
        this.awake(p_params);
        for(var f = 0, F = this.uis.length; f < F; f++) {
            if (this.uis[f].sleeping !== false) {
                this.uis[f]._awake();
            }
        }
    };

    pComponent._destroy = function() {
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

    pComponent._tmpl = function(p_htmlUrl, p_mode) {

        var f, childrens, tmpl;
        
        if (this.template !== null) {
            throw "self.tmpl() has already been called in '" + this.fileJs + "'";
        }
        
        this.fileTmpl = p_htmlUrl;

        tmpl = $( _parseLangTags(_includes[p_htmlUrl]) );

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
                this.con = {selector: this.con.selector};
                break;
            case this.PREPEND:
                this.con.prepend(tmpl);
                break;
            default:
                throw "Unknown template mode '" + p_mode + "'";
        }

        // Process elements with data-* attributes
        this.el = {};
        this.inflateTargets = {};

        // The tmpl root node
        this._data_attrs(tmpl);

        // And all tmpl child nodes
        childrens = tmpl.get(0).getElementsByTagName("*");
        for (f = childrens.length; f--;) {
            this._data_attrs( $(childrens[f]) );
        }
    };

    pComponent._data_attrs = function ($el) {
        var f, key, attr, attrs = $el.get(0).attributes,
            inflate, inflateFormats = {}, inflatesByKeys = {},
            target, targetParams, format, formatParams, formatMatches
            ;

        for (f = attrs.length; f--;) {
            attr = attrs[f];

            if ( attr.name.indexOf("data-") === 0 ) {
                key = attr.name.substr(5);
            } else {
                continue;
            }

            // data-id
            if ( key === "id" ) {
                this.el[ attr.value ] = $el;
                continue;
            }

            // data-*-format
            if ( key.indexOf("-format", key.length - 7) !== -1 ) {
                format = attr.value;
                formatParams = undefined;

                if ( format && FORMAT_REG_EXP.test(format) ) {
                    formatMatches = format.match(FORMAT_REG_EXP);

                    format = formatMatches[1];
                    formatParams = formatMatches[2]; // TODO manage multiple parameter using: formatParams[2].splice(",");
                }
                // inflateFormats key = "jq-xxxx-format" -> "xxxx"
                inflateFormats[ key.substr(3, key.length - 10) ] = { key: format, params: formatParams };
                continue;
            }

            if ( key.indexOf("jq-") === 0 ) {
                key = key.substr(3);
                if ( /^(text|html|val|toggle)$/.test(key) ) {
                    target = key;

                } else if ( /^(prop-|attr-)/.test(key) ) {
                    target = key.substr(0, 4);
                    targetParams = key.substr(5);

                } else {
                    // Other data-* attribute
                    continue;
                }
            }

            if ( !this.inflateTargets.hasOwnProperty(attr.value) ) {
                this.inflateTargets[ attr.value ] = [];
            }

            inflate = { target: target, targetParams: targetParams, el: $el };

            this.inflateTargets[ attr.value ].push( inflate );
            inflatesByKeys[key] = inflate;
        }

        // After of iterate the element data attributes, set the formatting to each target
        for ( key in inflateFormats ) {
            if ( inflatesByKeys.hasOwnProperty(key) ) {
                inflatesByKeys[key].format = inflateFormats[key].key;
                inflatesByKeys[key].formatParams = inflateFormats[key].params;
            }
        }
    };

    pComponent.inflate = function(data) {

        var dataKey, f, F, targets, inflate, format, unformattedValue, value;

        for ( dataKey in this.inflateTargets ) {
            unformattedValue = iris.val(data, dataKey);

            if ( unformattedValue !== undefined ) {

                targets = this.inflateTargets[dataKey];

                for ( f = 0, F = targets.length; f < F; f++ ) {
                    inflate = targets[f];

                    switch ( inflate.format ) {
                        case "date":
                            value = iris.date(unformattedValue, inflate.formatParams);
                            break;
                        case "currency":
                            value = iris.currency(unformattedValue);
                            break;
                        case "number":
                            value = iris.number(unformattedValue);
                            break;
                        default:
                            value = unformattedValue;
                    }

                    switch ( inflate.target ) {
                        case "text":
                            inflate.el.text(value);
                            break;
                        case "html":
                            inflate.el.html(value);
                            break;
                        case "val":
                            inflate.el.val(value);
                            break;
                        case "toggle":
                            inflate.el.toggle(value);
                            break;
                        case "prop":
                            inflate.el.prop(inflate.targetParams, value);
                            break;
                        case "attr":
                            inflate.el.attr(inflate.targetParams, value);
                    }
                }
            }
        }
    };

    // Check if the template is set (https://github.com/intelygenz/iris/issues/19)
    pComponent._checkTmpl = function() {
        if(this.template === null) {
            throw "Set a template using self.tmpl() in '" + this.fileJs + "'";
        }
    };

    pComponent.show = function() {
        this._checkTmpl();
        this.template.show();
    };

    pComponent.hide = function() {
        this._checkTmpl();
        this.template.hide();
    };

    pComponent.get = function(p_id) {
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
                    throw "[data-id=" + p_id + "] not screenFound in '" + this.fileTmpl + "' used by '" + this.fileJs + "'";
                } else if($element.size() > 1) {
                    throw "[data-id=" + p_id + "] must be unique in '" + this.fileTmpl + "' used by '" + this.fileJs + "'";
                }

                this.el[p_id] = $element;
            }

            return this.el[p_id];
        }

        return this.template;
    };

    pComponent._ui = function(p_id, p_jsUrl, p_uiSettings, p_templateMode) {
        if ( p_jsUrl === undefined ) {
            // Get UI

            var ui = this.uisMap[p_id];
            if ( ui === undefined ) {
                ui = [];
            }
            return ui;

        } else {
            // Create UI
            return this._createUi(p_id, p_jsUrl, p_uiSettings, p_templateMode);
        }
    };

    pComponent._createUi = function(p_id, p_jsUrl, p_uiSettings, p_templateMode) {
        var $container = this.get(p_id);
        
        if($container !== undefined && $container.size() === 1) {
            var uiInstance = new UI($container, $container.data("id"), p_jsUrl, p_uiSettings, p_templateMode, this);
            if (uiInstance._tmplMode === undefined || uiInstance._tmplMode === uiInstance.REPLACE) {
                this.el[p_id] = undefined;
            }
            this.uis.push(uiInstance);

            // Add uiInstance to the UIs map
            if ( uiInstance._tmplMode === uiInstance.REPLACE ) {
                this.uisMap[p_id] = uiInstance;
            } else {
                if ( !this.uisMap.hasOwnProperty(p_id) ) {
                    this.uisMap[p_id] = [];
                }
                this.uisMap[p_id].push(uiInstance);
            }
            
            return uiInstance;
        } else {
            throw "The container does not exist or has been replaced.";
        }
    };


    pComponent.destroyUI = function(p_ui) {
        if ( p_ui === undefined ) {
            // Self destroy
            this.parentUI.destroyUI(this);
        } else {
            var idx;

            // Remove p_ui from the UIs array
            idx = $.inArray(p_ui, this.uis);
            if ( idx !== -1 ) {
                this.uis.splice(idx, 1);
            }

            // Remove p_ui from the UIs map
            if ( p_ui._tmplMode === p_ui.REPLACE ) {
                this.uisMap[p_ui.id] = null;
                delete this.uisMap[p_ui.id];
            } else {
                var uis = this.uisMap[p_ui.id];

                idx = $.inArray(p_ui, uis);
                if ( idx !== -1 ) {
                    uis.splice(idx, 1);
                }
            }

            // Destroy p_ui
            p_ui._destroy();
            p_ui.get().remove();
        }
    };

    pComponent.destroyUIs = function(id) {
        var uis = this.uisMap[id];
        if ( $.isArray(uis) ) {
            var f, F;
            for ( f=uis.length-1; f >= 0; f-- ) {
                this.destroyUI(uis[f]);
            }

        } else if ( uis && uis._tmplMode === this.REPLACE ) {
            // uis is a single UI
            this.destroyUI(uis);
        }
    };

    pComponent.container = function() {
        return this.con;
    };

    //
    // To override functions
    //
    pComponent.create = function() {};

    pComponent.awake = function() {};

    pComponent.sleep = function() {};

    pComponent.destroy = function() {};


    //
    // UI
    //
    var UI = function($container, id, fileJs, settings, tmplMode, parentUI) {
        Component.call(this, id, $container, fileJs);

        var jqToHash = _jqToHash($container);

        this.parentUI = parentUI;
        this._tmplMode = tmplMode || "replace";
        
        $.extend(this.cfg, jqToHash, settings || {});

        this.create();
        this._awake();
    };

    iris.inherits(UI, Component);

    var pUI = UI.prototype;
    pUI.tmplMode = function(p_mode) {
        this._tmplMode = p_mode;
    };

    pUI.tmpl = function(p_htmlUrl) {
        this._tmpl(p_htmlUrl, this._tmplMode);
    };

    pUI.ui = function(p_id, p_jsUrl, p_uiSettings, p_templateMode) {
        return this._ui(p_id, p_jsUrl, p_uiSettings, p_templateMode);
    };


    //
    // SCREEN
    //
    var Screen = function(path) {
        var screenMeta = _screenMetadata[path];
        Component.call(this, path, screenMeta.container, screenMeta.js);

        this.params = {};
        this.screenConId = null;
        this.navMap = null;
        this.hash = null;
    };

    iris.inherits(Screen, Component);

    var pScreen = Screen.prototype;
    pScreen.param = function(p_key) {
        return this.params[p_key];
    };

    pScreen.ui = function(p_id, p_jsUrl, p_uiSettings, p_templateMode) {
        if ( p_id === this.screenConId ) {
            throw "'" + p_id + "' has already been registered as a screen container";
        }

        return this._ui(p_id, p_jsUrl, p_uiSettings, p_templateMode);
    };

    pScreen.tmpl = function(p_htmlUrl) {
        this._tmpl(p_htmlUrl, this.APPEND);
    };

    pScreen.screens = function(p_containerId, p_screens) {

        this.screenConId = p_containerId;

        if (this.hasOwnProperty("screenChilds")) {
            throw "Multiple calls to self.screens() are not allowed: " + this.id;

        } else if (this.template === null){
            throw "self.tmpl() must be called before self.screens(): " + this.id;

        } else {
            var $cont = this.get(p_containerId);
            this.screenChilds = [];

            var screenMeta = _screenMetadata[this.id];

            this.navMap =  ( this.id === '#' ) ? _navMap['#'] : screenMeta.parentNavMap[screenMeta.hashFragment];

            var newScreen, newScreenHashFragment, newScreenHash, newScreenJs;
            for ( var i = 0; i < p_screens.length; i++ ) {

                newScreen = p_screens[i];
                newScreenHashFragment = newScreen[0]; // newScreen[0] == hash fragment
                newScreenHash = this.id + "/" + newScreenHashFragment; // full hash like #/parent/screen/:id (screen[0] == hash fragment)

                newScreenJs = newScreen[1]; // screen js path
                if ( _jsUrlScreens.hasOwnProperty(newScreenJs) ) {
                    throw 'Cannot associate "' + newScreenJs + '" to "' + newScreenHash + '", it was previously used in "' + _jsUrlScreens[newScreenJs] + '"';
                }

                if ( _screenMetadata.hasOwnProperty(newScreenHash) ) {
                    throw 'The hash "' + newScreenHash + '" was associated to "' + _screenMetadata[newScreenHash].js + '" previously, cannot associate to "' + newScreenJs + '" again';
                }


                _jsUrlScreens[newScreenJs] = newScreenHash; // To prevent future instances of this screen

                _screenMetadata[newScreenHash] = {
                    js : newScreenJs,
                    parentNavMap : this.navMap,
                    container : $cont,
                    hashFragment : newScreenHashFragment
                };


                this.screenChilds[i] = newScreenHash;
                this.navMap[newScreenHashFragment] = {};

                iris.log("Register screen hash[" + newScreenHash + "] js[" + newScreenJs + "]");
            }
        }
    };

    // To override
    pScreen.canSleep = function() {
        return true;
    };

    function _registerRes (resourceOrPath, path) {

        if ( typeof resourceOrPath === "string" ) {
            // resourceOrPath == path
            if ( !_includes.hasOwnProperty(resourceOrPath) ) {
                throw "add service[" + resourceOrPath + "] to iris.path";
            }
            return _includes[resourceOrPath];

        } else {
            // resourceOrPath == resource
            var serv = new iris.Resource();
            serv.cfg = {};
            serv.settings({ type: "json", path: "" });
            resourceOrPath(serv);

            _setInclude(serv, path, "resource");
        }

    }
    
    iris.screen = _registerScreen;
    iris.destroyScreen = _destroyScreenByPath;
    iris.welcome = _welcome;
    iris.navigate = _goto;
    iris.ui = _registerUI;
    iris.tmpl = _registerTmpl;
    iris.resource = _registerRes;
    iris.include = _load;

    //
    // Classes
    //
    iris.Component = Component;
    iris.UI = UI;
    iris.Screen = Screen;

    _init();


})(jQuery);
