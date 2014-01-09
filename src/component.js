(function($) {

    var _screen,
    _screenJsUrl,
    _screenContainer,
    _jsUrlScreens,
    _prevHashString,
    _includes,
    _welcomeCreated,
    _gotoCancelled,
    _lastFullHash,
    _head = document.getElementsByTagName('head')[0],
    _loadJsCallback,
    _dependencyCount,
    _lastLoadedDependencies,
    _dependency,
    _notCreatedScreenHashses,
    _paths,
    FORMAT_REG_EXP = /(date|currency|number)(?:\(([^\)]+)\))/,

    // New system navigation

    // TODO join _screenHashFragment, _screenParentNavMap, _screenJsUrl, _screenContainer in
    // _screenMetadata["#parent/hash/:id"] = { hashFragment: "hash/:id", js:"path.js", container: $, parentNavMap: {} }
    _navMap,
    _screenHashFragment, 
    _screenParentNavMap,
    _prevNav,
    _prevNavRaw
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

        // New system navigation
        _navMap = {};
        _screenParentNavMap = {};
        _screenHashFragment = {};
        _prevNav = [];
        _prevNavRaw = [];

        _includes = {};
        _welcomeCreated = false;
        _gotoCancelled = false;
        _lastFullHash = "";

        // dependencies
        _dependencyCount = 0;
        _lastLoadedDependencies = [];
        _dependency={};

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
        _screenJsUrl["#"] = p_jsUrl;
        _screenContainer["#"] = $(document.body);
        _navMap["#"] = {};

        if ( window.console && window.console.log ) {
            window.console.log("[iris] noCache[" + iris.noCache() + "] enableLog[" + iris.enableLog() + "]");
        }

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

            // force to do an initial navigation
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


    function _wakeUpScreen (screenPath, params) {
        window.console.log('Wake up screenPath = ' + screenPath, 'params->',params);

        if ( !_screenJsUrl.hasOwnProperty(screenPath) ) {
            throw 'Invalid screenPath = ' + screenPath;
        }

        var screenInstance;

        if ( !_screen.hasOwnProperty(screenPath) ) {
            screenInstance = new Screen(screenPath);
            screenInstance.params = params;
            screenInstance.create();
            _screen[screenPath] = screenInstance;
        } else {
            screenInstance = _screen[screenPath];
        }

        screenInstance.params = params; // TODO check if duplicate this (above do the same on creation)
        screenInstance.show();
        screenInstance._awake(params);
    }

var paramNameRegex = /:[\d\w_\-\.]+/g;
var matrixParamsRegex = '[;?&][^=]+=[^;\/&]+';

    function _getHashRegex (hash) {
        return new RegExp('^' + hash.replace(paramNameRegex, '([^/]+)') + '(?:' + matrixParamsRegex + ')*/*' );
    }

    function _getScreenPathParams (screenHash, hash, hashRegex) {
        // Get screen path params
        var params = {};
        var paramsValues = hash.match(hashRegex);
        var i;
        
        if ( paramsValues ) {
            paramsValues = paramsValues.slice(1); // the first item is the whole match
            if ( paramsValues.length > 0 ) {
                var paramsNames = screenHash.match(paramNameRegex);
                for ( i = 0; i < paramsValues.length; i++ ) {
                    params[ paramsNames[i].substr(1) ] = paramsValues[i]; // Remove first ':'
                }
            }
        }

        
        // Get matrix params
        var mpRegex = new RegExp('^' + screenHash + '(' + matrixParamsRegex + ')+');
        var screenHashRaw = hash.match(mpRegex);
        if ( screenHashRaw && screenHashRaw.length > 0 ) {
            
            var matrixParams = screenHashRaw[0].match(new RegExp(matrixParamsRegex, 'g'));
            var idx;
            for ( i = 0; i < matrixParams.length; i++ ) {
                idx = matrixParams[i].indexOf('=');
                params[ matrixParams[i].substr(1, idx - 1) ] = matrixParams[i].substr(idx + 1);
            }
        }
        
window.console.log("@@@@                       params", params);
        return params;
    }

    function _getRawHashRegex (hash) {
        return hash.replace(paramNameRegex, '(?:[^/]+)') + '(?:' + matrixParamsRegex + ')*(?:/?)';
    }

    function _startHashChange(e) {

        
        // when document.location.href is [http://localhost:8080/#] then document.location.hash is [] (empty string)
        // to avoid the use of empty strings and prevent mistakes, we replace it by #. (# == welcome-screen)
        var hash = document.location.hash || "#";
        var fullHash = hash;

window.console.log("***********************");
window.console.log("hash[" + hash + "] _prevHashString[" + _prevHashString + "] _lastFullHash[" + _lastFullHash + "] _gotoCancelled[" + _gotoCancelled + "]");

        // Prevent multiple calls with the same hash
        // http://stackoverflow.com/questions/4106702/change-hash-without-triggering-a-hashchange-event#fggij
        if ( _lastFullHash === hash ) {
window.console.log("No New Navigation!!!!!!!!!! _lastFullHash === hash", _lastFullHash);
            return false;
        }

        // when a screen cannot sleep, finish navegation process
        if ( _gotoCancelled ) {
window.console.log("Navigation CANCELED!!!!!!!!!!!!!!!!!!!!");
            _gotoCancelled = false;
            _lastFullHash = _prevHashString;
            iris.notify(iris.AFTER_NAVIGATION);
            return false;
        }

        _lastFullHash = hash;
        iris.notify(iris.BEFORE_NAVIGATION);

        var hashRegex,
            fullRawHashRegex,
            currNav = _navMap,
            found,
            deep = 0,
            i,
            fullScreenHash = '', // e.g.: #/user/:id/friends
            fullScreenHashRaw = '', // e.g.: #/user/1234/friends;filter=all
            historyNavRaw = [],
            historyNav = [],
            firstNodeToSleep,
            hashWithParams,
            screenHash,
            screenChilds
            ;

        while ( hash ) {

window.console.log("  currNav[", currNav ,"] hash[" + hash + "] deep[" + deep + "] _prevNav[" + _prevNav + "]");

            found = false;


            //
            // Sort screenChilds (alphabetically and descending) to get the correct screen in case of contained screens, e.g.
            //
            // 
            // screenChilds = ['screen/other', 'screen'] // 'screen/other' contains 'screen' (The array is sorted alphabetically and descending)
            //
            // hash = 'screen/other'
            //   - search child['screen/other'] in hash['screen/other'] : Found!
            //
            // hash = 'screen'
            //   - search child['screen/other'] in hash['screen'] : Not Found, screen/other contains screen but is skipped
            //   - search child['screen'] in hash['screen'] : Found!
            //
            screenChilds = [];
            for ( screenHash in currNav ) {
                screenChilds.push(screenHash);
            }
            screenChilds.sort();
            screenChilds.reverse();

            for ( i = 0; i < screenChilds.length; i++ ) {

                screenHash = screenChilds[i];
                
                hashRegex = _getHashRegex(screenHash);
window.console.log("      ?? test  hashRegex[" + hashRegex + "] with hash [" + hash + "]");

                // added last / to ignore contained child hash, ejem: "screen_name/" && "screen/"

                if ( hashRegex.test(hash) ) {
                    found = true;

                    // If it's the first screen dont add '/'
                    if ( fullScreenHash ) {
                        fullScreenHash += '/' + screenHash;
                    } else {
                        fullScreenHash = screenHash;
                    }

                    if ( fullRawHashRegex ) {
                        fullRawHashRegex += '/' + _getRawHashRegex(screenHash);
                    } else {
                        fullRawHashRegex = '^' + _getRawHashRegex(screenHash);
                    }

window.console.log("          ?? test  fullRawHashRegex[" + fullRawHashRegex + "] in fullHash[" + fullHash + "]");

                    fullScreenHashRaw = fullHash.match(fullRawHashRegex)[0].replace(/\/?$/, ''); // With matrix params

window.console.log("    Found fullScreenHash: " + fullScreenHash + ', fullScreenHashRaw:' + fullScreenHashRaw );


                    break;
                }
            }

            if ( found ) {

                var screenInPrevNav = _prevNav[deep] && _prevNav[deep] === fullScreenHash;


                // Prepare to the next iteration
                historyNav.push(fullScreenHash);
                historyNavRaw.push(fullScreenHashRaw);

                hashWithParams = hash;
                hash = hash.replace(hashRegex, '');
                currNav = currNav[screenHash];


                if ( !hash && _prevNav.length > deep ) {

                    firstNodeToSleep = screenInPrevNav ? deep + 1 : deep;

window.console.log('deep['+deep+'] firstNodeToSleep[' + firstNodeToSleep +'] _prevNav.length['+_prevNav.length+']', [].concat(_prevNav));
                    // Can sleep?
                    for ( i = _prevNav.length-1; i >= firstNodeToSleep; i-- ) {
window.console.log('      ?? Can sleep "' + _prevNav[i] + '"');
                        if ( _prevNav[i] !== "#" ) {
                            if ( _screen[_prevNav[i]].canSleep() === false ) {
window.console.log('        Navigation STOPPED!', _prevNav[i], ' CANNOT SLEEP!');
                                _gotoCancelled = true;
                                document.location.href = _prevHashString;
                                return false;
                            }
                        }
                    }

                    // Hide previous screens
                    while ( _prevNav.length > firstNodeToSleep ) {
                        var pathToSleep = _prevNav.pop();
                        _prevNavRaw.pop();
                        if ( pathToSleep !== "#" ) {

window.console.log('      Sleep the previous screen "' + pathToSleep + '"');
                            var screenToSleep = _screen[pathToSleep];
                            screenToSleep._sleep();
                            screenToSleep.hide();
                        }
                    }
                }


                // Wake up the screen at this deep
                var params = _getScreenPathParams(screenHash, hashWithParams, hashRegex);
                if ( !screenInPrevNav ) {
                    _wakeUpScreen(fullScreenHash, params);
                } else {

                    var newParameters = _prevNavRaw[deep] && _prevNavRaw[deep] !== fullScreenHashRaw;
                    // Awake if the screen is asleep
                    var screenInstance = _screen[fullScreenHash];
                    if ( screenInstance.sleeping || newParameters ) {
                        screenInstance.params = params;
                        screenInstance.show();
                        screenInstance._awake(params);
                    }
                }
            } else {
                iris.notify(iris.SCREEN_NOT_FOUND, fullHash);
                iris.log("[warning] '" + fullHash + "' must be registered using self.screens()");
                return;
            }

            deep++;
window.console.log('!!!! New hash['+hash+']');
        }

        _prevHashString = fullHash;
        _prevNav = historyNav;
        _prevNavRaw = historyNavRaw;

        iris.log("Navigation finished");
window.console.log("hash[" + hash + "] _prevHashString[" + _prevHashString + "] _prevNav[" + _prevNav + "] _prevNavRaw[" + _prevNavRaw + "]");
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
        
        if(_screen.hasOwnProperty(p_screenPath)) {

            if ( p_screenPath === "#" ) {
                throw "Welcome screen cannot be deleted";
            }


            var hash = document.location.hash;

            // if url=http://example.com/#, the document.location.hash="" empty string
            // check if current screen is welcome screen (hash !== "")
            // check if the current hash belongs to the path to delete
            if ( hash !== "#" && hash !== "" && (p_screenPath.indexOf(hash) === 0 || hash.indexOf(p_screenPath) === 0) ) {
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

    pComponent.canSleep = function() {
        return true;
    };

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
        Component.call(this, path, _screenContainer[path], _screenJsUrl[path]);

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

            // TODO use screenMetadata isntead of _screenParentNavMap, _screenHashFragment
            this.navMap =  ( this.id === '#' ) ? _navMap['#'] : _screenParentNavMap[this.id][_screenHashFragment[this.id]];

            for ( var i=0; i < p_screens.length; i++ ) {

                var screen = p_screens[i];
                var hashUrl = screen[0];
                if ( hashUrl.indexOf("#") !== -1 ) {
                    throw "Incorrect screen path[" + hashUrl + "] cannot contain #";
                }
                hashUrl = this.id + "/" + hashUrl;

                var js = screen[1];
                if ( _jsUrlScreens.hasOwnProperty(js) ) {
                    throw "js-URL repeated '" + js + "': " + this.id;
                }

                if ( _screenContainer.hasOwnProperty(hashUrl) ) {
                    throw "hash-URL repeated  '" + hashUrl + "' in " + this.fileJs;
                }

                iris.log("Register screen hash[" + hashUrl + "] js[" + js + "]");

                _screenJsUrl[hashUrl] = js;
                _screenContainer[hashUrl] = $cont;
                _jsUrlScreens[js] = true;

                _screenParentNavMap[hashUrl] = this.navMap;
                _screenHashFragment[hashUrl] = screen[0];

                this.screenChilds[i] = hashUrl;

                this.navMap[screen[0]] = {};
window.console.log(this.id + ", Add screen child to navMap: " + screen[0], _navMap);
            }
        }
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
