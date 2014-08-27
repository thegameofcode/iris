iris.ui(function (self) {

	self.create = function() {
		self.tmpl("test/component/ui_replace.html");

		window.strictEqual(/container2?/.test(self.id), true, "UI-Replace Creation: check id");
		window.strictEqual(self.fileJs, iris.path.ui_replace, "UI-Replace Creation: check fileJs");

	};

	self.awake = function (params) {
		if ( params ) {
			var param1 = params.param1;
			if ( param1 ) {
				window.strictEqual(param1, 'value1', "Check the correct value of param1 inside the UI");
			}
		}
	};

	self.destroy = function () {
		window.ok(true, "The overriden function destroy is called");
	};

},iris.path.ui_replace);
