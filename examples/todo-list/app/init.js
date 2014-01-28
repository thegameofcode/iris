// define iris components paths
iris.path = {
	welcome : { js: "welcome.js", html: "welcome.html" },
    todo: { js: "todo.js", html : "todo.html" },
    todoResource : "todoResource.js",
    decoratorService : "decoratorService.js",
    loggerDecorator: "loggerDecorator.js",
    localStorageDecorator: "localStorageDecorator.js"
};


$(window.document).ready(

    function () {
		// set the iris components base uri
		iris.baseUri("app/");


        iris.on(iris.AFTER_NAVIGATION, function() {
        	iris.off(iris.AFTER_NAVIGATION);

        	iris.resource(iris.path.loggerDecorator).init();
        	iris.resource(iris.path.localStorageDecorator).init();
        });

		// show the initial screen
        iris.welcome(iris.path.welcome.js);

    }
);
