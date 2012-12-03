[Iris homepage](https://github.com/iris-js/iris) | [Documentation table of contents](toc.md)

# Cookbook

You can download all source code from the **iris-example** folder at repository:
[https://github.com/iris-js/iris/tree/master/iris-example](https://github.com/iris-js/iris/tree/master/iris-example)

## Create a new screen and navigate to

1 - Create the new screen files
```javascript
iris.Screen(
	function (self) {
		
		self.Create = function () {
			self.Template("other-screen.html");
		}
		
		self.Awake = function () {
			iris.D("Other screen is awakened");
		}
		
		self.Sleep = function () {
			iris.D("Other screen is sleeping");
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

3 - Register the new screen in its parent class (**self.AddScreen()**), eg *welcome-screen.js*, and navigate to it (**iris.Goto()**):
```javascript
iris.Screen(
	function (self) {
		self.Create = function () {
			self.Template("welcome-screen.html");
			console.log("Welcome Screen Created");

			self.AddScreen("screen_container", "#other-screen", "other-screen.js");
			iris.Goto("#other-screen");
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
iris.Screen(function(self) {
	self.Create = function() {
		self.Template("example/screen/example_instance.html");
		self.$Get("btn_create").click(_Create);
	}

	function _Create() {
		self.InstanceUI("container", "example/ui/example_basic.js");
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
iris.UI(function(self) {
	self.Create = function() {
		self.Template("example/ui/example_basic.html");
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
iris.Screen(function(self) {
	var _Count = 0;
	
	self.Create = function() {
		self.Template("example/screen/example_list.html");
		self.$Get("btn_create").click(_Create);
	}

	function _Create() {
		self.InstanceUI("container", "example/ui/example.js", {
			"count" : _Count++
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
iris.UI(function(self) {

	self.Create = function() {
		self.TemplateMode(self.TEMPLATE_APPEND);
		self.Template("example/ui/example.html");
		self.$Get("label").text("Example " + self.Setting("count"));

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
iris.Screen(function(self) {
	var _Cont = 0
	,	_UIs = []
	,	_$InputIdx
	;
	
	self.Create = function() {
		self.Template("example/screen/example_destroy.html");

		self.$Get("btn_create").click(_Create);
		self.$Get("btn_destroy").click(_DestroyUI);

		_$InputIdx = self.$Get("idx");
		
	}

	function _Create() {
		_UIs.push(
			self.InstanceUI("container", "example/ui/example.js", {
				"count" : _Cont++
			})
		);
	}

	function _DestroyUI() {
		var idx = _$InputIdx.val();
		self.DestroyUI(_UIs[idx]);
		_UIs.splice(idx, 1);
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
iris.UI(function(self) {

	self.Create = function() {
		self.TemplateMode(self.TEMPLATE_APPEND);
		self.Template("example/ui/example.html");

		self.$Get("label").text("Example " + self.Setting("count"));

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
	<div data-id='uis'></div>
</div>
```
**/example/screen/example_destroy_all.js**
```javascript
iris.Screen(function(self) {
	self.Create = function() {
		self.Template("example/screen/example_destroy_all.html");

		self.$Get("btn_create").click(_Create);
		self.$Get("btn_destroy_all").click(_DestroyAllUIs);
	}

	function _Create() {
		self.InstanceUI("uis", "example/ui/example.js", {
			"count" : self.__UIComponents__.length
		});
	}

	function _DestroyAllUIs() {
		self.DestroyAllUIs("uis");
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
iris.UI(function(self) {

	self.Create = function() {
		self.TemplateMode(self.TEMPLATE_APPEND);
		self.Template("example/ui/example.html");

		self.$Get("label").text("Example " + self.Setting("count"));

	};

});
```
