
iris.screen(function (self) {

	var ui;

	self.create = function() {

		self.tmpl("test/component/screen.html");
  
		self.on("create_ui", createUi);
		self.on("create_ui_tmpl_replace", createUiTmplReplace);
		self.on("get_ui", getUi);
		self.on("get_ui_tmpl_replace", getUiTmplReplace);
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

	function createUiTmplReplace () {

		ui = self.ui("container", iris.path.ui_replace);

		window.strictEqual(self.uis.length, 1, "Checking uis length after creation");
	}

	function getUi () {
		window.strictEqual(self.ui("container").length, 1, "the ui was not created previously");
		window.strictEqual(self.ui("container")[0], ui, "self.ui returns the correct IU");
	}

	function getUiTmplReplace () {
		window.ok(ui, "The ui was instantiated before");
		window.strictEqual(self.ui("container"), ui, "self.ui returns the correct UI");
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