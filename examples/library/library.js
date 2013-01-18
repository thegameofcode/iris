$(document).ready(
	function () {
	    //iris.on(iris.BEFORE_NAVIGATION, onBeforeNav);
	    //iris.on(iris.AFTER_NAVIGATION, onAfterNav);

	    iris.baseUri(iris.baseUri() + "examples/library/");
		
		iris.welcome("screen/welcome.js");
	}
);
/*
function onBeforeNav () {
    console.log("[iris.BEFORE_NAVIGATION]", document.location.hash);
}

function onAfterNav () {
    console.log("[iris.AFTER_NAVIGATION]", document.location.hash);
}
*/