/*
 * Copyright (c) 2012 Intelygenz <www.intelygenz.com>
 * All rights reserved.
 * 
 * BSD License
 * 
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 * 1. Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 * 3. Neither the name of copyright holders nor the names of its
 *    contributors may be used to endorse or promote products derived
 *    from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED
 * TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL COPYRIGHT HOLDERS OR CONTRIBUTORS
 * BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 *	
 * Download: http://intelygenz.github.com/iris/
 * 
 * Creation date: 2012-01-12
 * 
 * [version] date -> authors
 * 		upd|fix|new|dep|rmv - description
 *
 * [0.4.4] 2012-09-xx
 * 		[new] Screen error messages when template is not set (https://github.com/intelygenz/iris/issues/19)
 * 		[new] Prepend UI (https://github.com/intelygenz/iris/issues/21)
 * 		[rmv] Remove currency symbol of number regional format
 * 		[upd] self.Settings returns complete __Settings__ if don't use any parameter
 * 		[fix] Fix asynchronous load components on Firefox when hashchange event is triggered
 * 		[fix] Screen parameter bug (https://github.com/intelygenz/iris/issues/9)
 *
 * [0.4.3] 2012-09-06 -> angel.sanchez@intelygenz.com
 * 		[fix] Screen Context Bug (https://github.com/intelygenz/iris/issues/10)
 * 		[fix] Load Multiple Locales Bug (https://github.com/intelygenz/iris/issues/15)
 * 		[new] Nested properties value in Templates (https://github.com/intelygenz/iris/issues/8)
 * 		[upd] More Descriptive Error Messages (https://github.com/intelygenz/iris/issues/12)
 * 		[new] Specify new Regional configuration (https://github.com/intelygenz/iris/issues/17)
 * 		[doc] Add Screen Paramaters Example (https://github.com/intelygenz/iris/issues/11)
 *
 * [0.4.2] 2012-09-04 -> alejandro.gonzalez@intelygenz.com, angel.sanchez@intelygenz.com
 *		[upd] _LocaleParse -> Now can finds variables with dot notation, eg: @@COMMON.HELLO@@. This mean that you can have nested objects in lang json files.
 *		[new] iris.AddOn, iris.ApplyAddOn -> Now you can define groups of UIs and extends a UI functionality
 *		[new] screen.CanSleep -> All screens can define a CanSleep public method that returns a boolean indicating when the screen can be leaved or not.
 *                               If only one screen can't sleep, sleep action is cancelled.
 * 		[upd] iris.InstanceUI -> Now displays in console when data-id is not unique.
 * 		[new] self.DestroyUI() -> Remove a UI from the DOM tree and all its references.
 *		[new] self.DestroyAllUIs() -> Remove all UIs from a container.
 * 		[new] self.Destroy() -> new Lifecycle function is called when a UI is destroyed.
 * 		[new] self.$Get() -> shows error message when element isn't found
 * 		[new] iris.screen.Destroy() -> Remove a created screen completely
 * 		[rmv] iris.screen.Add() -> Now you can use self.AddScreen()
 * 		[new] _AbstractScreen.AddScreen() -> Screens only can be registered inside of screens
 * 		[new] iris.screen.WelcomeScreen() -> Now the applications must implement this entry point
 * 		[rmv] The last parameter of self.InstanceUI(p_id,p_js,p_settings,p_$tmpl) -> you can't instance UI outside its own templates
 * 		[rmv] The last parameter of self.$Get(p_id,p_$tmpl) -> you can't get elements outside its own templates
 * 		[fix] Small code refactoring and fixed bugs.
 * 		[new] Tested with JQuery 1.8
 * 		[doc] Documentation completed.
 *
 * [0.4.0] 2012-07-18 -> angel.sanchez@intelygenz.com, alejandro.gonzalez@intelygenz.com
 * 		Previous project: http://code.google.com/p/iris-js/
 * 		WARNING: No backward with previous versions
 * 
 */

/**
 * @namespace
 *  This JavaScript library provides different client-side optimization techniques for front construction.
 *  It is independent and compatible with any server-side technology: JAVA, PHP, Python, GOOGLE APP ENGINE, .NET...
 * 
 * @version 0.4.4-SNAPSHOT
 * */
