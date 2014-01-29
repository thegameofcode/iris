$(window.document).ready(function () {

	iris.baseUri('iris/');
    
    // show the initial screen
    iris.welcome(iris.path.screen.welcome.js);

	iris.on(iris.AFTER_NAVIGATION, function() {
		iris.off(iris.AFTER_NAVIGATION);
    	
    	iris.resource(iris.path.resource.localstorage.js).init();
	});

});
