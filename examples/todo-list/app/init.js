// define iris components paths
iris.path = {
	welcome : { js: "welcome.js", html: "welcome.html" },
    todo: { js: "todo.js", html : "todo.html" },
    todoResource : "todoResource.js",
    loggerFilter: "loggerFilter.js",
    localStorageFilter: "localStorageFilter.js",
    checkTodoFilter: "checkTodoFilter.js",
	toUpperCaseFilter: "toUpperCaseFilter.js"
};


$(window.document).ready(

    function () {
		// set the iris components base uri
		iris.baseUri("app/");
		
        iris.on(iris.AFTER_NAVIGATION, function() {
        	iris.off(iris.AFTER_NAVIGATION);
			iris.resource(iris.path.loggerFilter).init();
			iris.resource(iris.path.localStorageFilter).init();
			iris.resource(iris.path.checkTodoFilter).init();
			iris.resource(iris.path.toUpperCaseFilter).init();
        });

		// show the initial screen
        iris.welcome(iris.path.welcome.js);

    }
);
