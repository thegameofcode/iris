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
		iris.lang.LoadFrom("es-es", "/lang/es-es.js")
		iris.lang.LoadFrom("en-us", "/lang/en-us.js")
		
		console.log("es->", iris.lang.Get("BOOK.ADMIN.STORE", "es-es"));
		console.log("en->", iris.lang.Get("BOOK.ADMIN.STORE", "en-us"));
		
		iris.screen.WelcomeScreen("library/screen/main.js");
	}
);
