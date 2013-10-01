
iris.screen(function (self) {

	var ui;

	self.create = function() {

		self.tmpl("test/component/screen.html");
  
		self.on("create_ui", createUi);
		self.on("create_ui_tmpl_replace", createUiTmplReplace);
		self.on("get_ui", getUi);
		self.on("get_ui_no_instantited", getUiNoInstantiated);
		self.on("get_ui_tmpl_replace", getUiTmplReplace);
		self.on("destroy_ui", destroyUi);
		self.on("destroy_ui_replace", destroyUiReplace);
		self.on("destroy_ui_check", destroyUiCheck);
		self.on("ui_repeated_dataid", ui_repeated_dataid);
		self.on("destroy_multiple_uis", destroy_multiple_uis);
		self.on("destroy_multiple_uis2", destroy_multiple_uis2);

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

	function getUiNoInstantiated () {
		var $container = self.get("empty_container");
		window.strictEqual($container.children().size(), 0, "Checking container childrens before call self.ui");

		var uis = self.ui("empty_container");
		window.strictEqual(uis.length, 0, "Checking uis length must be zero");
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

		// With the ui created previously (tmpl=APPEND)
		var id = ui.id;

		window.strictEqual(self.uis.length, 1, "Checking uis length before deletion");
		window.strictEqual(self.uisMap.hasOwnProperty(id), true);
		window.strictEqual(self.uis[0], self.uisMap[id][0]);
		window.strictEqual($.inArray(self.uisMap[id][0], self.uis), 0, "in Array");

		// With (tmpl=REPLACE)
		var idR = "container2";
		var uiR = self.ui(idR, iris.path.ui_replace);

		window.strictEqual(self.uis.length, 2);
		window.strictEqual(self.uisMap.hasOwnProperty(idR), true);

		self.destroyUI(ui);

		window.strictEqual(self.uis.length, 1, "Checking uis length after deletion");
		window.strictEqual(self.uisMap[id].length, 0, "The uisMap[\"" + id + "\"] size is 0");
		window.strictEqual(self.uisMap.hasOwnProperty(idR), true, "The uisMap has \"" + idR + "\"");

		self.destroyUI(uiR);

		window.strictEqual(self.uis.length, 0, "Checking uis length after deletion");
		window.strictEqual(self.uisMap.hasOwnProperty(idR), false, "UIs Map has not \"" + idR + "\"");
	}

	function destroyUiReplace () {
		var ui = self.ui("container", iris.path.ui_replace);

		self.destroyUIs("container");
		destroyUiCheck();
	}

	function destroyUiCheck () {
		window.strictEqual(self.uis.length, 0, "There are not UIs");
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

	function destroy_multiple_uis2 () {

		self.ui("container", iris.path.ui);
		self.ui("container", iris.path.ui);
		self.ui("container", iris.path.ui);
		window.strictEqual(self.uis.length, 3, "There are three new UIs");

		self.destroyUIs("container");
		window.strictEqual(self.uis.length, 0, "There are zero UIs");

		self.destroyUIs("container");
		window.strictEqual(self.uis.length, 0, "There are zero UIs");
	}

},iris.path.screen);