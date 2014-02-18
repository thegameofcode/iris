iris.screen(function(self) {
	
	var inputMaxUIs, inputMaxScreens, screenCount, screenInter, val, uiResults;

	var model = iris.model(iris.path.model, {test:'test'});
	
	self.create = function() {
		self.tmpl(iris.path.welcome_html);

		self.events('welcome-event');

		self.get("btn_create_uis").click(createUIs);
		self.get("btn_destroy_all_uis").click(destroyAllUIs);
	
		self.get("btn_run_ui_tests").click(runUITests);
		uiResults = self.get("ui_results");

		self.get("btn_reset_iris").on("click", onResetIris);
		
		inputMaxUIs = self.get("ui_max");


		self.get('btn_notify_mevent').click(notifyMEvent);
		self.get('btn_destroy_model').click(destroyModel);

		self.get('btn_notify_we').click(notifyWE);
	}

	function notifyWE () {
		self.notify('welcome-event');
	}

	function notifyMEvent () {
		model.notify('change');
	}

	function destroyModel () {
		model.destroy();
		model = null;
	}
	
	function createUIs() {
		var init = new Date().getTime();
		var num_uis = inputMaxUIs.val();
		
		for(var f=0, num_uis; f<num_uis; f++) {
			self.ui("uis", "ui/example.js", {
				count: self.uis.length,
				model: model,
				welcome: self
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
	
}, iris.path.welcome);
