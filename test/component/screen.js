
iris.screen(function (self) {

	var ui;

	self.create = function() {

		self.tmpl("test/component/screen.html");
  
		iris.on("create_ui", createUi);
		self.on("destroy_ui", destroyUi);
		self.on("destroy_ui_replace", destroyUiReplace);
		self.on("destroy_ui_check", destroyUiCheck);
		self.on("ui_repeated_dataid", ui_repeated_dataid);
		self.on("destroy_multiple_uis", destroy_multiple_uis);

		// check screen properties
		window.strictEqual(self.id, "#/screen", "Compare screen properties: id");
		window.strictEqual(self.fileJs, "test/component/screen.js", "Compare screen properties: fileJs");
		window.strictEqual(self.uis.length, 0, "Compare screen properties: uis length");

	};

	self.destroy = function () {
		window.ok(true);
	};

	function createUi () {

		ui = self.ui("container", iris.path.ui, {"setting-param":"setting_value"});

		window.strictEqual(self.uis.length, 1);
	}

	function destroyUi () {
		self.destroyUI(ui);

		window.strictEqual(self.uis.length, 0);
	}

	function destroyUiReplace () {
		var ui = self.ui("container", iris.path.ui_replace);

		window.raises(function () {
			self.destroyUIs("container");
		}, "A replaced container cannot be deleted");
	}

	function destroyUiCheck () {
		window.strictEqual(self.uis.length, 0);
	}

	function ui_repeated_dataid () {
		self.ui("container", iris.path.ui_repeated_dataid);
		self.get("sameId");

		window.ok(true);
	}

	function destroy_multiple_uis () {

		self.ui("container", iris.path.ui);
		self.ui("container", iris.path.ui);
		self.ui("container", iris.path.ui);
		window.strictEqual(self.uis.length, 3, "There are three new UIs");

		self.destroyUIs("container");
		window.strictEqual(self.uis.length, 0, "There are zero UIs");
	}

},iris.path.screen);