var iris = new function() {
	
	var _APP_VERSION = "0.4.4-SNAPSHOT"
	,	_APP_NAME = "iris"
	,	_JQ_MIN_VER = 1.5
	;

	var _Env = null
	,	_Log = {"error":true}
	,	_LogPrefix = ""
	,	_Screen = {}
	,	_ScreenUrl = {}
	,	_ScreenContainer = {}
	,	_LastScreen = {}
	,	_PrevHashUrl = ""
	,	_Global = {}
	,	_Local = {}
	,	_Locale = null
	,	_Config = {}
	,	_Lang = {}
	,	_Event = {}
	,	_Includes = {}
	,	_AddOns = {}
	,	_AppBaseUri = ""
	,	_LastIncludePath
	,	_Head = $("head").get(0)
	,	_Cache = true
	,	_HasConsole
	,	_GotoCancelled = false
	,	_WelcomeScreenCreated = false
	;

	function _Init () {

		// CHECK JQ DEPENDENCY
		if( typeof jQuery === "undefined" ) {
			_E( "jQuery " + _JQ_MIN_VER + "+ previous load required" );
		}
		else if ( $().jquery < _JQ_MIN_VER ) {
			_E( "jQuery " + $().jquery + " currently loaded, jQuery " + _JQ_MIN_VER + "+ required" );
		}
		
		// CHECK HASH SUPPORT
		if ( !("onhashchange" in window) ) {
		    _E("The browser doesn't support the hashchange event");
		}
		else {
			$(window).bind("hashchange", _Window_OnHashChange);
		}
		
		// CHECK CONSOLE SUPPORT
		_HasConsole = (window.console && window.console.debug && window.console.warn && window.console.error);
		if ( !_HasConsole && window.console && window.console.log ) {
			window.console.log("advanced console debugging is not supported in this browser");
		}
	};
	
	
	
	function _AppName () {
		return _APP_NAME + " v" + _APP_VERSION + " [" + _Env + "]";
	};
	
	function _LogOf (p_type) {
		return _Log[p_type];
	};
	
	function _L(){
		if ( _HasConsole && window.console.log) {
			window.console.log(_LogPrefix, arguments);
		}
	};
	
	function _D(){
		if(_HasConsole && _LogOf("debug") ){
			window.console.debug(_LogPrefix, arguments);
		}
	};
	
	function _W(){
		if(_HasConsole && _LogOf("warning") ){
			window.console.warn(_LogPrefix, arguments);
		}
	};
	
	function _E(){
		if(_HasConsole && _LogOf("error") ){
			window.console.error(_LogPrefix, arguments);
		}
	};
	
	
	
	function _Goto (p_hashUri) {
		_PrevHashUrl = document.location.hash;
		document.location.hash = p_hashUri; // Trigger hashchange event, then execute _Window_OnHashChange()
	};

	function _Window_OnHashChange () {
		
		if ( !_WelcomeScreenCreated ) {
			iris.E("You must set the welcome screen using iris.screen.WelcomeScreen()");
			return false;
		}
		
		if ( _GotoCancelled ) {
			_GotoCancelled = false;
			return false;
		}
		
		var prev = _PrevHashUrl.split("/")
		,	curr = document.location.hash.split("/")
		,	prevPath = ""
		,	currPath = ""
		,	pathWithoutParams
		,	hasRemainingChilds = false
		;
		
		// Check if all screen.canSleep() are true
		if ( _PrevHashUrl != "" ) {
			for ( var f=0, F=prev.length; f<F; f++ ) {
				
				if ( prev[f] != "" ) {
					prevPath += prev[f] + "/";
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
			
			for ( var f=0, F=prev.length; f<F; f++ ) {
				prevPath += prev[f] + "/";
				
				if ( curr[f] ) {
					currPath += curr[f] + "/";
				}
				
				if ( hasRemainingChilds || currPath != prevPath ) {
					hasRemainingChilds = true;
					pathWithoutParams = _RemoveURLParams(prevPath);

					_Screen[pathWithoutParams].__Sleep__();
					_Screen[pathWithoutParams].Hide();
				}
			}
		}
		
		// Show child screens
		prevPath = "";
		currPath = "";
		hasRemainingChilds = false;
		for ( var f=0, F=curr.length; f<F; f++ ) {
			currPath += curr[f] + "/";
			
			if ( prev[f] ) {
				prevPath += prev[f] + "/";
			}
			
			if ( hasRemainingChilds || currPath != prevPath ) {
				hasRemainingChilds = true;
				
				pathWithoutParams = _RemoveURLParams(currPath);
				_ShowScreen(pathWithoutParams, _NavGetParams(curr[f]) );
				
			}
		}
		
		_PrevHashUrl = _RemoveLastSlash(currPath);
	};
	
	function _RemoveURLParams (p_url) {
		return _RemoveLastSlash(p_url.replace(/\?[^\/]*/, ""));
	};
	
	function _RemoveLastSlash (p_url) {
		return p_url.replace(/\/$/, "");
	};
	
	function _NavGetParams(p_hashPart) {
		var params = {}
		,	regex = /([\.\w_-]*)=([^&]*)/g
		;
		
		while ( matches = regex.exec(p_hashPart) ) {
			params[matches[1]] = decodeURIComponent(matches[2]);
		}

		return params;
	};
	
	function _BaseUri(p_baseUri){
		if ( p_baseUri !== undefined ) {
			_AppBaseUri = p_baseUri;
		}
		else {
			var base = document.getElementsByTagName("base");
			base = base.length > 0 ? base[0].attributes["href"].value : "/";
			_AppBaseUri = document.location.protocol + "//" + document.location.host + base;
		}
		return _AppBaseUri;
	};

	function _Ajax (p_settings) {
		return $.ajax(p_settings);
	};
	
	function _AjaxSync (p_uri, p_dataType, f_success, f_error) {
		$.ajax(
			{ url: p_uri
			, dataType: p_dataType
			, async: false
			, cache: _Cache
			, success : f_success
			, error : f_error
			}
		);
	};
	
	
	
	function _IncludeFiles () {
		for ( var f=0,F=arguments.length; f<F; f++ ){
			_Include( arguments[f] );
		}
	};

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
					  fileUrl
					, isHtml ? "html" : "text"
					, function (p_data) {
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
					}
					, function (p_err) {
						delete _Includes[fileUrl];
						_E(p_err.status, "Error loading file '" + fileUrl + "'");
					}
				);
			}
		}
	};
	
	
	function _ConfigLoad (p_json){
		if ( p_json ) {
			$.extend(_Config, p_json);

			_GlobalLoad( _Config["global"] );

			var currentEnv = _GetEnv();
			if ( _Config["log"] ) {
				var logConfig = _Config["log"][currentEnv];
				var logs = logConfig.split(",");
				for ( var logType in logs ) {
					_Log[ $.trim(logs[logType]) ] = true;
				}
			}
			
			_Cache = true;
			if ( _Config.hasOwnProperty("environments-nocache") ) {
				var envNocache = _Config["environments-nocache"].split(",");
				for ( var f=0, F=envNocache.length; f<F; f++ ) {
					if ( envNocache[f] == currentEnv ) {
						_Cache = false;
						break;
					}
				}
			}
			
			_LocalLoad( _Config["local"] );
		}
		return _Config;
	};
	
	function _GetEnv (p_env) {
		if ( p_env !== undefined ) {
			_Env = p_env;
		}
		else {
			if ( !_Env ) {
				_Env = _Config["environment-default"];
				for (var p in _Config["environment"] ){
					if ( document.location.href.indexOf( p ) > -1 ) {
						_Env = _Config["environment"][p];
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
	};
	
	function _GlobalLoad(p_hash){
		$.extend(_Global, p_hash);
		return _Global;
	};

	function _GlobalData (p_label, p_value){
		if ( p_label && p_value !== undefined ) {
			_Global[p_label] = p_value; 	
		}
		else if ( p_label ) {
			return _Global[p_label];
		}
		else {
			return _Global;
		}
	};
	
	function _LocalLoad(p_hash){
		$.extend(_Local, p_hash);
		return _Local;
	};

	function _LocalData(p_label, p_value){
		if ( p_label && p_value !== undefined ) {
			_Local[p_label][_GetEnv()] = p_value; 	
		}
		else if ( p_label ) {
			return _Local[p_label][_GetEnv()];
		}
		else  {
			return _Local;
		}
	};
	
	
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
	};
	
	function _EventSubscribe(p_eventName, f_func){
		if ( !_Event[p_eventName] ) {
			_Event[p_eventName] = [];
		}

		var index = _FindEvent( p_eventName, f_func );
		if ( index==-1 ) {
			index = _Event[p_eventName].length;
		}

		_Event[p_eventName][index] = f_func;
	};
	
	function _EventRemove(p_eventName, f_func){
		var index = _FindEvent(p_eventName, f_func);
		if ( index!=-1 ){
			_Event[p_eventName].splice(index,1);
		}
	};

	function _EventNotify(p_eventName, p_data){
		if ( _Event[p_eventName] ) {
			var funcs = _Event[p_eventName];
			for ( var f=0, F=funcs.length; f<F; f++ ) {
				funcs[f](p_data);
			}
		}
	};
	
	
	
	
	function _GetObjectValue (p_obj, p_label) {
		var value;
		if ( p_label.indexOf(".") > -1 ){
			var labels = p_label.split(".");
			var f,F=labels.length;
			for(f=0; f<F; f++){
				if (p_obj !== undefined ) {
					p_obj = p_obj[labels[f]];
				}
				else break;
			}
			value = p_obj;
		}
		else {
			value  = p_obj[p_label];
		}
		return value;
	};

	function _LocaleLoad(p_locale, p_data){
		_D("[iris.lang.Load]", p_locale, p_data);
		
		if ( _Locale === null ) {
			_Locale = p_locale;
		}
		
		if ( !_Lang.hasOwnProperty(p_locale) ) {
			_Lang[p_locale] = {};
		}
		
		$.extend(_Lang[p_locale], p_data);
	};

	function _LangGet (p_label) {
		var value;
		if ( _Lang.hasOwnProperty(_Locale) ) {
			value = _GetObjectValue(_Lang[_Locale], p_label);
			if ( value === undefined ) {
				iris.W("Label '" + p_label + "' not found in Locale '" + _Locale + "'", _Lang[_Locale]);
			}
			if ( typeof value === "object" ) {
				iris.W("Label '" + p_label + "' is an object but must be a property in Locale '" + _Locale + "'", _Lang[_Locale]);
			}
		}
		else {
			iris.W("Locale '" + _Locale + "' not loaded");
		}
		return ( value ) ? value : "??" + p_label + "??";
	};
	
	function _LocaleGet(p_locale) {
		if ( p_locale !== undefined ) {
			_Locale = p_locale;
		}
		else {
			return _Locale;
		}
	};

	function _LocaleParse(p_html){
		var html = p_html;
		var matches = html.match(/@@[A-Za-z_\.]+@@/g);
		
		if ( matches ) {
			var f, F = matches.length;
			for ( f=0; f<F; f++ ) {
				html = html.replace(matches[f], _LangGet(matches[f].substring(2,matches[f].length-2)));
			}
		}
		return html;
	};

	function _LangLoadFrom (p_locale, p_uri, p_settings) {
		_D("[iris.lang.LoadFrom]", p_locale, p_uri);
		
		_AjaxSync(
			  p_uri
			, "json"
			, function (p_data) {
				  _LocaleLoad(p_locale, p_data);
				  _D("[iris.lang.LoadFrom] loaded", p_data);

				  if ( p_settings && p_settings.hasOwnProperty("success") ) {
					  p_settings["success"](p_locale);
				  }
			  }
			, function (p_err) {
				  _E(p_err.status, "Error loading lang file", p_uri);
				  
				  if ( p_settings && p_settings.hasOwnProperty("error") ) {
					  p_settings["error"](p_locale);
				  }
			}
		);
	};


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
				dom.setAttribute(label, p_hash[label]);
			}
		}
		return p_$obj;
	};

	function _JqToHash(p_$obj) {
		var hash = {};
		var attrs = p_$obj.get(0).attributes;
		var label;
		for( var f=0, F=attrs.length; f<F; f++ ) {
			label = attrs[f].name;
			if ( label.indexOf("data-")==0 ){
				label = label.substr(5);
			}
			hash[label] = attrs[f].value;
		}
		return hash;
	};

	
	//
	// ADDON
	//
	function _ApplyAddOn( p_id, p_uis, p_settings ){
		_Include(p_id);
		
		var addOn = new _AbstractAddOn();
		addOn.__Components__ = [];
		addOn.__Setting__ =  {};
		
		addOn.prototype = new _AddOns[p_id]( addOn );
		addOn.Settings(p_settings);
		addOn.AddAll(p_uis);
		addOn.Create();
		return addOn;
	};

	
	function _CreateAddOn( f_addOn  ){
		_AddOns[ _LastIncludePath ] = f_addOn;
	};
	
	//
	// UI
	//
	function _CreateUI (f_ui) {
		_Includes[_LastIncludePath] = f_ui;
	};
	
	function _InstanceUI (p_$container, p_uiId, p_jsUrl, p_uiSettings, p_templateMode) {
		_Include(p_jsUrl);
		
		var uiInstance = new _AbstractUI();
		uiInstance.__Id__ = p_uiId;
		uiInstance.__$Container__ = p_$container;
		uiInstance.__UIComponents__ = [];
		uiInstance.__Setting__ = {};
		uiInstance.__FileJs__ = p_jsUrl;
		
		if ( p_templateMode !== undefined ) {
			uiInstance.__TemplateMode__ = p_templateMode;
		}
		
		uiInstance.prototype = new _Includes[p_jsUrl](uiInstance);
		
		p_uiSettings = p_uiSettings === undefined ? {} : p_uiSettings;
		var jqToHash = _JqToHash(p_$container);
		
		$.extend(uiInstance.__Setting__, jqToHash, p_uiSettings);
		
		uiInstance.Create(jqToHash, p_uiSettings);
		
		return uiInstance;
	};
	
	
	//
	// SCREEN
	//
	function _CreateScreen (f_screen) {
		f_screen.prototype = new _AbstractScreen();
		_Includes[_LastIncludePath] = f_screen;
	};
	
	function _InstanceScreen (p_screenPath) {
		
		var jsUrl = _ScreenUrl[p_screenPath];
		_Include(jsUrl);
		
		var screenInstance = new _AbstractScreen();
		screenInstance.prototype = new _Includes[jsUrl](screenInstance);

		screenInstance.__Id__ = p_screenPath;
		screenInstance.__UIComponents__ = [];
		screenInstance.__$Container__ = _ScreenContainer[p_screenPath];
		screenInstance.__FileJs__ = jsUrl;
		screenInstance.Create();
		screenInstance.Hide();
		
		_Screen[p_screenPath] = screenInstance;
	};
	
	function _DestroyScreen (p_screenPath) {
		if ( _Screen.hasOwnProperty(p_screenPath) ) {
			var contextId = _Screen[p_screenPath].$Get().parent().data("screen_context");
			if ( _LastScreen[contextId] == _Screen[p_screenPath] ) {
				delete _LastScreen[contextId];
			}
			_Screen[p_screenPath].__Destroy__();
			_Screen[p_screenPath].$Get().remove();
			delete _Screen[p_screenPath];
		}
		else {
			iris.W("Error removing the screen \"" + p_screenPath + "\", path not found.");
		}
	};
	
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
				lastScreen.__Sleep__();
				lastScreen.Hide();
			}
			currentScreen.__Awake__( p_params ? p_params : {} );
			currentScreen.Show();

			_LastScreen[contextId] = currentScreen;
		}
	};
	
	function _WelcomeScreen (p_jsUrl) {

		_Include(p_jsUrl);

		var screenInstance = new _AbstractScreen();
		screenInstance.prototype = new _Includes[p_jsUrl](screenInstance);

		screenInstance.__Id__ = "welcome-screen";
		screenInstance.__UIComponents__ = [];
		screenInstance.__$Container__ = $(document.body);
		screenInstance.__FileJs__ = p_jsUrl;
		screenInstance.Create();
		screenInstance.__Awake__();
		screenInstance.Show();

		_WelcomeScreenCreated = true;

		if ( document.location.hash ) {
			_Window_OnHashChange();
		}

	};

	function _TemplateParse (p_html, p_data, p_htmlUrl) {
		var result = p_html
		,	matches
		,	formatLabel
		,	value
		,	regExp = /##([0-9A-Za-z_\.]+)(?:\|(date|currency)(?:\(([^\)]+)\))*)?##/g
		;

		while ( matches = regExp.exec(p_html) ) {
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
							iris.W("Unknow template format label '" + formatLabel + "' in '" + p_htmlUrl + "'");
					}
				}
			}
			else {
				iris.W("Template param '" + matches[1] + "' in '" + p_htmlUrl + "' not found", p_data);
			}

			result = result.replace(matches[0], value);
		}
		
		return result;
	};
	
	function _ParseCurrency (p_value) {
		var settings = _GetRegionalSetting("currency");
			
		var val = Number(p_value);
		var format = (val >= 0) ? settings["formatPos"] : settings["formatNeg"];
		
		var decimal = val % 1;
		var num = String( Math.abs(val-decimal) );
		
		decimal = String(Math.abs(decimal).toFixed(settings["precision"]))
		decimal = decimal.substr(2);
		
		for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
			num = num.substring(0, num.length - (4 * i + 3)) + settings["thousand"] + num.substring(num.length - (4 * i + 3));
		}
		
		return format.replace("n", num + settings["decimal"] + decimal );
	};
	
	function _DateFormat (p_date, p_format) {
		if ( !p_format ) {
			p_format = _GetRegionalSetting("dateFormat");
		}
		
		if ( typeof p_date !== "object" ) {
			p_date = new Date(Number(p_date))
		}
		
		var dateFormat = "";
		for (var f=0, F=p_format.length; f<F; f++) {
			dateFormat += _DateFormatChar(p_format[f], p_date);
		}
		return dateFormat;
	};
	
	function _GetRegionalSetting (p_label) {
		if ( _Regional.hasOwnProperty(_Locale) ) {
			if ( _Regional[_Locale].hasOwnProperty(p_label) ) {
				return _Regional[_Locale][p_label];
			}
			else {
				iris.E("Regional setting '" + p_label + "' not found for locale '" + _Locale + "'");
			}
		}
		else {
			iris.E("Regional for locale '" + _Locale + "' not found");
		}
	};
	
	function _LeadingZero (p_number) {
		return (p_number < 10) ? "0" + p_number : p_number;
	};
	
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
				return regional[monthNames][p_date.getMonth()].substring(0, 3);
			case "b":
				return regional[monthNames][p_date.getMonth()].substring(0, 3).toLowerCase();
			case "F":
				return regional[monthNames][p_date.getMonth()];
			case "d":
				var d = p_date.getDate();
				return _LeadingZero(d);
			case "D":
				return regional[dayNames][p_date.getDay()].substring(0, 3);
			case "l":
				return regional[dayNames][p_date.getDay()];
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
				var h = p_date.getHours();
				h = (h % 12) == 0 ? 12 : h % 12;
				return _LeadingZero(h);
			case "a":
				return (p_date.getHours() > 12) ? "p.m." : "a.m.";
			case "A":
				return (p_date.getHours() > 12) ? "PM" : "AM";
			case "U":
				return Math.floor(p_date.getTime() * 0.001);
			default:
				return p_formatChar;
		}
	};

	var _Regional = {
		 "en-US" : {
			 dayNames : ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
			,monthNames : ["January","February","March","April","May","June","July","August","September","October","November","December"]
			,dateFormat : "m/d/Y h:i:s"
			,currency : {
				 formatPos : "n"
				,formatNeg : "(n)"
				,decimal : "."
				,thousand : ","
				,precision : 2
			}
		}
		,"es-ES" : {
			 dayNames : ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"]
			,monthNames : ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]
			,dateFormat : "d/m/Y H:i:s"
			,currency : {
				 formatPos : "n"
				,formatNeg : "-n"
				,decimal : ","
				,thousand : "."
				,precision : 2
			}
		}
	};

	function _AddRegional (p_locale, p_regional) {
		if (   !p_regional.hasOwnProperty("dayNames") 
			|| !p_regional.hasOwnProperty("monthNames")
			|| !p_regional.hasOwnProperty("dateFormat")
			|| !p_regional.hasOwnProperty("currency")
			|| !p_regional["currency"].hasOwnProperty("formatPos")
			|| !p_regional["currency"].hasOwnProperty("formatNeg")
			|| !p_regional["currency"].hasOwnProperty("decimal")
			|| !p_regional["currency"].hasOwnProperty("thousand")
			|| !p_regional["currency"].hasOwnProperty("precision")
		) {
			iris.E("Regional '" + p_locale + "' has invalid format ", p_regional);
		}
		else {
			_Regional[p_locale] = p_regional;
		}
	};
	
	/**
	 * @class
	 * Provide mechanism to store and retrieve settings values.
	 */
	function _Settable () {

		this.__Setting__ = null;
		
		/**
		 * Set multiple component settings.
		 * You can access to this values using {@link iris-_Settable#Setting}.
		 * @function
		 * @example
		 * 
		 * self.Settings({
		 *      "min" : 0
		 *     ,"label" : "example" 
		 * });
		 */
		this.Settings = function (p_settings) {
			return $.extend(this.__Setting__, p_settings);
		};
		
		/**
		 * Set or get a single component setting.
		 * @function
		 * @example
		 * 
		 * var label = self.Setting("label"); // Get setting value
		 * 
		 * self.Setting("label", "example"); // Set setting value
		 */
		this.Setting = function (p_label, p_value) {
			if ( p_value === undefined ) {
				if ( !this.__Setting__.hasOwnProperty(p_label) ) {
					iris.W("The setting ", p_label, " is not in ", this.__Setting__, this);
				}
				return this.__Setting__[p_label];
			}
			else {
				this.__Setting__[p_label] = p_value;
			}
		};
	};

	/**
	 * @class
	 * Abstract component for UIs / Screens extending.
	 * Common properties and functions.
	 */
	function _AbstractComponent () {
		this.TEMPLATE_APPEND = "append";
		this.TEMPLATE_REPLACE = "replace";
		this.TEMPLATE_PREPEND = "prepend";
		
		this.__$Tmpl__ = null;
		this.__Id__ = null;
		this.__UIComponents__ = null;
		this.__$Container__ = null;
		this.__IsSleeping__ = null;
		this.__FileJs__ = null;
		this.__FileTmpl__ = null;
		
		this.__Sleep__ = function () {
			for ( var f=0, F=this.__UIComponents__.length; f < F; f++ ) {
				this.__UIComponents__[f].__Sleep__();
			}
			this.__IsSleeping__ = true;
			this.Sleep();
		};
		
		this.__Awake__ = function (p_params) {
			for ( var f=0, F=this.__UIComponents__.length; f < F; f++ ) {
				this.__UIComponents__[f].__Awake__();
			}
			this.__IsSleeping__ = false;
			this.Awake(p_params);
		};
		
		this.__Destroy__ = function () {
			if ( !this.__IsSleeping__ ) {
				this.__Sleep__();
			}

			for ( var f=0, F=this.__UIComponents__.length; f < F; f++ ) {
				this.__UIComponents__[f].__Destroy__();
			}
			this.__UIComponents__ = null;
			this.Destroy();
		};

		this.__Template__ = function (p_htmlUrl, p_params, p_mode) {
			this.__FileTmpl__ = p_htmlUrl;
			
			if ( typeof p_htmlUrl == "undefined" ) {
				this.__$Tmpl__ = this.__$Container__;
				return this.__$Tmpl__;
			}
			
			iris.Include(p_htmlUrl);
			
			var tmplHtml = p_params ? _TemplateParse(_Includes[p_htmlUrl], p_params, p_htmlUrl) : _Includes[p_htmlUrl];
			var $tmpl = $(tmplHtml);
			
			this.__$Tmpl__ = $tmpl;
			if ( $tmpl.size() > 1 ) {
				iris.E("Template '" + p_htmlUrl + "' must have only one root node");
			}
			
			switch ( p_mode ) {
				case this.TEMPLATE_APPEND:
					this.__$Container__.append($tmpl);
					break;
				case this.TEMPLATE_REPLACE:
					this.__$Container__.replaceWith($tmpl);
					break;
				case this.TEMPLATE_PREPEND:
					this.__$Container__.prepend($tmpl);
					break;
				default:
					iris.E("Unknown template mode '" + p_mode + "'");
			}
			
		};
		
		// Check if the template is set (https://github.com/intelygenz/iris/issues/19)
		this.__CheckTmpl__ = function () {
			if ( this.__$Tmpl__ == null ) {
				iris.E("You must set a template using self.Template() in '" + this.__FileJs__ + "'");
				return undefined;
			}
		};

		/**
		 * Show the template object.
		 * If the component is a screen, this is called automatically 
		 * after self.Awake() when iris navigates.
		 * 
		 * See {@link iris.Goto} for more details.
		 * @function
		 */
		this.Show = function () {
			this.__CheckTmpl__();
			
			this.__$Tmpl__.show();
		};

		/**
		 * Hide the template object.
		 * If the component is the current screen, this is called automatically 
		 * after self.Sleep() when iris navigates to other screen. Is called too 
		 * when a new screen is created.
		 * 
		 * See {@link iris.Goto} for more details.
		 * @function
		 */
		this.Hide = function () {
			this.__CheckTmpl__();
			
			this.__$Tmpl__.hide();
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
		this.$Get = function (p_id) {
			this.__CheckTmpl__();
			
			if ( p_id ) {
				var
				  	id = "[data-id=" + p_id + "]"
				  , filter = this.__$Tmpl__.filter(id)
				  , $element = null
				;
				
				if ( filter.length > 0 ) {
					$element = filter;
				}
				else {
					var find = this.__$Tmpl__.find(id);
					if ( find.size() > 0 ) {
						$element = find;
					}
				}
				
				if ( $element == null ) {
					iris.E("[data-id=" + p_id + "] not found in '" + this.__FileTmpl__ + "' used by '" +  this.__FileJs__ + "'");
					return undefined;
				}
				else if ( $element.size() > 1 ) {
					iris.E("[data-id=" + p_id + "] must be unique in '" + this.__FileTmpl__ + "' used by '" + this.__FileJs__ + "'");
					return undefined;
				}
				return $element;
			}
			
			return this.__$Tmpl__;
		};
		
		/**
		 * Create a new UI component instance.
		 * 
		 * The created component is registered into the parent screen or UI,
		 * so you must use {@link iris-_AbstractComponent#DestroyUI} in order to remove it.
		 * 
		 * The component is added to <code>p_id</code> container or replace it.
		 * See {@link iris-_AbstractUI#TemplateMode} for more details.
		 * 
		 * @function
		 * @param {String} p_id Container <code>data-id</code>
		 * @param {String} p_jsUrl UI file path
		 * @param {Object} [p_uiSettings] UI Settings is optional
		 * @param {Constant} [p_templateMode] Use self.TEMPLATE_APPEND, self.TEMPLATE_PREPEND, the default mode isself.TEMPLATE_REPLACE (optional) 
		 * @example
		 * 
		 * self.InstanceUI("custom_ui", "custom_ui.js");
		 * 
		 * self.InstanceUI("btn_ok", "button.js", {"label":"OK","ico":"accept"});
		 * 
		 * self.InstanceUI("btn_ok", "button.js", {"label":"example"}, self.TEMPLATE_PREPEND);
		 */
		this.InstanceUI = function (p_id, p_jsUrl, p_uiSettings, p_templateMode) {
			var $container = this.$Get(p_id);
			if ( $container.size() == 1 ) {
				var uiInstance = _InstanceUI($container, $container.data("id"), p_jsUrl, p_uiSettings, p_templateMode);
				this.__UIComponents__[this.__UIComponents__.length] = uiInstance;
				return uiInstance;
			}
		};
		
		/**
		 * Remove a child UI component completely previously created using {@link self.InstanceUI}.
		 * Remove parent references.
		 * @function
		 * @param {UI} p_ui UI to be removed
		 * @example
		 * 
		 * var customUI = self.InstanceUI("custom_ui", "custom_ui.js");
		 * self.DestroyUI(customUI);
		 */
		this.DestroyUI = function (p_ui) {
			for (var f=0, F=this.__UIComponents__.length; f < F; f++) {
				if (this.__UIComponents__[f] == p_ui) {
					this.__UIComponents__.splice(f, 1);
					p_ui.__Destroy__();
					p_ui.$Get().remove();
					break;
				}
			}
		};
		
		/**
		 * Remove all UI components from a container.
		 * The UIs must be previously created using {@link self.InstanceUI}.<br>
		 * Remove parent references.
		 * @function
		 * @param {String|JQuery} p_idOrJq UI Container <code>data-id</code> or JQuery object
		 * @example
		 * self.DestroyAllUIs("container");
		 * 
		 * self.DestroyAllUIs($container);
		 */
		this.DestroyAllUIs = function (p_idOrJq) {
			var contSelector = typeof p_idOrJq === "string" ? "[data-id=" + p_idOrJq + "]" : p_idOrJq.selector;
			var ui;
			for (var f=0, F=this.__UIComponents__.length; f < F; f++) {
				ui = this.__UIComponents__[f];
				
				if (ui.__$Container__.selector == contSelector) {
					this.__UIComponents__.splice(f--, 1);
					F--;
					
					ui.__Destroy__();
					ui.$Get().remove();
				}
			}
		};
		
		/**
		 * Get the component container.
		 * If the component is a screen, the container is
		 * set using {@link iris-_AbstractScreen#AddScreen} function.
		 * Otherwise if the component is a UI, the container is
		 * set using {@link iris-_AbstractComponent#InstanceUI} function.
		 * @function
		 * @example
		 * 
		 * var screenContainer = self.$Container();
		 */
		this.$Container = function () {
			return this.__$Container__;
		};
		
		// To override functions
		
		/**
		 * Called automatically only once at the creation phase.
		 * Function to override.
		 * @function
		 */
		this.Create = function () {};
		
		/**
		 * Called automatically when a screen is showed.
		 * Function to override.
		 * @function 
		 */
		this.Awake = function () {};
		
		/**
		 * Called automatically when a screen is going to sleep, before {@link iris-_AbstractComponent#Sleep}.
		 * If return false, the <code>self.Sleep()</code> function is not called.
		 * @function 
		 */
		this.CanSleep = function () {
			return true;
		};
		
		/**
		 * Called automatically when a screen is hidden.
		 * Function to override.
		 * @function
		 */
		this.Sleep = function () {};
		
		/**
		 * Called automatically by {@link iris-_AbstractComponent#DestroyUI}.
		 * Function to override.
		 */
		this.Destroy = function () {};
	};
	_AbstractComponent.prototype = new _Settable();
	
	/**
	 * @class
	 * Abstract class for AddOn extending.
	 * Common AddOn functions and properties.
	 */
	function _AbstractAddOn () {
		this.__Components__ = null;
		
		/**
		 * Add a array of UIs to the AddOn.
		 * It is called automatically from {@link iris.ApplyAddOn}.
		 * @param p_uis {Array} Array of UIs
		 * @function
		 */
		this.AddAll = function (p_uis) {
			for (var f=0, F=p_uis.length; f<F; f++) {
				this.Add( p_uis[f] );
			}
		};
		
		/**
		 * Add a UI to the AddOn.
		 * @param p_uis {UI} UI instance
		 * @function
		 */
		this.Add = function (p_ui) {
			if ( this.hasOwnProperty("UIAddOn") ) {
				p_ui.proptotype = new this.UIAddOn( p_ui );
			}
			this.__Components__[this.__Components__.length] = p_ui;
		};
		
		/**
		 * Remove a UI from the AddOn.
		 * @param p_uis {UI} UI instance
		 * @function
		 */
		this.Remove = function (p_ui) {
			var ui;
			for (var f=0, F=this.__Components__.length; f<F; f++) {
				ui = this.__Components__[f];
				if ( ui === p_ui ) {
					this.__Components__.splice(f, 1);
				}
			}
		};

		/**
		 * Get a registered UI from the AddOn.
		 * The UI must be previosly registered using {@link iris.ApplyAddOn},
		 * {@link iris-_AbstractAddOn#AddAll} or {@link iris-_AbstractAddOn#Add}
		 * @param p_idx {integer} UI instance position
		 * @function
		 */
		this.Get = function (p_idx) {
			return this.__Components__[p_idx];
		};

		/**
		 * The number of UI components registered.
		 * @function
		 */
		this.Size = function () {
			return this.__Components__.length;
		};
		
		// To override
		
		/**
		 * Called automatically when all UIs have been added.
		 * Function to override.
		 * @function
		 */
		this.Create = function () {};
	}
	_AbstractAddOn.prototype = new _Settable();
	
	/**
	 * @class
	 * Abstract class for UI extending.
	 * Common UI functions and properties.
	 */
	function _AbstractUI () {
		this.__TemplateMode__ = this.TEMPLATE_REPLACE;
		
		/**
		 * Set the template behaviour.
		 * The template can be added to the container
		 * or can replace it. The default mode is <code>self.TEMPLATE_REPLACE</code>.
		 * Use this function before call {@link iris-_AbstractUI.Template}.
		 * @function
		 * @example
		 * self.TemplateMode(self.TEMPLATE_APPEND);
		 * self.Template("tmpl.html");
		 */
		this.TemplateMode = function (p_mode) {
			this.__TemplateMode__ = p_mode;
		};
		
		/**
		 * Create the component template.
		 * Translate multilanguage values, draw parameters, 
		 * create DOM elements and insert into container or replace it.
		 * 
		 * See {@link iris-_AbstractUI.TemplateMode}.
		 * @function
		 * @example
		 * self.TemplateMode(self.TEMPLATE_APPEND);
		 * self.Template("tmpl.html", {"age":23});
		 */
		this.Template = function (p_htmlUrl, p_params) {
			this.__Template__(p_htmlUrl, p_params, this.__TemplateMode__);
		};
	};
	_AbstractUI.prototype = new _AbstractComponent();

	/**
	 * @class
	 * Abstract class for screen extending.
	 * Common screen functions and properties.
	 */
	function _AbstractScreen () {
		
		/**
		 * Create the screen template.
		 * Translate multilanguage values, draw parameters, 
		 * create DOM elements and it is insert into the screen container.
		 * @function
		 * @example
		 * self.Template("tmpl.html", {"name":"Jonh"});
		 */
		this.Template = function (p_htmlUrl, p_params) {
			this.__Template__(p_htmlUrl, p_params, this.TEMPLATE_APPEND);
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
		this.AddScreen = function _ScreenAdd (p_containerId, p_screenPath, p_jsUrl) {
			var $cont = this.$Get(p_containerId);
			
			if ( $cont.data("screen_context") === undefined ) {
				
				// Set a unique screen context id to the screen container
				// like: #path/to/screen|containerid
				$cont.data("screen_context", this.__Id__ + "|" + p_containerId);
			}

			_ScreenUrl[p_screenPath] = p_jsUrl;
			_ScreenContainer[p_screenPath] = $cont;
		};
		
	};
	_AbstractScreen.prototype = new _AbstractComponent();
	
	function _Deserialize (p_$form, p_data) {
		var element, tag, value;
		for ( name in p_data ) {
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
						element.filter('[value="'+value+'"]').attr("checked", "checked");
						break;
					default:
						element.val(value);
					}
				}
			}
		};
	};
	
	function _Serialize (p_$form) {
		var json = {};
		$.map(p_$form.serializeArray(), function(p_obj, p_index){
			json[ p_obj['name'] ] = p_obj['value'];
		});
		return json;
	};
	
	
	/** @namespace Screen management: Add a new screen, ... */
	this.screen = {};
	
	/** @namespace Event management: Add/remove listeners and trigger events. */
	this.event = {};
	
	/** @namespace Application configuration: Load configuration data and environments. */
	this.config = {};
	
	/** @namespace User interface: Work with HTML elements. */
	this.ui = {};
	
	/** @namespace Asynchronous HTTP request and URL base. */
	this.net = {};
	
	/** @namespace Global configurations management */
	this.global = {};
	
	/** @namespace Environment configurations management */
	this.local = {};
	
	/** @namespace Multilanguage : Load translation files, get translated text, ...*/
	this.lang = {};

	/** @namespace Various utilities: Date formatting, serialization, ... */
	this.util = {};
	
	/**
	 * Load the configuration JSON.
	 * You can use iris without load this file.
	 * @function
	 * @param {JSON} config Contains information about environments, global and environment settings, loglevel logs ...
	 * @example
	 * iris.config.Load({
	 * "environment-default" : "pro"
	 *,"environments-nocache" : "dev"
	 *   ,"environment": {
	 *        "localhost" : "dev"
	 *       ,"www.example.com" : "pro"
	 *   }
	 *   ,"log": {
	 *        "dev": "debug,warning,error"
	 *       ,"pro" : "debug,error"
	 *   }
	 *   ,"global": {
     *			"global-variable" : "example"
     *	 }
     *	 ,"local": {
     *		"local-variable" : {
     *		 	"dev" : "example-dev"
     *			,"pro" : "example-pro"
     *		}
     *	 }
	 *	});
	 * 
	 */
	this.config.Load = _ConfigLoad;
	
	/**
	 * Set or get the current environment.
	 * If a configuration file is loaded, iris try set this value using 
	 * the current URL and the defined environments.
	 * If not match anything use "environment-default"
	 * The local variables depends of this value.
	 * @function
	 * @param {String} [p_env] Environment name (optional)
	 * @example
	 * Example: URL=http://localhost:8080/admin
	 * Configuration file:
	 * ...
	 *  "environment": {
	 *        "localhost" : "dev"
	 *       ,"www.example.com" : "pro"
	 *  }
	 * ...
	 *   
	 * iris.config.Env(); // return "dev"
	 * 
	 * iris.config.Env("pro"); // set environment to "pro"
	 */
	this.config.Env = _GetEnv;
	
	/**
	 * Add global configuration values​​.
	 * If you load a configuration file, automatically load the object "global" ({@link iris.config.Load}).
	 * See {@link iris.global.Data} for more details.
	 * @function
	 * @param {Object} p_hash Object like: { "name" : value, ... }
	 * @example
	 * iris.global.Load({"global-variable" : "value"});
	 * iris.global.Data("global-variable"); // return "value"
	 */
	this.global.Load = _GlobalLoad;
	
	/**
	 * Get or set the value of a global configuration variable.
	 * If label and value are not specified then return an object with all values.
	 * See {@link iris.global.Load} for more details.
	 * @function
	 * @param {String} [p_label] Variable label (optional)
	 * @param {String} [p_value] Variable value (optional)
	 * @example
	 * iris.global.Data("global-variable");
	 */
	this.global.Data = _GlobalData;
	
	/**
	 * Add configuration values that depends on current environment.
	 * If you load a configuration file, automatically load the object "local" ({@link iris.config.Load}).
	 * See {@link iris.local.Data} for more details.
	 * @function
	 * @param {Object} p_hash Object like: { "name" : {"environment" : value, ... }, ... }
	 * @example
	 * iris.global.Load({"global-variable" : "value"});
	 * iris.global.Data("global-variable"); // return "value"
	 */
	this.local.Load = _LocalLoad;
	
	/**
	 * Get or set the value of a configuration variable that depends on current environment.
	 * If label and value are not specified then return an object with all values.
	 * See {@link iris.local.Load} for more details.
	 * @function
	 * @param {String} [p_label] Variable label (optional)
	 * @param {String} [p_value] Variable value (optional)
	 * @example
	 * iris.local.Data({
	 *  "local-variable" : {
     *    "dev" : "example-dev"
     *   ,"pro" : "example-pro"
     *	}
     * });
     *  
     * // If environemnt="dev" then return "example-dev"
     * iris.local.Data("local-variable");
	 */
	this.local.Data = _LocalData;
	
	/**
	 * Add translation texts to a locale.
	 * See {@link iris.lang.Get} for more details.
	 * @function
	 * @param {String} p_locale Locale
	 * @param {Object} p_data Object like { "LABEL" : "value", GROUP : { "LABEL" : "value", ... }, ... }
	 * @example
	 * iris.lang.Load( "es-ES"
	 *               ,{ "LABEL":"etiqueta"
	 *                 ,{"GROUP":{
	 *                      "NESTED_VALUE" : "valor anidado"
	 *                  }
	 *                });
	 *
	 * iris.lang.Get("LABEL");
	 * iris.lang.Get("GROUP.NESTED_VALUE");
	 */
	this.lang.Load = _LocaleLoad;
	
	/**
	 * Load remote translation texts into a locale.
	 * @function
	 * @param {String} p_locale Locale
	 * @param {String} p_uri URL to load
	 * @param {Object} p_settings {@code {"success" : function (p_locale) {}, "error" : function (p_locale) {}} }
	 * @example
	 * iris.lang.LoadFrom(
	 *      "es-ES"
	 *    , "http://example.com/lang"
	 *    , {"success":_OnLangLoad}
	 * );
	 */
	this.lang.LoadFrom = _LangLoadFrom;
	
	/**
	 * Get a translation text according to the Locale.
	 * You can access to nested values using dot notation.
	 * See {@link iris.local.Locale} for more details.
	 * @function
	 * @param {String} p_label Label
	 * @example
	 * iris.lang.Get("LABEL");
	 *
	 * iris.lang.Get("GROUP.LABEL");
	 */
	this.lang.Get = _LangGet;
	
	/**
	 * Set or get the current locale.
	 * @function
	 * @param {String} [p_locale] Locale (optional)
	 * @example
	 * var locale = iris.lang.Locale();
	 * iris.lang.Locale("es-ES");
	 */
	this.lang.Locale = _LocaleGet;
	
	/**
	 * Safe debug traces.
	 * @function 
	 * @param {arguments} 
	 * @example
	 * iris.L("text", variable);
	 */
	this.L = _L;
	
	/**
	 * Safe debug traces. If debug-level is active for the current environment then print traces.
	 * See {@link iris.config.Load} for more details.
	 * @function
	 * @param {arguments} 
	 * @example
	 * iris.D("text", variable);
	 */
	this.D = _D;
	
	/**
	 * Safe warning traces. If warning-level is active for the current environment then print traces.
	 * @function
	 * @see {@link iris.config.Load}
	 * @param {arguments} 
	 * @example
	 * iris.W("text", variable);
	 */
	this.W = _W;
	
	/**
	 * Safe error traces. If error-level is active for the current environment then print traces.
	 * See {@link iris.config.Load} for more details.
	 * @function
	 * @param {arguments} 
	 * @example
	 * iris.E("text", variable);
	 */
	this.E = _E;
	
	/**
	 * Add an event listener.
	 * See {@link iris.event.Notify} and {@link iris.event.Remove} for more details.
	 * @function
	 * @param {String} p_eventName Event identifier
	 * @param {Function} f_func Event listener
	 * @example
	 * iris.event.Subscribe("user_select", _OnUserSelect);
	 */
	this.event.Subscribe = _EventSubscribe;
	
	/**
	 * Trigger an event.
	 * See {@link iris.event.Subscribe} and {@link iris.event.Remove} for more details.
	 * @function
	 * @param {String} p_eventName Event identifier
	 * @param {Object} p_data Event paramater
	 * @example
	 * iris.event.Notify(
	 *    "user_select"
	 *  , {"user_id" : 123, "name" : "John"}
	 * );
	 */
	this.event.Notify = _EventNotify;
	
	/**
	 * Remove an event listener.
	 * See {@link iris.event.Subscribe} and {@link iris.event.Notify} for more details.
	 * @function
	 * @param {String} p_eventName Event identifier
	 * @param {String}  f_func Event listener
	 * @example
	 * iris.event.Remove("user_select", _OnUserSelect);
	 */
	this.event.Remove = _EventRemove;
	
	/**
	 * Get or set the application base URL.
	 * Use the &lt;base &gt; HTML tag if are defined.
	 * @function
	 * @param {String} [p_baseUri] URL base (optional)
	 * @example
	 * // Current URL = http://www.example.com/admin/example/path?a=1
	 * iris.net.BaseUri(); // return http://www.example.com/
	 */
	this.net.BaseUri = _BaseUri;
	
	/**
	 * Do an Ajax request.
	 * Accepts the same parameters as jQuery.ajax()
	 * @function
	 * @see <a href="http://api.jquery.com/jQuery.ajax/">JQuery Ajax</a>.
	 * @example
	 * iris.net.Ajax(
	 *		{     "url" : "/s/myservice"
	 *			, "type" : "GET"
	 * 		}
	 * );
	 */
	this.net.Ajax = _Ajax;
	
	/**
	 * Register a Screen object.
	 * It must appear at the beginning of the screen file.
	 * @function
	 * @param {Function} f_screen Screen class
	 * @example
	 * iris.Screen(
	 *   function (self) {
	 *   	self.Create = function () {
	 *   	}
	 *   
	 *   	self.Awake = function (p_params) {
	 *   	}
	 *   
	 *   	self.Sleep = function () {
	 *   	}
	 *   }
	 * );
	 */
	this.Screen = _CreateScreen;
	
	/**
	 * Register an UI object.
	 * It must appear at the beginning of the screen file.
	 * @function
	 * @param {Function} f_ui UI class
	 * @example
	 * iris.UI(
	 *   function (self) {
	 *   	self.Create = function (p_domAttr, p_settings) {
	 *   	}
	 *   
	 *   	self.Awake = function (p_params) {
	 *   	}
	 *   
	 *   	self.Sleep = function () {
	 *   	}
	 *   }
	 * );
	 */
	this.UI =  _CreateUI;
	
	/**
	 * Set the initial screen.
	 * This screen is registered as the root screen 
	 * and automatically is shown.
	 * @param {String} p_jsUrl Screen controller
	 * @function
	 * @example
	 * iris.screen.WelcomeScreen("screen/main.js");
	 */
	this.screen.WelcomeScreen = _WelcomeScreen;
	
	/**
	 * Destroy a created screen.
	 * Free screen and its UIs memory.
	 * Call in cascade all Sleep() and Destroy() functions for its UI childs.
	 * @function
	 * @param {String} p_screenPath Screen URL path
	 * @example
	 * iris.screen.Destroy("#books/edit");
	 */
	this.screen.Destroy = _DestroyScreen;
	
	/**
	 * Copy all data-* attributes to an object.
	 * Remove the "data-" prefix from attribute names.
	 * @function
	 * @param {JQuery} p_$obj Object to merge
	 * @example
	 * var $obj = $("&lt;div data-id='test' data-class='myclass'&gt;&lt;/div&gt;")
	 * var params = iris.ui.JqToHash($obj);
	 * // return: {"id" : "test", "class" : "myclass"}
	 */
	this.ui.JqToHash = _JqToHash;
	
	/**
	 * Set the object values to a JQuery object.
	 * @function
	 * @param {Object} p_hash Object with source values
	 * @param {JQuery} p_$obj JQuery object target
	 * @param {String[]} [p_filter] Indicates that values ​​should be copied (optional)
	 * @example
	 * iris.ui.HashToJq(
	 *   { "class":"myclass", "other":"other_value" }
	 *  , $obj
	 *  , ["class"]
	 * ); // Set the $obj attribute "class"
	 */
	this.ui.HashToJq = _HashToJq;
	
	/**
	 * Include static resources dynamically.
	 * The load is <b>synchronous</b> and tracks all the files included to prevent them to be included twice.<br>
	 * You can include:<br>
	 * <ul>
	 * <li>CSS files: style files are included by creating a link dynamically in the header of the index page.</li>
	 * <li>JS files: script files are included by creating a script object dynamically in the header of the index page 
	 *  	and append the loaded content to it. When including javascript files you must take care of the syntax 
	 *  	as including javascript file with some syntax error would produce an error when adding it to a script element.</li>
	 *  </ul>
	 * @function
	 * @param {arguments} File paths
	 * @example
	 * iris.Include("app/service/myservice.js", "app/css/mycss.css");
	 */
	this.Include = _IncludeFiles;
	
	/**
	 * Formats a Date object or timestamp to the specified format and according to the current locale. <br>
	 * You can use the following special characters:<br><br>
	 *   <b>a</b>	'a.m.' or 'p.m.'<br>
	 *   <b>A</b>	'AM' or 'PM'<br>
	 *   <b>b</b>	Month, textual, 3 letters, lowercase.	'jan'<br>
	 *   <b>d</b>	Day of the month, 2 digits with leading zeros.	'01' to '31'<br>
	 *   <b>D</b>	Day of the week, textual, 3 letters.	'Fri'<br>
	 *   <b>F</b>	Month, textual, long.	'January'<br>
	 *   <b>h</b>	Hour, 12-hour format.	'01' to '12'<br>
	 *   <b>H</b>	Hour, 24-hour format.	'00' to '23'<br>
	 *   <b>i</b>	Minutes.	'00' to '59'<br>
	 *   <b>l</b>	Day of the week, textual, long.	'Friday'<br>
	 *   <b>m</b>	Month, 2 digits with leading zeros.	'01' to '12'<br>
	 *   <b>M</b>	Month, textual, 3 letters.	'Jan'<br>
	 *   <b>n</b>	Month without leading zeros.	'1' to '12'<br>
	 *   <b>s</b>	Seconds, 2 digits with leading zeros.	'00' to '59'<br>
	 *   <b>U</b>	Seconds since the Unix Epoch (January 1 1970 00:00:00 UTC)<br>
	 *   <b>y</b> 	Year, 2 digits.	'99'<br>
	 *   <b>Y</b>	Year, 4 digits.	'1999'<br>
	 * @function
	 * @param {Date|Timestamp} p_date Date object or timestamp (UNIX timestamp)
	 * @param {String} [p_format] Format string (optional)
	 * @example
	 * iris.util.DateFormat(new Date(),"ymd");
	 * iris.util.DateFormat("1331954654564","d/m/y h:i:s"); // 17/03/12 04:24:14
	 * iris.util.DateFormat(1331954654564);
	 */
	this.util.DateFormat = _DateFormat;
	

	/**
	 * Formats a Number or String to Currency using the current locale defined at {@link iris.Regional} <br>
	 * @function
	 * @param {Number|String} p_value Number or String number
	 * @example
	 *	regional = en-US
	 * 		iris.util.Currency(1234.56);		-> $ 1,234.56
	 * 		iris.util.Currency("123456789"); 	-> $ 123,456,789
	 * 	regional = es-ES
	 * 		iris.util.Currency(1234.56);		-> 1,234.56 €
	 *		iris.util.Currency("123456789"); 	-> 123,456,789 €
	 */
	this.util.Currency = _ParseCurrency;


	/**
	 * Fill all form component with data.
	 * @function
	 * @param p_$form {JQuery Object} Form target
	 * @param p_data {Object} Object data source
	 * @example
	 * var data = {"name":"Jonh", "surname": "Doe"};
	 * iris.util.Deserialize($form, data);
	 */
	this.util.Deserialize = _Deserialize;
	
	/**
	 * Serialize a form data to Object.
	 * @function
	 * @param p_$form
	 * @example
	 * var data = iris.util.Serialize($form);
	 */
	this.util.Serialize = _Serialize;
	
	/**
	 * Navigate to a screen.
	 * The screen must be previously added using {@link iris-_AbstractScreen#AddScreen}.<br>
	 * You can send parameters to the target screen as <code>... /screen?param1=value1&param2=value2/ ...</code>,
	 * remember apply <code>encodeURIComponent()</code> to the parameter values.<br>
	 * @function
	 * @param p_hashUri {String} Hash URL
	 * @example
	 * 
	 * iris.Goto("#home/section/subsection");
	 *
	 * // Call with screen parameters
	 * iris.Goto("#home/section?id=5&name=example%20name/subsection");
	 * 
	 * // Remember encode param values
	 * var email = encodeURIComponent("user@example.com");
	 * iris.Goto("#home/section?email=" + email);
	 */
	this.Goto = _Goto;
	
	/**
	 * Register a AddOn object.
	 * It must appear at the beginning of the AddOn file.
	 * @function
	 * @param {Function} f_addOn AddOn Class
	 * @example
	 * iris.AddOn(
	 *   function (self) {
	 *   	self.Create = function ( p_uis ) {
	 *   	}
	 *   	...
	 *   }
	 * );
	 */
	this.AddOn = _CreateAddOn;
	
	/**
	 * Apply a AddOn to a group of UI components or single UI.
	 * @function
	 * @param p_id {String} AddOn identifier
	 * @param p_uis {Object|Array} UI Component/s
	 * @example
	 * var customUI = self.InstanceUI("input", "input.js");
	 * iris.ApplyBE("validator.js", customUI);
	 *
	 * var otherCustomUI = self.InstanceUI("input", "input.js");
	 * iris.ApplyAddOn("validator.js", [customUI, otherCustomUI]);
	 *
	 */
	this.ApplyAddOn = _ApplyAddOn;
	
	/**
	 * Specify a new regional or change the actuals regionals to format dates and currencies.
	 * You must set a valid regional object with all properties: 'dayNames', 'monthNames', etc...<br>
	 * Iris has two predefined regionals:
	 * <pre>	"en-US" : {
	 *		 dayNames : ["Sunday","Monday","Tuesday"
	 *				,"Wednesday","Thursday","Friday","Saturday"]
	 *		,monthNames : ["January","February","March"
	 *				,"April","May","June","July"
	 *				,"August","September","October"
	 *				,"November","December"]
	 *		,dateFormat : "m/d/Y h:i:s"
	 *		,currency : {
	 *			 formatPos : "$ n"
	 *			,formatNeg : "($ n)"
	 *			,decimal : "."
	 *			,thousand : ","
	 *			,precision : 2
	 *		}
	 *	}
	 *	
	 *	"es-ES" : {
	 *		 dayNames : ["Domingo","Lunes","Martes"
	 *			,"Miércoles","Jueves","Viernes","Sábado"]
	 *		,monthNames : ["Enero","Febrero","Marzo"
	 *			,"Abril","Mayo","Junio","Julio","Agosto"
	 *			,"Septiembre","Octubre","Noviembre","Diciembre"]
	 *		,dateFormat : "d/m/Y H:i:s"
	 *		,currency : {
	 *			 formatPos : "n €"
	 *			,formatNeg : "-n €"
	 *			,decimal : ","
	 *			,thousand : "."
	 *			,precision : 2
	 *		}
	 *	}</pre>
	 * @function
	 * @param p_locale {String} Locale identifier
	 * @param p_regional {Object} Regional data
	 * @example
	 *  iris.Regional("es-ES", {
	 *		 dayNames : ["D","L","M","M","J","V","S"]
	 *		,monthNames : ["Ene","Feb","Mar","Abr","May","Jun"
	 *			,"Jul","Ago","Sep","Oct","Nov","Dic"]
	 *		,dateFormat : "d/m/Y"
	 *		,currency : {
	 *			 formatPos : "n €"
	 *			,formatNeg : "-n €"
	 *			,decimal : ","
	 *			,thousand : "."
	 *			,precision : 2
	 *		}
	 *	}
	 */
	this.Regional = _AddRegional;
	
	_Init();
	
};
