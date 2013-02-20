[Iris homepage](https://github.com/iris-js/iris) | [Documentation table of contents](toc.md)

# The iris API

Iris exposes all of its methods and properties on the `iris` object:

* <a href="#core"> Core
* <a href="#util"> Util
* <a href="#event"> Event
* <a href="#lang"> Language & Regional
* <a href="#components"> Components
  * <a href="#settable"> Settable Class
  * <a href="#component"> Component Class
  * <a href="#ui"> UI Class
  * <a href="#screen"> Screen Class
  * <a href="#resource"> Resource Class


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

### iris.cacheVersion
*Since*: `v0.5.0`

Set or get a value that will be added as a parameter in all Iris' ajax calls.
You can use it to force Iris components to be cached with a version string.

```javascript
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

### iris.log(value1[, value2, value3, value4])
*Since*: `v0.5.0`

Prints the parameters values to the console for debugging purposes.

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

iris.number(5600.899, { precision: 0 }); // "5,601"

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
            precision: 2
        }
    }
);

iris.currency(5600.899); // "5.600,90 €"

iris.currency(-5600.899); // "- 5.600,90 €"

iris.currency(5600.899, { symbol : "" }); // "5.600,90"

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

#### self.on
*Since*: `v0.5.0`

Adds an event listener associated with a component. When the component is destroyed, the listener will be deleted.

For more details, see `iris.on`.

```javascript
self.on("my-event", callback);
```

#### self.off
*Since*: `v0.5.0`

Removes an event listener.
See `iris.off` for more details.

#### self.notify
*Since*: `v0.5.0`

Removes an event listener.
See `iris.notify` for more details.

### Iris Events

#### iris.BEFORE_NAVIGATION
*Since*: `v0.5.0`

Event fired before do a navigation.

```javascript
iris.on(iris.BEFORE_NAVIGATION, function () {
    iris.log("before navigation : " + document.location.hash)
});
```

#### iris.AFTER_NAVIGATION
*Since*: `v0.5.0`

Event fired after do a navigation.

```javascript
iris.on(iris.AFTER_NAVIGATION, function () {
    iris.log("after navigation : " + document.location.hash)
});
```

#### iris.RESOURCE_ERROR
*Since*: `v0.5.0`

Event fired when a resource ajax call fails.

```javascript
iris.on(iris.RESOURCE_ERROR, function (request, textStatus, errorThrown) {
    iris.log("resource error", request, textStatus, errorThrown);
});
```

##<a name="lang"></a> Language & Regional
### iris.translate
*Since*: `v0.5.0`

Translates a text using the locale.

```javascript
iris.translate(text, [locale]);
```
If no locale is passed, Iris will use the default locale.


### iris.translations
*Since*: `v0.5.0`

Adds translations in a particular language. This method can be called multiple times with the same language.

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

The translations can be in a JSON file.

```javascript
iris.translations("fr_FR", "./lang_FR.json", {"success" : onFRSuccess, "error" : onFRError });
```

### iris.locale
*Since*: `v0.5.0`

Defines or sets the locale format.
You can use the [available locales](../localization).

```javascript
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
            precision: 2
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

### iris.regional
*Since*: `v0.5.0`

Gets a regional value.

```javascript
iris.locale("dayNames");
```

##<a name="components"></a> Components
### iris.welcome
*Since*: `v0.5.0`

Establishes and navigates to the Welcome screen component.

```javascript
iris.welcome("screen/welcome.js");
```

Or

```javascript
iris.welcome(iris.path.welcome.js);
```

### iris.navigate
*Since*: `v0.5.0`

Navigates to a Screen Component.

```javascript
iris.navigate("screen/help");
```

```javascript
iris.navigate(iris.path.help.js);
```

### iris.screen
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

### iris.destroyScreen
*Since*: `v0.5.0`

Destroys a Screen component.

```javascript
iris.destroyScreen(iris.path.help.js);
```

### iris.ui
*Since*: `v0.5.0`

Defines an UI Component.

```javascript
iris.ui(function(self){...});
```

See `iris.screen` for more details.

### iris.tmpl
*Since*: `v0.5.0`

Loads the template in memory and associates it to a path.

```javascript
iris.tmpl("screen/welcome.html","<div>...</div>");
```
See `self.tmpl` for more details.

### iris.resource
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
#### self.setting
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

#### self.settings
*Since*: `v0.5.0`

Sets multiples and complex attributes values.

```javascript
self.settings({ person: { name:"test name"}, money: -67890.678, region: { country: "country test" }});
var attribute_value = self.setting("person.name");
```

###<a name="component"></a> iris.Component Class

#### self.tmpl
*Since*: `v0.5.0`

Loads the template of the component into the DOM.

This method must be called in the *self.create* method of the Component.

```javascript
self.tmpl(url, [params], [mode]);
```

Example:

```javascript
self.tmpl(iris.path.ui.login.html, {"name":"John"}, self.APPEND);
```

The parameters will be replaced in the template where ##parameter_name## is found.

```htmpl
<p>The name is ##name##</p>
```
When *self.APPEND* is passed as the third parameter, the template container will not be replaced with the template, otherwise the container will be replaced by the template	

#### self.get
*Since*: `v0.5.0`

Gets the JQuery object whose ID matches with the param.

```htmpl
<p data-id="paragraph">The name is John</p>
```
```javascript
self.get("paragraph").text("Anna");
```

#### self.inflate
*Since*: `v0.5.0`

Replaces in the template the object passed as parameter.
The text of the DOM elements that have an *data-model* attribute that match some attribute of the object passed, will be replaced.

```javascript
self.inflate({date: new Date()});
```

```htmpl
<span data-model="date">Not set yet</span>
```

#### self.ui
*Since*: `v0.5.0`

Create a new UI Component and replaces or adds it to the container.

```js
self(container, path, [settings], [templateMode]);
```

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

#### self.destroyUI
*Since*: `v0.5.0`

Destroy the UI component.

```javascript
var my_ui = self.ui("ui_container", iris.path.ui.my_ui.js);
self.destroyUI(my_ui);
```

#### self.destroyUIs
*Since*: `v0.5.0`

Destroy all the UI in a container.

```javascript
var my_ui = self.ui("ui_container", iris.path.ui.my_ui.js);
self.destroyUIs("ui_container");
```


###<a name="ui"></a> iris.UI Class
Inherit methods from Component, Settable & Event classes

#### self.tmplMode
*Since*: `v0.5.0`

Sets the template mode. This method must be called before the *tmpl.method*.

The possible values ​​are:

* `self.APPEND` : Adds the UI to as the last element in the container.
* `self.PREPEND` : Adds the UI to as the first element in the container.
* `self.REPLACE` : Replace the container with the UI template. This is the default behavior.


###<a name="screen"></a> iris.Screen Class
Inherit methods from Component, Settable & Event classes
#### self.screens
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

#### self.get
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

#### self.post
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

#### self.put
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

#### self.del
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
