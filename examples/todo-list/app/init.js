// define iris components paths
iris.path = {
	welcome : { js: "welcome.js", html: "welcome.html" },
    todo: { js: "todo.js", html : "todo.html" },
    resource : "resource.js"
};


$(window.document).ready(

    function () {
		// set the iris components base uri
		iris.baseUri("app/");

		// show the initial screen
        iris.welcome(iris.path.welcome.js);
        iris.on(iris.AFTER_NAVIGATION, function () {
			iris.resource(iris.path.resource).init();
		});
    }
);
