iris.config.Load({
	 "environment-default" : "pro"
	,"environments-nocache" : "dev"
    ,"environment": {
         "localhost" : "dev"
        ,"www.example.com" : "pro"
    }
    ,"log": {
         "dev": "debug,warning,error"
        ,"pro" : "debug,error"
    }
    ,"global": {
    	"global-variable" : "example"
    }
    ,"local": {
    	"local-variable" : {
    		 "dev" : "example-dev"
    		,"pro" : "example-pro"
    	}
    }
});

iris.D("Test0 Global var -> ", iris.global.Data("global-variable"));

iris.config.Load({"global": {
	"global-variable" : "example changed"
}});

iris.D("Test1 Global var -> ", iris.global.Data("global-variable"));

iris.lang.LoadFrom("es-es", "./lang/es-es.js");
iris.D( "The locale is ", iris.lang.Locale() );

iris.D("Test0 New lang -> " + iris.lang.Get("NEW_LANG_TAG") );
iris.lang.Load("es-es", {"NEW_LANG_TAG" : "new lang tag"});
iris.D("Test1 New lang -> " + iris.lang.Get("NEW_LANG_TAG") );


var example = {
	 screen : {}
	,ui : {}
};

$(document).ready(
	function () {
		
		iris.D("test debug");
		iris.W("test warning");
		iris.E("test error");
		
		var $body = $(document.body);
		iris.screen.Add($body, "#library", "example/screen/library.js");
		
		iris.GotoUrlHash("#library");
	}
);



