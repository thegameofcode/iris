[Iris homepage](https://github.com/thegameofcode/iris) | [Documentation table of contents](toc.md)

# The iris API

Iris exposes all of its methods and properties on the `iris` object:

- [Core](#core)
	- [iris.baseUri([path])](#irisbaseuripath)
	- [iris.cache([enabled])](#iriscacheenabled)
	- [iris.cacheVersion([value])](#iriscacheversionvalue)
	- [iris.noCache(args)](#irisnocacheargs)
	- [iris.enableLog(args)](#irisenablelogargs)
	- [iris.log(args)](#irislogargs)
	- [iris.isLocalhost()](#irisislocalhost)
- [Util](#util)
	- [iris.ajax(settings)](#irisajaxsettings)
	- [iris.val(obj, label)](#irisvalobj-label)
	- [iris.date(date, format)](#irisdatedate-format)
	- [iris.number(number, config)](#irisnumbernumber-config)
	- [iris.currency(amount, config)](#iriscurrencyamount-config)
	- [iris.browser()](#irisbrowser)
	- [iris.inherits(subClass, superClass)](#irisinheritssubclass-superclass)
- [Event](#event)
	- [iris.notify(eventId[, params])](#irisnotifyeventid-params)
	- [iris.on(eventId, listener)](#irisoneventid-listener)
	- [iris.off(eventId[, listener])](#irisoffeventid-listener)
	- [iris.destroyEvents(eventId, listeners)](#irisdestroyeventseventid-listeners)
	- [iris.Event class](#irisevent-class)
		 - [iris.Event.events(args)](#iriseventeventsargs)
		 - [iris.Event.checkEvent(eventName)](#iriseventcheckeventeventname)
		 - [iris.Event.on(eventName, listener)](#iriseventoneventname-listener)
		 - [iris.Event.off(eventName[, listener])](#iriseventoffeventname-listener)
		 - [iris.Event.notify(eventName[, parameter])](#iriseventnotifyeventname-parameter)
		 - [iris.Event.notifyOn()](#iriseventnotifyon)
		 - [iris.Event.notifyOff()](#iriseventnotifyoff)
		 - [iris.Event.listen(target, eventName, listener)](#iriseventlistentarget-eventName-listener)
		 - [iris.Event.pauseListeners()](#iriseventpauselisteners)
		 - [iris.Event.resumeListeners()](#iriseventresumeListeners)
		 - [iris.Event.removeListeners()](#iriseventremoveListeners)
	- [Iris Events](#iris-events)
		- [iris.BEFORE_NAVIGATION](#irisbefore_navigation)
		- [iris.AFTER_NAVIGATION](#irisafter_navigation)
		- [iris.RESOURCE_ERROR](#irisresource_error)
		- [iris.SCREEN_NOT_FOUND](#irisscreen_not_found)
- [Language & Regional](#language--regional)
	- [iris.translate(text[, locale])](#iristranslatetext-locale)
	- [iris.translations(locale, [terms]|[file, [callbacks]])](#iristranslationslocale-termsfile-callbacks)
	- [iris.locale([locale][, regional])](#irislocalelocale-regional)
	- [iris.regional([label])](#irisregionallabel)
- [Components](#components)
	- [iris.include(paths, callback)](#irisincludepaths-callback)
	- [iris.welcome(path)](#iriswelcomepath)
	- [iris.navigate(path)](#irisnavigatepath)
	- [iris.screen(function(self){...}, path)](#irisscreenfunctionself-path)
	- [iris.destroyScreen(path)](#irisdestroyscreenpath)
	- [iris.ui(function(self){...}, path)](#irisuifunctionself-path)
	- [iris.tmpl(path, html)](#iristmplpath-html)
	- [iris.resource(function(self){...}, path)](#irisresourcefunctionself-path)
	- [iris.debug(enabled)](#irisdebugenabled)
- [Classes](#classes)
	- [iris.Settable Class](#irissettable-class)
		- [self.setting(label[, value])](#selfsettinglabel-value)
		- [self.settings(params)](#selfsettingsparams)
	- [iris.Component Class](#iriscomponent-class)
		- [self.tmpl(path)](#selftmplpath)
		- [self.get([data-id])](#selfgetdata-id)
		- [self.inflate(data)](#selfinflatedata)
		- [self.ui(container_id, path[, settings, tmpl_mode])](#selfuicontainer_id-path-settings-tmpl_mode)
		- [self.destroyUI([ui_component])](#selfdestroyuiui_component)
		- [self.destroyUIs(container_id)](#selfdestroyuiscontainer_id)
	- [iris.UI Class](#irisui-class)
		- [self.tmplMode(mode)](#selftmplmodemode)
	- [iris.Screen Class](#irisscreen-class)
		- [self.param(name)](#selfparamname)
		- [self.screens(container_id, screens)](#selfscreenscontainer_id-screens)
	- [iris.Resource Class](#irisresource-class)
		- [self.get(path, success, error)](#selfgetpath-success-error)
		- [self.post(path, params, success, error)](#selfpostpath-params-success-error)
		- [self.put(path, params, success, error)](#selfputpath-params-success-error)
		- [self.del(path, success, error)](#selfdelpath-success-error)


## Core

### iris.baseUri([path])
*Since*: `v0.5.0`

Set the base URL applied to load Iris components like screens, UIs & resources.

```javascript
// You can define paths as
iris.path = {
		screen : { 
				js: "./path/to/iris/components/screen.js",
				html: "./path/to/iris/components/screen.html"
		}
};

// Or you can use iris.baseUri to short paths
iris.path = {
		screen : { 
				js: "screen.js",
				html: "screen.html"
		}
};
iris.baseUri("./path/to/iris/components/");
```

### iris.cache([enabled])
*Since*: `v0.5.0`

Set or get a boolean value that indicates whether Iris' calls are cached or not.
In local environments (localhost, 127.0.0.1) the cache are disabled by default.

```javascript
// Getter
iris.cache();

// Setter
iris.cache(true);
```

### iris.cacheVersion([value])
*Since*: `v0.5.0`

Set or get a value that will be added as query parameter in all Iris' ajax calls.
You can use it to force Iris' components to be cached with a version string.
By default cache version is disabled.

```javascript
// Getter
iris.cacheVersion();

// Setter
iris.cacheVersion("v1.0");
```

### iris.noCache(args)
*Since*: `v0.5.0`

Disable browser cache adding a timestamp param (e.g.: url?_=1374053849520) on each HTTP call when the environment match with the current URL.

```javascript
// By default iris executes:
iris.noCache("localhost", "127.0.0.1");
```

### iris.enableLog(args)
*Since*: `v0.5.0`

Enable or disable the *iris.log* outputs according to the current URL.

```javascript
// Enable logs only in development hosts
iris.enableLog("localhost", "dev.example.com", "int.example.com");
```

Since `v0.5.5`, you can enable or disable iris logs using a boolean, e.g.:

```javascript
iris.enableLog(false); // Disable all iris logs
```


### iris.log(args)
*Since*: `v0.5.0`

Prints the parameters values to the console for debugging purposes.
If logging is disabled, it doesn't print any.
To enable or disable logging use `iris.enableLog`.
It uses the native `console.log` and works in all modern browsers and IE8+.

```javascript
// Basic example
iris.log("Hello world!");
```

```javascript
// Multiple parameters
iris.log("obj = ", obj, " obj2 = ", obj2);
```

```javascript
// Enable logs only in the development machine
iris.enableLog("127.0.1.30");

iris.log("This is only printed in 127.0.1.30");
```

### iris.isLocalhost()
*Since*: `v0.5.7`

Returns `true` if `document.location.href` contains `localhost` or `127.0.0.1`.

```javascript
if ( iris.isLocalhost() ) {
	// do something
}
```


## Util
### iris.ajax(settings)
*Since*: `v0.5.0`

Perform an HTTP (Ajax) request.
Accepts the same parameters as *jQuery.ajax()*
See <a href="http://api.jquery.com/jQuery.ajax/">JQuery Ajax</a> for more details.
Returns a jQuery [jqXHR](http://api.jquery.com/Types/#jqXHR) object.

```javascript
iris.ajax({
	"url" : "http://www.example.com/",
	"type" : "GET"
}).done(successCallback).fail(errorCallback);
```

### iris.val(obj, label)
*Since*: `v0.5.0`

Get value from Javascript object using a label string.
You can use dot to get object's children.

```javascript
var book = {
		author : {
				name : "value"
		}
};

var authorName = iris.val(book, "author.name");
```


### iris.date(date, format)
*Since*: `v0.5.0`

Formats a Date object or timestamp to the specified format and according to the current locale.
See [Language & Regional](#language--regional) for more information.
You can use the following special characters:

* __a__ 'a.m.' or 'p.m.'
* __A__ 'AM' or 'PM'
* __b__ Month, textual, 3 letters, lowercase. 'jan'
* __d__ Day of the month, 2 digits with leading zeros. '01' to '31'
* __D__ Day of the week, textual, 3 letters. 'Fri'
* __F__ Month, textual, long. 'January'
* __h__ Hour, 12-hour format. '01' to '12'
* __H__ Hour, 24-hour format. '00' to '23'
* __i__ Minutes. '00' to '59'
* __l__ Day of the week, textual, long. 'Friday'
* __m__ Month, 2 digits with leading zeros. '01' to '12'
* __M__ Month, textual, 3 letters. 'Jan'
* __n__ Month without leading zeros. '1' to '12'
* __s__ Seconds, 2 digits with leading zeros. '00' to '59'
* __U__ Seconds since the Unix Epoch (January 1 1970 00:00:00 UTC)
* __y__ Year, 2 digits. '99'
* __Y__ Year, 4 digits. '1999'

```javascript
iris.date(new Date(),"ymd");

iris.date(1331954654564,"d/m/y h:i:s"); // "17/03/12 04:24:14"

iris.date("Thu Feb 14 2013 12:42:49 GMT+0100 (CET)", "d-m-Y"); // "14-02-2013"
```

### iris.number(number, config)
*Since*: `v0.5.0`

Formats a number according to the current locale or `config` values.
See [Language & Regional](#lang) for more information.
Default `config` value are:

```javascript
{
		formatPos: "n",
		formatNeg: "- n",
		decimal: ".",
		thousand: ",",
		precision: 2
}
```

e.g. :

```javascript
iris.locale(
		"es_ES", {
				number : {
						decimal: ",",
						thousand: ".",
						precision: 2
				}
		}
);

iris.number(5600.899); // "5.600,90"

iris.number(5600.899, { precision: 0 }); // "5.601"

iris.number(5600.899, {
		decimal: ".",
		thousand: ",",
		precision: 1
}); // "5,600.9"

```

### iris.currency(amount, config)
*Since*: `v0.5.0`

Formats a amount according to the current locale or `config` values.
See [Language & Regional](#lang) for more information.
Default `config` value are:

```javascript
{
		formatPos: "sn",
		formatNeg: "(sn)",
		symbol : "$"
}
```

e.g. :

```javascript
iris.locale(
		"es_ES", {
				currency : {
						formatPos: "n s",
						formatNeg: "- n s",
						decimal: ",",
						thousand: ".",
						precision: 2,
						symbol : "$"
				}
		}
);

iris.currency(5600.899); // "5.600,90 €"

iris.currency(-5600.899); // "- 5.600,90 €"

iris.currency(5600.899, { symbol : "" }); // "5.600,90"

```

### iris.browser()
*Since*: `v0.5.1`

Returns an object with the browser information using user-agent.
It contains flags for each of the four most prevalent browser classes (Internet Explorer, Mozilla, Webkit, and Opera) as well as version information.
Because it uses `navigator.userAgent` to determine the platform, it is vulnerable to spoofing by the user or misrepresentation by the browser itself. It is always best to avoid browser-specific code entirely where possible. 

Available flags are:
 * chrome
 * webkit
 * safari
 * opera
 * msie
 * mozilla

*Example*: Returns true if the current useragent is some version of Microsoft's Internet Explorer:
```javascript
iris.browser().msie;
```

*Example*: Show the browser info object:
```javascript
console.log( iris.browser() );
```

### iris.inherits(subClass, superClass)
*Since*: `v0.5.5`

Inheritance with the prototype chain.

```javascript
// Basic example

// SuperClass
function Mammal (name) {
  this.name = name;
}
Mammal.prototype.sayName = function() { 
	console.log('[Mammal "' + this.name + '"]');
}

// SubClass
function Cat (name) {
  Mammal.call(this, name); // Call SuperClass constructor
}

// Cat will inherit the Mammal prototyped functions
iris.inherits(Cat, Mammal);

var kitty = new Cat('Kitty');
kitty.sayName(); // [Mammal Kitty]

```


## Event

### iris.notify(eventId[, params])
*Since*: `v0.5.0`

Triggers an event.
See `iris.on` and `iris.off` for more details.

```javascript
iris.notify("my-event", {param : value});

iris.notify("my-event");
```

### iris.on(eventId, listener)
*Since*: `v0.5.0`

Adds an event listener.
See `iris.notify` and `iris.off` for more details.

```javascript
iris.on("my-event", listener);
```

### iris.off(eventId[, listener])
*Since*: `v0.5.0`

Removes an event listener.
See `iris.notify` and `iris.on` for more details.
If listener is not specified, all listeners are removed.

```javascript
iris.off("my-event", listener);

iris.off("my-event"); // remove all listeners
```

### iris.destroyEvents(eventId, listeners)
*Since*: `v0.5.0`

Removes a collection of event listeners.

```javascript
iris.destroyEvents("my-event", [listener1, listener2]);
```

### iris.Event class

#### iris.Event.events(args)
*Since*: `v0.6.0`

Define allowed events. This a way to indicate what events can manage an object. When iris.Event.on, iris.Event.off or iris.Event.notify are called, the first thing is to check if the event name is allowed, otherwise it raises an exception. Explicit registration of events is a good practice that helps developers to control component events.

```javascript
// First off, create a sample UI
iris.ui(function (self) {

	// This UI can trigger only events with these names
    self.events('update', 'change', 'refresh');

}, iris.path.ui.example.js);


// In another place, in a screen for example
iris.screen(function(self) {

	self.create = function() {
		...

		self.ui(iris.path.ui.example.js).on('refresh', onUpdate); // 'refresh' event is allowed

		self.ui(iris.path.ui.example.js).on('not_defined_event', onNotDefinedEvent); // throws an exception
	};


},iris.path.screen.welcome.js);
```

#### iris.Event.checkEvent(eventName)
*Since*: `v0.6.0`

Checks if the event name has been registered previously, otherwise throws an exception. Use iris.Event.events to register the component's allowed events before to notify them. This function is called from iris.Event.on, iris.Event.off and iris.Event.notify.

```javascript
iris.model(function (self) {

	// Allowed methods
    self.events('toggle', 'change_title');

}, iris.path.model.example.js);


// In another place, in a UI for example
iris.ui(function(self) {

	self.create = function() {
		...

		var model = self.model(iris.path.model.example.js, {title: 'example'});

		model.checkEvent('change_title'); // 'change_title' event is allowed

		model.checkEvent('not_registered_event'); // throws an exception
	};


},iris.path.ui.example.js);
```

#### iris.Event.on(eventName, listener)
*Since*: `v0.6.0`

Add an event listener. __Warning__: you must be careful this may cause memory leaks.
Remember register before the event name in the target using [iris.Event.events](#iriseventeventseventName-listener).

A common case of memory leaks:
- Create an UI and suscribe it to a model event
- Destroy the created UI (the listener is still subscribed to the model)
- If you dont remove the listener before destroy it, the UI cannot be removed by the garbage collector

To prevent memory leaks use the iris.Event.listen instead of.

```javascript

iris.model(function (self) {

	// Allowed methods
    self.events('complete');

}, iris.path.model.example.js);


// In another place, in a screen for example
iris.screen(function(self) {

	function onModelComplete () {
		console.log('the model is complete!');
	}

	self.create = function() {
		...

		var model = self.model(iris.path.model.example.js, {title: 'example'});

		model.on('complete', onModelComplete);

	};

	self.destroy = function() {
		// Remember remove the listener in order to prevent memory leaks
		// We recommend use iris.Event.listen instead of iris.Event.on
		model.off('complete', onModelComplete);
	}


}, iris.path.screen.welcome.js);

```

#### iris.Event.off(eventName[, listener])
*Since*: `v0.6.0`

Removes an event listener. If the `listener` is omitted, all component's listeners for `eventName` will be removed.

```javascript

// Iris event
iris.off(iris.BEFORE_NAVIGATION, onBeforeNavigation); // Unsubscribe one listener
iris.off(iris.BEFORE_NAVIGATION); // Remove all listeners

// Local event
iris.model(function (self) {

	self.events('refresh');

}, iris.path.model.example.js);

var target = iris.model(iris.path.model.example.js, {text:'example'});
target.on('refresh', callback1);
target.on('refresh', callback2);
target.off('refresh'); // Remove callback1 and callback2

```


#### iris.Event.notify(eventName[, parameter])
*Since*: `v0.6.0`

Trigger added callbacks for the given `eventName`. To add callbacks use iris.Event.on or iris.Event.listen. The `parameter` object will be passed along to the event callbacks. Use iris.Event.notifyOn or iris.Event.notifyOff to enable or disable this function.

```javascript

iris.ui(function(self) {

	self.create = function() {
		...
		// Remember register the event before
		self.events('user_cancel');

		// Without parameters
		self.notify('user_cancel');

		// With parameters
		var params = { userName: model.get('name'), location: _getLocation() };
		self.notify('user_cancel', params);
	};


}, iris.path.ui.example.js);
```



#### iris.Event.notifyOn()
*Since*: `v0.6.0`

Enable notification of events. The property `self.silent` will be `false`.
By default notifications are enabled.

```javascript

iris.ui(function(self) {

	self.create = function() {
		...
		// Remember register the event before
		self.events('test_event');

		// Now this UI is silent
		self.notifyOff();

		// The event is not emitted
		self.notify('test_event');

		// Enable notifications again
		self.notifyOn();

		// The event is emitted
		self.notify('test_event');
	};


}, iris.path.ui.example.js);
```



#### iris.Event.notifyOff()
*Since*: `v0.6.0`

Disable notification of events. The property `self.silent` will be `true`.
By default notifications are enabled.

```javascript

iris.ui(function(self) {

	self.create = function() {
		...
		// Remember register the event before
		self.events('test_event');

		// Trigger event
		self.notify('test_event');

		// Now this UI is silent
		self.notifyOff();

		// The event is not emitted
		self.notify('test_event');
	};


}, iris.path.ui.example.js);
```


#### iris.Event.listen(target, eventName, listener)
*Since*: `v0.6.0`


The current object listen to a particular event (`eventName`) on the `target` object.
The advantage of using this form, instead of iris.Event.on, is that `listen` adds the event listener in a safe way to prevent memory leaks and you can remove or pause or resume all listeners at once later on.


When the `target` is destroyed the listener is removed automatically and when the current object is destroyed, all registered listeners are removed on the targets.


You can use iris.Event.removeListeners, iris.Event.pauseListeners or iris.Event.resumeListeners to manage them.

```javascript

iris.model(function (self) {

	// Allowed methods
    self.events('complete');

}, iris.path.model.example.js);


// In another place, in a UI for example
iris.ui(function(self) {

	function onModelComplete () {
		console.log('the model is complete!');
	}

	self.create = function() {
		...

		var model = self.model(iris.path.model.example.js, {title: 'example'});

		// When this UI is destroyed, Iris will call to model.off('complete', onModelComplete)
		// And if model is destroyed, Iris will remove the listener too
		self.listen(model, 'complete', onModelComplete);

	};

	self.awake = function () {
		// This may be useful in some cases
		self.resumeListeners();
	};

	self.sleep = function () {
		// When the UI is asleep, the listeners will not called
		self.pauseListeners();
	};


}, iris.path.ui.example.js);

```


#### iris.Event.pauseListeners()
*Since*: `v0.6.0`

Pause all listeners added using iris.Event.listen, this will remove the listeners from targets. Use iris.Event.resumeListeners to add them again.

```javascript

iris.model(function (self) {

	// Allowed methods
    self.events('complete');

}, iris.path.model.example.js);


// In another place, in a UI for example
iris.ui(function(self) {

	function onModelComplete () {
		console.log('the model is complete!');
	}

	self.create = function() {
		...

		var model = self.model(iris.path.model.example.js, {title: 'example'});

		// When this UI is destroyed, Iris will call to model.off('complete', onModelComplete)
		// And if model is destroyed, Iris will remove the listener too
		self.listen(model, 'complete', onModelComplete);

	};

	self.awake = function () {
		// This may be useful in some cases
		self.resumeListeners();
	};

	self.sleep = function () {
		// When the UI is asleep, the listeners will not called
		self.pauseListeners();
	};


}, iris.path.ui.example.js);

```


#### iris.Event.resumeListeners()
*Since*: `v0.6.0`

Resume all paused listeners, this will add again the listeners to targets. Use iris.Event.pauseListeners to remove them from targets.

```javascript

iris.model(function (self) {

	// Allowed methods
    self.events('complete');

}, iris.path.model.example.js);


// In another place, in a UI for example
iris.ui(function(self) {

	function onModelComplete () {
		console.log('the model is complete!');
	}

	self.create = function() {
		...

		var model = self.model(iris.path.model.example.js, {title: 'example'});

		// When this UI is destroyed, Iris will call to model.off('complete', onModelComplete)
		// And if model is destroyed, Iris will remove the listener too
		self.listen(model, 'complete', onModelComplete);

	};

	self.awake = function () {
		// This may be useful in some cases
		self.resumeListeners();
	};

	self.sleep = function () {
		// When the UI is asleep, the listeners will not called
		self.pauseListeners();
	};


}, iris.path.ui.example.js);

```


#### iris.Event.removeListeners()
*Since*: `v0.6.0`

This remove all listeners from targets. It is automatically called when the current object is destroyed.

```javascript

iris.model(function (self) {

	// Allowed methods
    self.events('complete', 'change_title');

}, iris.path.model.example.js);


// In another place, in a UI for example
iris.ui(function(self) {

	function onModelComplete () {
		console.log('the model is complete!');
	}

	function onModelChangeTitle () {
		console.log('the title is changed!');
	}

	self.create = function() {
		...

		var model = self.model(iris.path.model.example.js, {title: 'example'});

		self.listen(model, 'complete', onModelComplete);
		self.listen(model, 'change_title', onModelChangeTitle);

		// The listeners onModelComplete and onModelChangeTitle are removed from model
		self.removeListeners();

	};

}, iris.path.ui.example.js);

```


### Iris Events

#### iris.BEFORE_NAVIGATION
*Since*: `v0.5.0`

Fired before do a navigation.

```javascript
iris.on(iris.BEFORE_NAVIGATION, function () {
		iris.log("before navigation : " + document.location.hash)
});
```

#### iris.AFTER_NAVIGATION
*Since*: `v0.5.0`

Fired after do a navigation.

```javascript
iris.on(iris.AFTER_NAVIGATION, function () {
		iris.log("after navigation : " + document.location.hash)
});
```

#### iris.RESOURCE_ERROR
*Since*: `v0.5.0`

Fired when a resource ajax call fails.

```javascript
iris.on(iris.RESOURCE_ERROR, function (request, textStatus, errorThrown) {
		iris.log("resource error", request, textStatus, errorThrown);
});
```

#### iris.SCREEN_NOT_FOUND
*Since*: `v0.5.2`

Fired when a navigation fails.

```javascript
iris.on(iris.SCREEN_NOT_FOUND, function (path) {
	iris.log("Upss, path[" + path + "] not found");

	// Use location.replace instead of iris.navigate or location.hash
	window.location.replace("#/404"); // navigation without history saving
});
```

## Language & Regional
### iris.translate(text[, locale])
*Since*: `v0.5.0`

Translates a text using the locale.

```javascript
// Add the translations
iris.translations("es_ES", {GREETING : "Saludos"})

iris.translate("GREETING", "es_ES");
iris.translate("GREETING"); // Using default locale ( iris.locale() )
```
If no locale is passed, Iris will use the default locale.


### iris.translations(locale, [terms]|[file, [callbacks]])
*Since*: `v0.5.0`

Adds translations in a particular language. This method can be called multiple times with the same language.

*terms*: Object containing the definitions in format *text: definition*. It admits a multi level hierarchy. See example.

*file*: Path to a file with the terms definitions in JSON format.

Object with two attributes (*success* and *error*) containing the functions called after retrieve the terms.

```javascript
iris.translations("en_US", {
		GREETING: "Hi!",
		GREETINGS: {
				MORNING: "Good Morning",
				AFTERNOON: "Good Afternoon",
				NIGHT: "Good Night"
		}
});
```

The translations can be in a JSON file. The call is asynchronous.

```javascript
iris.translations("fr_FR", "./lang_FR.json", {"success" : onFRSuccess, "error" : onFRError });
```

### iris.locale([locale][, regional])
*Since*: `v0.5.0`

Defines or gets the locale format.
You can use the [available locales](../localization).

```javascript
//Example of regional definition. Sets de locale to "en_US" if locale is not set:
iris.locale(
		"en_US", {
				dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
				monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
				dateFormat: "m/d/Y h:i:s",
				currency: {
						formatPos: "s n",
						formatNeg: "(s n)",
						decimal: ".",
						thousand: ",",
						precision: 2,
						symbol: "$"
				},
				number : {
						decimal: ".",
						thousand: ",",
						precision: 2
				}
		}
);
```


```javascript
//To set the locale
iris.locale("en_US");

//To get the current locale
var locale = iris.locale();
```

### iris.regional([label])
*Since*: `v0.5.0`

Gets a regional value according to the setting locale.

If *label* is not passed, returns all the regional definition.

```javascript
iris.regional("dayNames");
```

## Components

### iris.include(paths, callback)
*Since*: `v0.5.1`

Load the components using the `paths` array parameter. When all files are loaded, executes the `callback` function.
You can load and use iris resources before call to the `iris.welcome` function, eg:

```javascript
iris.path = {
	user_resource : "resource/user.js",
	welcome : "screen/welcome.js"
};

iris.include([iris.path.user_resource], function () {
	
	iris.resource(iris.path.user_resource).checkUserInSession().done(loginDone).fail(loginFail);

});

function loginDone () {
	iris.welcome(iris.path.welcome);
}

function loginFail () {
	alert("forbidden");
}

```
Since `v0.5.2`, you can load external JS files (before only relative paths), e.g.:

```js
iris.include(["http://www.example.com/js/file.js", "http://www.example.com/js/file2.js"], function(){
  console.log("file.js & file2.js has been loaded.");
});
```

### iris.welcome(path)
*Since*: `v0.5.0`

The welcome screen is the root of all screens.
You must define always the welcome screen in your initial script.
This function establishes the welcome screen and navigates to it.

```javascript
// All Iris applications start in the welcome screen
// Remember to define iris.path before
iris.welcome(iris.path.welcome.js);
```

### iris.navigate(path)
*Since*: `v0.5.0`

Navigates to a screen changing the hash URL (this function is equivalent to `document.location.hash = path`).

Iris looks for the target screen using the hash URL (`path` parameter) and wakes the target screen and its parents. The previous screens will sleep, if its `canSleep()` functions allows it. The screens are not destroyed, the screens change their status to sleeping. If you want destroy the hidden screens, use [iris.destroyScreen(path)](#irisdestroyscreenpath). Use [self.screens(container_id, screens)](#selfscreenscontainer_id-screens) inside screen to define screen childs. When a parameter value is changed, the screen awake function is called again (the same for its child screens). The welcome screen never can sleep, it is always visible. Show the [lifecycle](lifecycle.md) for more details.

The [iris.BEFORE_NAVIGATION](#irisbefore_navigation) event is triggered on new navigation. When the navigation finished [iris.AFTER_NAVIGATION](#irisafter_navigation) is triggered. If the screen is not found the [iris.SCREEN_NOT_FOUND](#irisscreen_not_found) event is notified.

Since `v0.5.6`, you can use the matrix paramaters (`;name=value;name2=value2...`) to send them data, e.g.: `#;param0=value0/screen1;param1=value1;param2=value2/screen2`
In this example the welcome screen receives `param0`, screen1 receives `param1` & `param2`, the screen2 doesn't receive any parameter. Use [self.param(name)](#selfparamname) inside the screen to retrieve parameter values.

```javascript

// Navigate without params
iris.navigate("#/screen1/child_of_screen1");

// Send parameters to the welcome screen
iris.navigate("#;param=value/screen1/child_of_screen1");

// Send parameters to other screen
iris.navigate("#/screen1;param=value;param2=value2/child_of_screen1");

// More examples

// To get the param value, use self.param('mode') inside welcome screen
iris.navigate('#;mode=offline/dashboard');

// If the param is changed, the welcome screen awake function
// is called (the same for its child screens)
iris.navigate('#;mode=online/dashboard');

// If you want to navigate to another screen, the dashboard screen
// will sleep and otherscreen will wake up
iris.navigate('#;mode=online/otherscreen');


// Another examples
iris.navigate('#/book/17354;show=details');

iris.navigate('#/user/me/friends;filter=all;show=nearest');

```

__Before v0.5.6 (Deprecated, use matrix params instead of)__: To send parameters to screen use this format (query params): `/screen?param1=value1&param2=value2`. You can get the value of this parameters in the `self.awake(params)` function.

### iris.screen(function(self){...}, path)
*Since*: `v0.5.0`

Defines a Screen component.

```javascript
iris.screen(

 function (self) {

	//Called once when the Component is created
	self.create = function () {
	 self.tmpl(iris.path.screen.example.html);
	};

	//Called when the Component is showed.
	self.awake = function () {
	 ...
	};

	//Called when the component is hidden because you navigate to another Screen
	self.sleep = function () {
	 ...
	};

	//Called before hiding component.
	//If the method returns false, the navigation is interrupted and not hidden nor self.seelp method is called
	//This method only is applied to the Screens components
	self.canSleep = function () {
	 ...
	};


	//Called when the component is destroyed
	self.destroy = function () {
	 ...
	};

 }, iris.path.screen.example.js  
);
```

### iris.destroyScreen(path)
*Since*: `v0.5.0`

Destroys a Screen component. Cannot delete the current screen or its parents.

```javascript
iris.destroyScreen('#/user/help');
```

### iris.ui(function(self){...}, path)
*Since*: `v0.5.0`

Defines an UI Component.

```javascript
iris.ui(function(self){...});
```

### iris.tmpl(path, html)
*Since*: `v0.5.0`

Loads the template in memory and associates it to a path.

```javascript
iris.tmpl("screen/welcome.html","<div>...</div>");
```
See `self.tmpl` for more details.

### iris.resource(function(self){...}, path)
*Since*: `v0.5.0`

Defines or creates a Resource Component.

```javascript
//To define
iris.resource(function(self){

		//Some RESTful methods
		self.load = function (id) {
			return self.get("service/book/" + id);
		};

		self.create = function (params) {
			return self.post("service/book", params);
		};

		self.update = function (id, params) {
			return self.put("service/book/" + id, params);
		};

		self.remove = function (id) {
			return self.del("service/book/" + id);
		};

}, iris.path.resource.js);
```

```javascript
//To create
iris.resource(iris.path.resource.js);
```

### iris.debug(enabled)
*Since*: `v0.5.7`

Enables or disables the iris debug mode.
When iris debug mode is enabled, the application is listening for the combination of keys: `Ctrl + Alt + Shift + D` to show or hide the debug information layer. By default it is enabled in local enviroments (`127.0.0.1` and `localhost`).
If the the combination of keys is detected, the application prints/hide a visual lines to highlight the components (screens and UIs) and prints information about its presenter and template paths, hash-URL or data-id.

```javascript
// Force to disable iris debug mode
//('Ctrl + Alt + Shift + D' wont work)
iris.debug(false);
```

## Classes

### iris.Settable Class

#### self.setting(label[, value])
*Since*: `v0.5.0`

Gets o sets a value attribute.

```javascript
//To set
self.setting("attribute_name", {...});
```

```javascript
//To get
var attribute_value = self.setting("attribute_name");
```

#### self.settings(params)
*Since*: `v0.5.0`

Sets multiples and complex attributes values.

```javascript
self.settings({ person: { name:"test name"}, money: -67890.678, region: { country: "country test" }});
var attribute_value = self.setting("person.name");
```

### iris.Component Class

#### self.tmpl(path)
*Since*: `v0.5.0`

Loads the template of the component into the DOM.

This method must be called in the *self.create* method.


Example:

```javascript
// UI
iris.ui(function(self) {
	...

	self.create = function () {
		self.tmplMode(self.APPEND);
		self.tmpl(iris.path.ui.login.html);
	}

	...
});
```

```javascript
// Screen
iris.screen(function(self) {
	...

	self.create = function () {
		self.tmpl(iris.path.ui.login.html);
	}

	...
});
```

**Mode**: When *self.APPEND* or *self.PREPEND* are passed as the third parameter, the template container will not be replaced with the template, otherwise the container will be replaced by the template. The default mode is *self.REPLACE*.

#### self.get([data-id])
*Since*: `v0.5.0`

Gets the JQuery object whose *data-id* matches with the param. If no *data-id* is passed, the JQuery root DOM node will be returned.

```html
<p data-id="paragraph">The name is John</p>
```
```javascript
self.get("paragraph").text("Anna");
```

#### self.inflate(data)
*Since*: `v0.5.0`

Write text, change the visibility, change attributes values, etc... in template elements using `data-jq-*` attributes.

The `data-jq-*` attributes invoke jQuery functions:
```js
data-jq-html == $(element).html()
data-jq-text == $(element).text()
data-jq-val == $(element).val()
data-jq-toggle == $(element).toggle()
data-jq-attr-xxx == $(element).attr(xxx)
data-jq-prop-xxx == $(element).prop(xxx)
```

`self.inflate()` function can do boring tasks for us, e.g.:

- Set element text:

In the presenter:
```javascript
self.inflate( {user : { name: "John Doe" }} );
```

In the template:
```html
<!-- The text "Not set yet" will be replaced by "John Doe" -->
<span data-jq-text="user.name">Not set yet</span>
```


- Change the visibility of an element:

In the presenter:
```javascript
self.inflate( {user : { isAdmin: true }} );
```

In the template:
```html
<!-- Show or hide the admin panel, according to the user -->
<div data-jq-toggle="user.isAdmin">
	...
</div>
```

- Set multiple attributes:

In the presenter:
```javascript
self.inflate( {user : { name: "John Doe", avatarUrl: "/img/john.jpg" }} );
```

In the template:
```html
<!-- Set the src attribute with the user's avatar URL -->
<!-- Set the title attribute with the user's name -->
<img data-jq-attr-src="user.avatarUrl" data-jq-attr-title="user.name" />
```

- Set input value:

In the presenter:
```javascript
self.inflate( {user : { name: "John Doe" }} );
```

In the template:
```html
<!-- Set the value attribute with the user's name -->
<input type="text" data-jq-val="user.name" />
```


#### self.ui(container_id[, path, settings, tmpl_mode])
*Since*: `v0.5.0`

Create a new UI Component and replaces or adds it to the container.

Example:

In the template of the parent:

```html
...
<div data-id="ui_container"></div>
...
```

In the presenter of the parent:

```javascript
...
self.ui("ui_container", iris.path.ui.my_ui.js, {name: "John"}, self.APPEND);
//The name parameter may be recovered in my_ui's presenter with the *self.setting* method.
...
```

For help about the *templateMode* parameter see *self.tmpl* method.

Since `v0.5.2` you can use `self.ui(<data-id>)` to retrieve UIs, e.g.:

- When the UI has template mode == `self.REPLACE` (default)
```js
iris.screen(function (self) {
...
	self.create = function () {
		self.ui("example", iris.path.ui.example);
	}

	function example () {
		self.ui("example").sayHi();
	}
...
}
```

- When the UI has template mode == `self.APPEND`
```js
iris.screen(function (self) {
...
	self.create = function () {
		self.ui("example", iris.path.ui.example);
		self.ui("example", iris.path.ui.example);
		self.ui("example", iris.path.ui.example);
	}

	function example () {
		// Destroy the first UI for example
		self.ui("example")[0].destroyUI();
	}
...
}
```


#### self.destroyUI([ui_component])
*Since*: `v0.5.0`

Destroy the UI component. If `ui_component` is not specified, destroy the current UI (auto-destroy).

```javascript
var my_ui = self.ui("ui_container", iris.path.ui.my_ui.js);
self.destroyUI(my_ui);
```

```javascript
// Auto-destroy
self.destroyUI();
```

#### self.destroyUIs(container_id)
*Since*: `v0.5.0`

Destroy all the UI in a container.

```javascript
var my_ui = self.ui("ui_container", iris.path.ui.my_ui.js);
self.destroyUIs("ui_container");
```


### iris.UI Class
Inherit methods from Component, Settable & Event classes

#### self.tmplMode(mode)
*Since*: `v0.5.0`

Sets the template mode. This method must be called before the *tmpl.method*.

The possible values ​​are:

* `self.APPEND` : Adds the UI to as the last element in the container.
* `self.PREPEND` : Adds the UI to as the first element in the container.
* `self.REPLACE` : Replace the container with the UI template. This is the default behavior.


### iris.Screen Class
Inherit methods from Component, Settable & Event classes

#### self.param(name)
*Since*: `v0.5.2`

Retrieve the parameter value using the parameter name.
Since `v0.5.6` you can define pretty URLs using path & matrix parameters.

E.g. (Since `v0.5.6`): navigate to the welcome screen with matrix params (`#;paramName=paramValue`):

```js
// Welcome screen
iris.screen(function (self) {
	self.awake = function () {
	...
		console.log( self.param("paramName") ); // prints "paramValue"
	...
	}
}, iris.path.screen.welcome.js);
```
E.g. (Since `v0.5.6`): navigate to a example screen with path params (`#/user/1234`):

```js

// Welcome Screen
iris.screen(function (self) {
	self.create = function () {
	...
		self.screens("screens",[
		  [ "user/:user_id", iris.path.screen.user.js]
		]);
	...
	}
}, iris.path.screen.welcome.js);

// User screen (iris.path.screen.user.js)
iris.screen(function (self) {
	self.awake = function () {
	...
		var id = self.param("user_id"); // id == "1234"
	...
	}
}, iris.path.screen.example.js);
```

Old style (__Before v0.5.6__), path & matrix params are not allowed, you can only get query params (`#?paramName=paramValue`):
```js
iris.screen(function (self) {
	self.awake = function () {
	...
		var value = self.param("paramName"); // value == "paramValue"
	...
	}
});
```


Old style (__Before v0.5.2__), the only way to get query parameters is using the awake function parameter, e.g.: (`#?paramName=paramValue`)
```js
iris.screen(function (self) {
	...

	var value;

	self.awake = function (params) {
		if ( params && param.hasOwnProperty("paramName") ) {
			value = param.paramName;
		}
	}

	function example () {
		console.log(value); // value == "paramValue"
	}

	...
});
```

#### self.screens(container_id, screens)
*Since*: `v0.5.0`

Registers Screens and allows to navigate to them.
This method can be called once for each component.

```javascript
self.screens("screens", [
 ["home", iris.path.home.js],
 ["help", iris.path.help.js]
]);

//The first parameter is the data-id attribute of the container
```

Since `v0.5.6`, "pretty URLs" are allowed, you can register screens with path params and the `/` character is also allowed, e.g.:

```javascript
// Welcome screen
iris.screen(function (self) {
	self.create = function () {
	...
		self.screens("screens", [
		 ["user/:user_id/detail", iris.path.screen.user_detail.js],
		 ["user/:user_id/friends/list", iris.path.screen.friends.js],
		 ["user/:user_id/friend/:friend_id/detail", iris.path.screen.friend_detail.js]
		]);
	...
	}
}, iris.path.screen.welcome.js);

// Friend detail screen
iris.screen(function (self) {
	self.awake = function () {
	...
		// If the current hash is: #/user/1234/friend/4321/detail
		var userId = self.param("user_id"); // "1234"
		var friendId = self.param("friend_id"); // "4321"
	...
	}
}, iris.path.screen.friend_detail.js);
```

### iris.Resource Class
Inherit methods from Settable class

#### self.get(path, success, error)
*Since*: `v0.5.0`

Perform an asynchronous HTTP ([Ajax](http://api.jquery.com/jQuery.ajax/)) request of type `GET`.
Returns a jQuery [jqXHR](http://api.jquery.com/Types/#jqXHR) object.

```javascript
 self.get(path).done(function() {
	alert("done");
}).fail(function() {
	alert("fail");
});
```

#### self.post(path, params, success, error)
*Since*: `v0.5.0`

Perform an asynchronous HTTP ([Ajax](http://api.jquery.com/jQuery.ajax/)) request of type `POST`.
Returns a jQuery [jqXHR](http://api.jquery.com/Types/#jqXHR) object.

```javascript
 self.post(path).done(function() {
	alert("done");
}).fail(function() {
	alert("fail");
});
```

#### self.put(path, params, success, error)
*Since*: `v0.5.0`

Perform an asynchronous HTTP ([Ajax](http://api.jquery.com/jQuery.ajax/)) request of type `PUT`.
Returns a jQuery [jqXHR](http://api.jquery.com/Types/#jqXHR) object.

```javascript
 self.put(path).done(function() {
	alert("done");
}).fail(function() {
	alert("fail");
});
```

#### self.del(path, success, error)
*Since*: `v0.5.0`

Perform an asynchronous HTTP ([Ajax](http://api.jquery.com/jQuery.ajax/)) request of type `DEL`.
Returns a jQuery [jqXHR](http://api.jquery.com/Types/#jqXHR) object.

```javascript
 self.del(path).done(function() {
	alert("done");
}).fail(function() {
	alert("fail");
});
```
