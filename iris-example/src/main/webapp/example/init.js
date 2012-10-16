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
		iris.lang.LoadFrom("es-ES", "lang/es-es.js");
		
		
//		iris.Regional("es-ES", {
//			 dayNames : ["D","L","M","M","J","V","S"]
//			,monthNames : ["E","F","M","A","M","J","J","A","S","O","N","D"]
//			,dateFormat : "d/m/Y"
//			,currency : {
//				 formatPos : "n"
//				,formatNeg : "-n"
//				,decimal : ","
//				,thousand : "."
//				,precision : 2
//			}
//		});
		
		iris.net.CacheVersion("v123");
		
		iris.screen.WelcomeScreen("example/screen/main.js");
	}
);
