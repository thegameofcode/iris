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
		iris.screen.WelcomeScreen("memory-leak-test/screen/main.js");
	}
);
