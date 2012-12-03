[Iris homepage](https://github.com/iris-js/iris) | [Documentation table of contents](toc.md)

# Cookbook

You can download all source code from the **iris-example** folder at repository:
[https://github.com/iris-js/iris/tree/master/iris-example](https://github.com/iris-js/iris/tree/master/iris-example)

## Create a new screen and navigate to

1 - Create the new screen files
```javascript
iris.screen(
	function (self) {
		
		self.create = function () {
			self.tmpl("other-screen.html");
		}
		
		self.awake = function () {
			iris.d("Other-Screen awake");
		}
		
		self.sleep = function () {
			iris.d("Other-Screen sleep");
		}
		
	}
);

```

```html
<div>
	<h2>This is other screen</h2>
</div>
```

2 - Create the screen container in the parent, eg *welcome-screen.html*:
```html
<div>
	<h1>Welcome Screen</h1>
	<p>This is the initial screen.</p>
	<div data-id='screen_container'>This is the screen container</div>
</div>
```

3 - Register the new screen in its parent class (**self.screen()**), eg *welcome-screen.js*, and navigate to it (**iris.goto()**):
```javascript
iris.screen(
	function (self) {
		self.create = function () {
			self.tmpl("welcome-screen.html");
			console.log("Welcome Screen Created");

			self.screen("screen_container", "#other-screen", "other-screen.js");
			iris.goto("#other-screen");
		}
	}
);
```


## Create a new Instance UI and place it into a parent component
**/example/screen/example_instance.html**
```html
<div>
	<h1>Create a new Instance UI and place it into a parent component</h1>
	<button data-id="btn_create">Create a new UI</button>
	<div data-id='container'>Container content</div>
</div>
```

**/example/screen/example_instance.js**
```javascript
iris.screen(function(self) {
	self.create = function() {
		self.tmpl("example/screen/example_instance.html");
		self.get("btn_create").click(createUi);
	}

	function createUi() {
		self.ui("container", "example/ui/example_basic.js");
	}
});
```

**/example/ui/example_basic.html**
```html
<div style='border: 1px solid #000;'>
	<h1>This is a basic UI</h1>
</div>
```

**/example/ui/example_basic.js**
```javascript
iris.ui(function(self) {
	self.create = function() {
		self.tmpl("example/ui/example_basic.html");
	};
});
```



## Create a group of Instance UIs and add all them to a parent component
**/example/screen/example_list.html**
```html
<div>
	<h1>Create a group of Instance UIs and add all them to a parent component</h1>

	<button data-id="btn_create">Create a new UI</button>

	<div data-id='container'>Container content</div>
</div>
```

**/example/screen/example_list.js**
```javascript
iris.screen(function(self) {
	var count = 0;
	
	self.create = function() {
		self.tmpl("example/screen/example_list.html");
		self.get("btn_create").click(createUi);
	}

	function createUi() {
		self.ui("container", "example/ui/example.js", {
			"count" : count++
		});
	}
});
```

**/example/ui/example.html**
```html
<div style='border: 1px solid #000;'>
	<p data-id='label'></p>
</div>
```

**/example/ui/example.js**
```javascript
iris.ui(function(self) {

	self.create = function() {
		self.tmplMode(self.APPEND);
		self.tmpl("example/ui/example.html");
		self.get("label").text("Example " + self.setting("count"));

	};

});
```



## Destroy a UI child from a parent container
**/example/screen/example_destroy.html**
```html
<div>
	<h1>Destroy a UI child from a parent container</h1>

	<button data-id="btn_create">Create a new UI</button>
	
	<br>
	
	UI Index:
	<input data-id='idx' type='number' value='0' />
	<button data-id='btn_destroy'>Destroy</button>

	<br>Container:
	<div data-id='container'></div>
</div>
```
**/example/screen/example_destroy.js**
```javascript
iris.screen(function(self) {
	var count = 0
	,	uiInstances = []
	,	inputIndex
	;
	
	self.create = function() {
		self.tmpl("example/screen/example_destroy.html");

		self.get("btn_create").click(createUi);
		self.get("btn_destroy").click(destroyUi);

		inputIndex = self.get("idx");
		
	}

	function createUi() {
		uiInstances.push(
			self.ui("container", "example/ui/example.js", {
				"count" : count++
			})
		);
	}

	function destroyUi() {
		var idx = inputIndex.val();
		self.destroyUI(uiInstances[idx]);
		uiInstances.splice(idx, 1);
	}
});
```

**/example/ui/example.html**
```html
<div style='border: 1px solid #000;'>
	<p data-id='label'>Example</p>
</div>
```

**/example/ui/example.js**
```javascript
iris.ui(function(self) {

	self.create = function() {
		self.tmplMode(self.APPEND);
		self.tmpl("example/ui/example.html");

		self.get("label").text("Example " + self.setting("count"));

	};

});
```



## Destroy all UI childs from a parent container
**/example/screen/example_destroy_all.html**
```html
<div>
	<h1>Destroy all UI childs from a parent container</h1>

	<button data-id='btn_destroy_all'>Destroy All UIs</button>
	<button data-id="btn_create">Create a new UI</button>

	<br>Container:
	<div data-id='ui_container'></div>
</div>
```
**/example/screen/example_destroy_all.js**
```javascript
iris.screen(function(self) {
	self.create = function() {
		self.tmpl("example/screen/example_destroy_all.html");

		self.get("btn_create").click(createUi);
		self.get("btn_destroy_all").on("click", destroyAll);
	}

	function createUi() {
		self.ui("ui_container", "example/ui/example.js", {
			"count" : self.uis.length
		});
	}

	function destroyAll() {
		self.destroyUIs("ui_container");
	}
});
```

**/example/ui/example.html**
```html
<div style='border: 1px solid #000;'>
	<p data-id='label'></p>
</div>
```

**/example/ui/example.js**
```javascript
iris.ui(function(self) {

	self.create = function() {
		self.tmplMode(self.APPEND);
		self.tmpl("example/ui/example.html");

		self.get("label").text("Example " + self.setting("count"));

	};

});
```
