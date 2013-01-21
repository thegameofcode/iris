$(document).ready(
	function () {
	    //iris.on(iris.BEFORE_NAVIGATION, onBeforeNav);
	    //iris.on(iris.AFTER_NAVIGATION, onAfterNav);

		iris.locale(
			"en_US", {
				dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
				monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
				dateFormat: "m/d/Y h:i:s",
				currency: {
					formatPos: "n",
					formatNeg: "(n)",
					decimal: ".",
					thousand: ",",
					precision: 2
				}
			}
		);

		iris.locale("en_US");


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