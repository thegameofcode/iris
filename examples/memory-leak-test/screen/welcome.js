iris.screen(function(self) {
	
	var inputMaxUIs, inputMaxScreens, screenCount, screenInter, val, uiResults;
	
	self.create = function() {
		self.tmpl("screen/welcome.html");

		self.get("btn_create_uis").click(createUIs);
		self.get("btn_destroy_all_uis").click(destroyAllUIs);

/*
		self.get("btn_create_screens").click(createScreens);
		self.get("btn_destroy_all_screens").click(destroyAllScreens);
*/		
		self.get("btn_run_ui_tests").click(runUITests);
		uiResults = self.get("ui_results");

		self.get("btn_reset_iris").on("click", onResetIris);
		
		inputMaxUIs = self.get("ui_max");
//		inputMaxScreens = self.get("screen_max");

	}

	
	function createUIs() {
		var init = new Date().getTime();
		var num_uis = inputMaxUIs.val();
		
		for(var f=0, num_uis; f<num_uis; f++) {
			self.ui("uis", "ui/example.js", {
				"count" : self.uis.length
			});
		}
		var total = new Date().getTime() - init;
		var avg = total / num_uis;
		uiResults.append("<li style='color:green;'>Creating " + num_uis + " UIs ... " + total + " ms (" + avg + " ms/object)</li>");
	}

	function destroyAllUIs() {
		var init = new Date().getTime();
		
		self.destroyUIs("uis");
		
		uiResults.append("<li style='color:red;'>Destroying  UIs ..." + (new Date().getTime() - init) + " ms</li>");
	}
	
	function runUITests () {
		uiResults.empty();
		for ( var i=0; i<10; i++) {
			createUIs();
		}
		destroyAllUIs();
		onResetIris();
	}
	
	function onResetIris () {
		iris.notify("iris-reset");
		uiResults.append("<li style='color:green;'>Iris reset</li>");
	}
	
	/*
		Since 0.5.0 version a screen js cannot be reused

	function createScreens() {
		var init = new Date().getTime();
		iris.log("Creating screens and navigating...");
		
		screenCount = inputMaxScreens.val();
		
		var f = 0, id;
		screenInterval = setInterval(function(){
			if ( f == screenCount ) {
				clearInterval(screenInterval);
			}
			else {
				id = "#screen_" + f++;
				self.AddScreen("screens", id, "screen/example_instance.js");
				iris.navigate(id);
				
				iris.log("   Added screen=",id)
			}
		},500);
		
		iris.log("    Finished at " + (new Date().getTime() - init) + " ms");
	}
	
	function destroyAllScreens() {
		screenInterval = setInterval(function(){
			if ( screenCount-- == 0 ) {
				clearInterval(screenInterval);
			}
			else {
				var id = "#screen_" + screenCount;
				iris.screen.Destroy(id);
				iris.log("   Removed screen=",id)
			}
		},500);
	}*/
});
