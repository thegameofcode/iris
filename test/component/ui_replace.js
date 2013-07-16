iris.ui(function (self) {

	self.create = function() {
		self.tmpl("test/component/ui_replace.html");

		window.strictEqual(/container2?/.test(self.id), true, "UI-Replace Creation: check id");
		window.strictEqual(self.fileJs, iris.path.ui_replace, "UI-Replace Creation: check fileJs");

	};

	self.destroy = function () {
		window.ok(true, "The overriden function destroy is called");
	};

},iris.path.ui_replace);
