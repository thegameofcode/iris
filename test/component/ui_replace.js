iris.ui(function (self) {

	self.create = function() {
		self.tmpl("test/component/ui_replace.html");

		window.strictEqual(self.id, "container", "UI-Replace Creation: check id");
		window.strictEqual(self.fileJs, "test/component/ui_replace.js", "UI-Replace Creation: check fileJs");

	};

	self.destroy = function () {
		window.ok(true, "The overriden function destroy is called");
	};

},"test/component/ui_replace.js");
