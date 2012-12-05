iris.config.Load({
	 "environment-default" : "dev"
	,"environments-nocache" : "dev"
    ,"environment": {
         "localhost" : "dev"
    }
    ,"log": {
         "dev": "debug,warning,error"
    }
});

$(document).ready(
	function () {
	    iris.event.Subscribe(iris.event.BEFORE_NAVIGATION, _OnBeforeNav);
	    
		iris.lang.LoadFrom("es-es", "lang/es-es.js")
		
		iris.screen.WelcomeScreen("library/screen/main.js");
	}
);

function _OnBeforeNav () {
    console.log("[iris.event.BEFORE_NAVIGATION]", document.location.hash)
}