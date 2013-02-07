# Iris

Iris is not only another framework.

Iris provides different client-side optimization techniques for front construction. It is independent and compatible with any server-side technology: Node.js, Java, PHP, Python, Google App Engine, .NET...
Iris is not only another framework. It is a methodology that will help you to build structured and organized Web applications:

* Strong object oriented coding and file system organization
* Presenter-View-Resource pattern
* Easy and fast templating engine
* One page navigation using Hash-URL
* 100% Client multilanguage support
* Crossbrowser: Chrome, Firefox & Internet Explorer
* Light and fast: 16 KB
* Open source: New BSD License

_Remmeber that you can [make suggestions][issues] or [report bugs][issues]!_

## Getting Started
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/iris-js/iris/master/dist/iris.min.js
[max]: https://raw.github.com/iris-js/iris/master/dist/iris.js

In your web page:

```html
<script src="jquery.js"></script>
<script src="dist/iris.min.js"></script>
<script>

// register iris components
//   - welcome.js are the initial screen and welcome.html its template
iris.path = {
	welcome : { js : "welcome.js", html : "welcome.html" }
};

$(document).ready(
	function () {

		// initialize application
		iris.welcome( iris.path.welcome.js );
	}
);

</script>
```
## Documentation
 * Take a look at the [documentation table of contents](docs) for all the things.
 * Iris guide: [Spanish](docs/es), English __(Coming soon)__

## Examples
You simply can run the tests doing `grunt test`, then open `http://localhost:8080/examples/index.html` in your browser.

 * [Basic](examples/basic) explains how to do basic operations with iris.
 * [Todo-list](examples/todo-list)  is a port of the famous backbone todos example app.
 * [Shopping-list](examples/shopping-list) a completed sample application to manage the shopping list.



## License
Copyright (c) 2013 Iris

Licensed under the New-BSD license: <https://github.com/iris-js/iris/blob/master/LICENSE-New-BSD>

[issues]: /iris-js/iris/issues
[docs]: /iris-js/iris/blob/master/docs/toc.md
