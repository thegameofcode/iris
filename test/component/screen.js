
iris.screen(function (self) {

	var ui;

	self.create = function() {

		self.tmpl("test/component/screen.html");
  
		iris.on("create_ui", createUi);
		self.on("destroy_ui", destroyUi);
		self.on("destroy_ui_replace", destroyUiReplace);

		// check screen properties
		window.strictEqual(self.id, "#/screen", "Compare screen properties: id");
		window.strictEqual(self.fileJs, "test/component/screen.js", "Compare screen properties: fileJs");
		window.strictEqual(self.uis.length, 0, "Compare screen properties: uis length");

	};

	self.destroy = function () {
		window.ok(true);
	};

	function createUi () {

		ui = self.ui("container", "test/component/ui.js", {"setting-param":"setting_value"});

		window.strictEqual(self.uis.length, 1);
	}

	function destroyUi () {
		self.destroyUI(ui);

		window.strictEqual(self.uis.length, 0);
	}

	function destroyUiReplace () {
		self.ui("container", "test/component/ui_replace.js");

		window.raises(function () {
			self.destroyUIs("container");
		}, "A replaced container cannot be deleted");
	}

},"test/component/screen.js");