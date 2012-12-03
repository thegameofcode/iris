[Iris homepage](https://github.com/iris-js/iris) | [Documentation table of contents](toc.md)

# Getting Started

Conventions used in this guide:
- `self` refers to the instance of the screen or UI component.

## Create a Screen

### Main page
All iris applications only have **one** page *index.html*. Navigation is done without page refresh, using URL-Hash eg: http://example.com/page.html#section/subsection

Your application will consist of a screens set. A screen is a _browsable component_ and acts as a container for User Interface elements.

First step is create your application entry point, namely your welcome screen:

```html
<!DOCTYPE HTML>
<html>
<head>
	<title>iris example</title>
	<script type='text/javascript' src='./jquery.js'></script>
	<script type='text/javascript' src='./dist/iris.js'></script>
	<script type='text/javascript'>
		$(document).ready(
			function () {
				// Define your welcome screen
				iris.welcome("welcome.js");
			}
		);
	</script>
</head>
<body></body>
</html>
```


The screen container for the welcome screen will be the ```document.body```.

`"welcome.js"` is the JS file that is responsible for controlling all the screen functionality.


### The screen controller

*welcome-screen.js*:
```javascript
iris.screen(
	function (self) {
		self.create = function () {
			self.tmpl("welcome.html");
			console.log("Welcome Screen Created");
		}

		self.awake = function () {
			console.log("Screen Awake");
		}
		
		self.sleep = function () {
			console.log("Screen Sleep");
		}
	}
);
```

`self.tmpl()` indicates which is the HTML file that uses the screen as template.

### The screen template:
*welcome.html*:
```html
<div>
	<h1>Welcome Screen</h1>
	<p>This is the initial screen.</p>
</div>
```

### The Screen Life cycle
`self.create()` is the screen constructor, only runs once at the component creation phase.

`self.sleep()` and `self.awake()` are automatically invoked when navigating to a screen and when you leave it.
The welcome-screen is show once and it is not hide ever.


***


## Create a UI Component
They are **reusable** elements that make up the user interface.


### UI Creation

You can create UI components inside screens and other UI components using `self.ui()` function:

```javascript
var settings = {name: "Jonh Doe"};
var example = self.ui("container", "example-ui.js", settings);
```

`"container"` is the JQuery object to be added or replace by the component.

`"example-ui.js"` is the JS file that is responsible for controlling all the component functionality.

`settings` is an object with settings that will receive the component.

### UI Container

All UI components are added or replaced to the container specified in `self.ui()`:

```html
<div>
	<div data-id='container' data-name='Jonh Doe'></div>
</div>
```

These containers are referenced by the `data-id` attribute.

You can access to the data-* attributes values using `self.setting()`

### UI Controller

Basic component UI controller example (_"example-ui.js"_):

```javascript
iris.UI(
	function (self) {
		self.create = function () {
			console.log("UI Create");
			self.tmpl("example-ui.html");
			self.get("button").mousedown(greet);
		}

		function greet () {
			console.log(
				"Hi " + self.setting("name") + "!"
			);
		}
		
		self.awake = function () {
			console.log("UI Awake");
		}
		
		self.sleep = function () {
			console.log("UI Sleep");
		}
	}
);
```
`self.tmpl()` indicates which is the HTML file that uses the component as template.

`self.get()` JQuery elements can be selected through the attribute `data-id`

`self.setting()` you can access the setting parameter that you want.


### UI Template
Basic component UI template example (_"example-ui.html"_):

```html
<div>
	<p>UI Example:</p>
	<button data-id='button'>Greet!</button>
</div>
```

### UI Life cycle
`self.create()` is the screen constructor, only runs once at the component creation phase.

`self.sleep()` and `self.awake()` are automatically invoked when navigating to a screen and when you leave it.

***



## Events

Iris lets you create your own events totally detached from the GUI objects.

### Add an event handler

```javascript
iris.on("example_event", listener);
```
`listener` is the function to be executed when `"example_event"` is triggered.

### Remove an event handler

```javascript
iris.off("example_event", listener);
```

`listener` will no longer be executed when `"example_event"` is triggered.


### Trigger an event

```javascript
var eventParams = {number : 123};

iris.notify(
    "example_event"
  , eventParams
);
```

Triggers an `"example_event"` event and all listeners receive `eventParams` as parameter:

```javascript
function listener (eventParams) {
    console.log("The number is " + eventParams.number)
}
```

***


## Multilanguage

### Load the translation texts

```javascript
iris.lang("es-ES", {"GREETING":"¡Hola!"});

iris.lang("en-US", {"GREETING":"Hi!"});

iris.lang(
      "fr-FR"
    , "http://example.com/lang-fr-fr.json"
);
```

### Translation text

```javascript
// set default locale
iris.locale("es-ES"); 

iris.lang("GREETING"); // return "¡Hola!"


// specified locale
iris.lang("GREETING", "en-US"); // return "Hi!"
```

### Template translations

Is performed automatically using the `@@` notation:

```html
<div>
    <p>@@GRETTING@@</p>
</div>
```

***



## Configuration settings

If you wish to declare global or environment settings use the _`iris.config.*`_ package.

### Load configuration settings

```javascript
iris.config({
    "environment-default" : "pro"
   ,"environment": {
        "localhost" : "dev"
       ,"www.example.com" : "pro"
   }
   ,"global": {
	"global-variable" : "example"
}
   ,"local": {
	   "local-variable" : {
		 	 "dev" : "local-dev"
			,"pro" : "local-pro"
		}
   }
});
```

### Global values
```javascript
// add/override a global value
iris.global({"global-variable" : "value"});

// return "value"
iris.global("global-variable");
```

### Establishing the current environment

The environment depends of the page URL.

For example, if the URL is: `http://localhost:8080/` the environment will be `"dev"`.
* `http://localhost:8080/` -> `"dev"`
* `http://www.example.com/` -> `"pro"`
* `http://www.other.com/` -> `"pro"`

You can also set manually the environment:

```javascript
// return current environment
iris.env();

// set environment
iris.env("pro");
```

### Environment values

```javascript
// add/override a environment variable
iris.local({
    "local-variable" : {
	 "dev" : "example-dev"
	,"pro" : "example-pro"
    }
});
  
// If environment="dev" then return "example-dev"
iris.local("local-variable");
```
