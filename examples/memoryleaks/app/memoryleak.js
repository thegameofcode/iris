$(document).ready(
	function () {

        iris.baseUri(iris.baseUri() + "examples/memoryleaks/app/");

        iris.path = {
        	welcome : "screen/welcome.js",
        	ui : "ui/example.js"
        };

		iris.welcome(iris.path.welcome);
	}
);
