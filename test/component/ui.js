iris.ui(function (self) {

	self.create = function() {

		self.tmplMode(self.TEMPLATE_APPEND);
		self.tmpl("test/component/ui.html");

		window.strictEqual(self.id, "container");
		window.strictEqual(self.fileJs, "test/component/ui.js");

		var label = self.get("label");
		window.strictEqual(label.size(), 1);

	};

});