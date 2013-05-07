# The iris API

Iris exposes all of its methods and properties on the `iris` object:

- [<a name="core"></a> Core](#<a-name=core></a>-core)
	- [iris.baseUri([path])](#irisbaseuripath)
	- [iris.cache([enabled])](#iriscacheenabled)
	- [iris.cacheVersion([value])](#iriscacheversionvalue)
	- [iris.noCache(environment[, ...])](#irisnocacheenvironment-)
	- [iris.enableLog(enabled)](#irisenablelogenabled)
	- [iris.log(value1[, value2, value3, value4])](#irislogvalue1-value2-value3-value4)
- [<a name="util"></a> Util](#<a-name=util></a>-util)
	- [iris.ajax(settings)](#irisajaxsettings)
	- [iris.val(obj, label)](#irisvalobj-label)
	- [iris.date(date, format)](#irisdatedate-format)
	- [iris.number(number, config)](#irisnumbernumber-config)
	- [iris.currency(amount, config)](#iriscurrencyamount-config)
	- [iris.browser()](#irisbrowser)
- [<a name="event"></a> Event](#<a-name=event></a>-event)
	- [iris.notify(eventId[, params])](#irisnotifyeventid-params)
	- [iris.on(eventId, callback)](#irisoneventid-callback)
	- [iris.off(eventId[, callback])](#irisoffeventid-callback)
	- [iris.destroyEvents(eventId, callbacks)](#irisdestroyeventseventid-callbacks)
	- [iris.Event class](#irisevent-class)
		- [self.on(eventId, callback)](#selfoneventid-callback)
		- [self.off(eventId[, callback])](#selfoffeventid-callback)
		- [self.notify(eventId[, params])](#selfnotifyeventid-params)
	- [Iris Events](#iris-events)
		- [iris.BEFORE_NAVIGATION](#irisbefore_navigation)
		- [iris.AFTER_NAVIGATION](#irisafter_navigation)
		- [iris.RESOURCE_ERROR](#irisresource_error)
- [<a name="lang"></a> Language & Regional](#<a-name=lang></a>-language-&-regional)
	- [iris.translate(text[, locale])](#iristranslatetext-locale)
	- [iris.translations(locale, [terms]|[file, [callbacks]])](#iristranslationslocale-terms|file-callbacks)
	- [iris.locale([locale][, regional])](#irislocalelocale-regional)
	- [iris.regional([label])](#irisregionallabel)
- [<a name="components"></a> Components](#<a-name=components></a>-components)
	- [iris.include(paths, callback)](#irisincludepaths-callback)
	- [iris.welcome(path)](#iriswelcomepath)
	- [iris.navigate(path)](#irisnavigatepath)
	- [iris.screen(function(self){...}, path)](#irisscreenfunctionself{}-path)
	- [iris.destroyScreen(path)](#irisdestroyscreenpath)
	- [iris.ui(function(self){...}, path)](#irisuifunctionself{}-path)
	- [iris.tmpl(path, html)](#iristmplpath-html)
	- [iris.resource(function(self){...}, path)](#irisresourcefunctionself{}-path)
	- [<a name="settable"></a> iris.Settable Class](#<a-name=settable></a>-irissettable-class)
		- [self.setting(label[, value])](#selfsettinglabel-value)
		- [self.settings(params)](#selfsettingsparams)
	- [<a name="component"></a> iris.Component Class](#<a-name=component></a>-iriscomponent-class)
		- [self.tmpl(path[, params, tmpl_mode])](#selftmplpath-params-tmpl_mode)
		- [self.get([data-id])](#selfgetdata-id)
		- [self.inflate(data)](#selfinflatedata)
		- [self.ui(container_id, path[, settings, tmpl_mode])](#selfuicontainer_id-path-settings-tmpl_mode)
		- [self.destroyUI([ui_component])](#selfdestroyuiui_component)
		- [self.destroyUIs(container_id)](#selfdestroyuiscontainer_id)
	- [<a name="ui"></a> iris.UI Class](#<a-name=ui></a>-irisui-class)
		- [self.tmplMode(mode)](#selftmplmodemode)
	- [<a name="screen"></a> iris.Screen Class](#<a-name=screen></a>-irisscreen-class)
		- [self.screens(container_id, screens)](#selfscreenscontainer_id-screens)
	- [<a name="resource"></a> iris.Resource Class](#<a-name=resource></a>-irisresource-class)
		- [self.get(path, success, error)](#selfgetpath-success-error)
		- [self.post(path, params, success, error)](#selfpostpath-params-success-error)
		- [self.put(path, params, success, error)](#selfputpath-params-success-error)
		- [self.del(path, success, error)](#selfdelpath-success-error)


##<a name="core"></a> Core

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

### iris.noCache(environment[, ...])
*Since*: `v0.5.0`

Set cache to false when the environment match with the current URL.

```javascript
// By default iris executes:
iris.noCache("localhost", "127.0.0.1");
```

### iris.enableLog(enabled)
*Since*: `v0.5.0`

Enable or disable the *iris.log* outputs.

```javascript
iris.enableLog(false);
iris.log("test"); // "test" is not printed
```

### iris.log(args, ...)
*Since*: `v0.5.2`

Safe logger that prints the parameters values to the console for debugging purposes,
only if logging is enabled and the browser support it.

```javascript
iris.log("obj = ", obj);
```

##<a name="util"></a> Util
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
See [Language & Regional](#lang) for more information.
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

##<a name="event"></a> Event

### iris.notify(eventId[, params])
*Since*: `v0.5.0`

Triggers an event.
See `iris.on` and `iris.off` for more details.

```javascript
iris.notify("my-event", {param : value});

iris.notify("my-event");
```

### iris.on(eventId, callback)
*Since*: `v0.5.0`

Adds an event listener.
See `iris.notify` and `iris.off` for more details.

```javascript
iris.on("my-event", callback);
```

### iris.off(eventId[, callback])
*Since*: `v0.5.0`

Removes an event listener.
See `iris.notify` and `iris.on` for more details.
If callback is not specified, all callback are removed.

```javascript
iris.off("my-event", callback);

iris.off("my-event"); // remove all callbacks
```

### iris.destroyEvents(eventId, callbacks)
*Since*: `v0.5.0`

Removes a collection of event listeners.

```javascript
iris.destroyEvents("my-event", [callback1, callback2]);
```

### iris.Event class

#### self.on(eventId, callback)
*Since*: `v0.5.0`

Adds an event listener associated with a component. When the component is destroyed, the listener will be deleted.

For more details, see `iris.on`.

```javascript
self.on("my-event", callback);
```

#### self.off(eventId[, callback])
*Since*: `v0.5.0`

Removes an event listener.
See `iris.off` for more details.

#### self.notify(eventId[, params])
*Since*: `v0.5.0`

Removes an event listener.
See `iris.notify` for more details.

### Iris Events

#### iris.BEFORE_NAVIGATION
*Since*: `v0.5.0`

EventId fired before do a navigation.

```javascript
iris.on(iris.BEFORE_NAVIGATION, function () {
    iris.log("before navigation : " + document.location.hash)
});
```

#### iris.AFTER_NAVIGATION
*Since*: `v0.5.0`

EventId fired after do a navigation.

```javascript
iris.on(iris.AFTER_NAVIGATION, function () {
    iris.log("after navigation : " + document.location.hash)
});
```

#### iris.RESOURCE_ERROR
*Since*: `v0.5.0`

EventId fired when a resource ajax call fails.

```javascript
iris.on(iris.RESOURCE_ERROR, function (request, textStatus, errorThrown) {
    iris.log("resource error", request, textStatus, errorThrown);
});
```

##<a name="lang"></a> Language & Regional
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

##<a name="components"></a> Components

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

### iris.welcome(path)
*Since*: `v0.5.0`

Establishes and navigates to the Welcome screen component.

```javascript
iris.welcome("screen/welcome.js");
```

Or

```javascript
iris.welcome(iris.path.welcome.js);
```

### iris.navigate(path)
*Since*: `v0.5.0`

Navigates to a Screen Component.

```javascript
iris.navigate("screen/help");
```

```javascript
iris.navigate(iris.path.help.js);
```

### iris.screen(function(self){...}, path)
*Since*: `v0.5.0`

Defines a Screen component.

```javascript
iris.screen(

 function (self) {

  //Called once when the Component is created
  self.create = function () {
   self.tmpl(iris.path.help.html);
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

 }, iris.path.help.js  
);
```

### iris.destroyScreen(path)
*Since*: `v0.5.0`

Destroys a Screen component.

```javascript
iris.destroyScreen(iris.path.help.js);
```

### iris.ui(function(self){...}, path)
*Since*: `v0.5.0`

Defines an UI Component.

```javascript
iris.ui(function(self){...});
```

See `iris.screen` for more details.

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

###<a name="settable"></a> iris.Settable Class
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

###<a name="component"></a> iris.Component Class

#### self.tmpl(path[, params, tmpl_mode])
*Since*: `v0.5.0`

Loads the template of the component into the DOM.

This method must be called in the *self.create* method of the Component.


Example:

```javascript
self.tmpl(iris.path.ui.login.html, {"name":"John"}, self.APPEND);
```

The parameters will be replaced in the template where ##parameter_name## is found.

```htmpl
<p>The name is ##name##</p>
```
*mode*: When *self.APPEND* or *self.PREPEND* are passed as the third parameter, the template container will not be replaced with the template, otherwise the container will be replaced by the template. The default mode is *self.REPLACE*.

#### self.get([data-id])
*Since*: `v0.5.0`

Gets the JQuery object whose *data-id* matches with the param. If no *data-id* is passed, the JQuery root DOM node will be returned.

```htmpl
<p data-id="paragraph">The name is John</p>
```
```javascript
self.get("paragraph").text("Anna");
```

#### self.inflate(data)
*Since*: `v0.5.0`

Replaces in the template the object passed as parameter.
The text of the DOM elements that have an *data-model* attribute that match some attribute of the object passed, will be replaced.

```javascript
self.inflate({date: new Date()});
```

```htmpl
<span data-model="date">Not set yet</span>
```

#### self.ui(container_id, path[, settings, tmpl_mode])
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


###<a name="ui"></a> iris.UI Class
Inherit methods from Component, Settable & Event classes

#### self.tmplMode(mode)
*Since*: `v0.5.0`

Sets the template mode. This method must be called before the *tmpl.method*.

The possible values ​​are:

* `self.APPEND` : Adds the UI to as the last element in the container.
* `self.PREPEND` : Adds the UI to as the first element in the container.
* `self.REPLACE` : Replace the container with the UI template. This is the default behavior.


###<a name="screen"></a> iris.Screen Class
Inherit methods from Component, Settable & Event classes
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

###<a name="resource"></a> iris.Resource Class
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
