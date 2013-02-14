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
Set the base URL applied to load iris components like screens, UIs & resources.

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
Set or get a value that indicates whether iris' calls are cached or not.
In local environments (localhost, 127.0.0.1) the cache are disabled by default.

```javascript
// Getter
iris.cache();

// Setter
iris.cache(true);
```

### iris.cacheVersion
Set or get a value that will be added as a parameter in all iris' ajax calls.
You can use it to force iris components to be cached with a version string.

```javascript
iris.cacheVersion("v1.0");
```

### iris.noCache(environment[, ...])
Set cache to false when the environment match with the current URL.

```javascript
// By default iris executes:
iris.noCache("localhost", "127.0.0.1");
```

### iris.enableLog(enabled)
Enable or disable the iris.log outputs.

```javascript
iris.enableLog(false);
iris.log("test"); // "test" is not printed
```

### iris.log(value1[, value2, value3, value4])
Console prints the values for debugging purposes. Only if iris logging is enabled, see `iris.enableLog` for more details.

```javascript
iris.log("obj = ", obj);
```


##<a name="util"></a> Util
### iris.ajax(settings)
Do an Ajax request.
Accepts the same parameters as jQuery.ajax()
See <a href="http://api.jquery.com/jQuery.ajax/">JQuery Ajax</a> for more details.

```javascript
iris.ajax({
  "url" : "http://www.example.com/",
  "type" : "GET"
}).done(successCallback).fail(errorCallback);
```

### iris.val(obj, label)
Get value from javascript object using a label string.
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
Formats a Date object or timestamp to the specified format and according to the current locale.
See [Language & Regional](#lang) for more information.
You can use the following special characters:

__a__ 'a.m.' or 'p.m.'
__A__ 'AM' or 'PM'
__b__ Month, textual, 3 letters, lowercase. 'jan'
__d__ Day of the month, 2 digits with leading zeros. '01' to '31'
__D__ Day of the week, textual, 3 letters. 'Fri'
__F__ Month, textual, long. 'January'
__h__ Hour, 12-hour format. '01' to '12'
__H__ Hour, 24-hour format. '00' to '23'
__i__ Minutes. '00' to '59'
__l__ Day of the week, textual, long. 'Friday'
__m__ Month, 2 digits with leading zeros. '01' to '12'
__M__ Month, textual, 3 letters. 'Jan'
__n__ Month without leading zeros. '1' to '12'
__s__ Seconds, 2 digits with leading zeros. '00' to '59'
__U__ Seconds since the Unix Epoch (January 1 1970 00:00:00 UTC)
__y__ Year, 2 digits. '99'
__Y__ Year, 4 digits. '1999'

```javascript
iris.date(new Date(),"ymd");

iris.date(1331954654564,"d/m/y h:i:s"); // "17/03/12 04:24:14"

iris.date("Thu Feb 14 2013 12:42:49 GMT+0100 (CET)", "d-m-Y"); // "14-02-2013"
```

### iris.number(number, config)
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
Trigger an event.
See `iris.on` and `iris.off` for more details.

```javascript
iris.notify("my-event", {param : value});

iris.notify("my-event");
```



### iris.on(eventId, callback)
Add an event listener.
See `iris.notify` and `iris.off` for more details.

```javascript
iris.on("my-event", callback);
```

### iris.off(eventId[, callback])
Remove an event listener.
See `iris.notify` and `iris.on` for more details.
If callback is not specified, all callback are removed.

```javascript
iris.off("my-event", callback);

iris.off("my-event"); // remove all callbacks
```

### iris.destroyEvents(eventId, callbacks)
Remove a collection of event listeners.

```javascript
iris.destroyEvents("my-event", [callback1, callback2]);
```

### iris.Event class
#### self.on
#### self.off
#### self.notify

### Iris Events
#### iris.BEFORE_NAVIGATION
Event fired before do a navigation.

```javascript
iris.on(iris.BEFORE_NAVIGATION, function () {
    iris.log("before navigation : " + document.location.hash)
});
```

#### iris.AFTER_NAVIGATION
Event fired after do a navigation.

```javascript
iris.on(iris.AFTER_NAVIGATION, function () {
    iris.log("after navigation : " + document.location.hash)
});
```

#### iris.RESOURCE_ERROR
Event fired when a resource ajax call fails.

```javascript
iris.on(iris.RESOURCE_ERROR, function (request, textStatus, errorThrown) {
    iris.log("resource error", request, textStatus, errorThrown);
});
```

##<a name="lang"></a> Language & Regional
### iris.translate
### iris.translations
### iris.locale
### iris.regional


##<a name="components"></a> Components
### iris.welcome
### iris.navigate
### iris.screen
### iris.destroyScreen
### iris.ui
### iris.tmpl
### iris.resource

###<a name="settable"></a> iris.Settable Class
#### self.setting
#### self.settings

###<a name="component"></a> iris.Component Class
#### self.tmpl
#### self.get
#### self.inflate
#### self.ui
#### self.destroyUI
#### self.destroyUIs

###<a name="ui"></a> iris.UI Class
Inherit methods from Component, Settable & Event classes
#### self.tmplMode

###<a name="screen"></a> iris.Screen Class
Inherit methods from Component, Settable & Event classes
#### self.screens

###<a name="resource"></a> iris.Resource Class
Inherit methods from Settable class
#### self.get
#### self.post
#### self.put
#### self.del
