$(document).ready(
	function () {

        iris.baseUri(iris.baseUri() + "examples/memoryleaks/app/");

        iris.path = {
        	welcome : "screen/welcome.js",
        	welcome_html : "screen/welcome.html",
        	ui : "ui/example.js",
        	ui_html : "ui/example.html"
        };

		iris.welcome(iris.path.welcome);
	}
);
