iris.ui(function (self) {

	self.settings({
		"default-param":"default_value",
		"template-param":"overridden_val",
		"setting-param":"overridden_val",
		nested : false
	});

	self.create = function() {

		self.tmplMode(self.APPEND);
		self.tmpl("test/component/ui.html");

		window.strictEqual(self.id, "container", "UI Creation: check id");
		window.strictEqual(self.fileJs, "test/component/ui.js", "UI Creation: check fileJs");

		var label = self.get("label");
		window.strictEqual(label.size(), 1, "UI Creation: check self.get");

		self.on("ui_settings", onUISettings);

		if ( !self.setting("nested") ) {
			self.on("nested_ui", self.onNestedUI);
		}

		self.on("self_destroy_ui", destroyUi);
		
	};

	function onUISettings () {
		window.strictEqual(self.setting("default-param"), "default_value", "UI Settings: check default value");
		window.strictEqual(self.setting("template-param"), "template_value", "UI Settings: check template value");
		window.strictEqual(self.setting("setting-param"), "setting_value", "UI Settings: check setting param value");
	}

	self.onNestedUI = function () {
		var ui = self.ui("container", iris.path.ui, {nested:true, "setting-param":"nested_value"});

		window.strictEqual(ui.setting("default-param"), "default_value", "UI Nested Settings: check default value");
		window.strictEqual(ui.setting("template-param"), "overridden_val", "UI Nested Settings: check default value");
		window.strictEqual(ui.setting("setting-param"), "nested_value", "UI Nested Settings: check default value");
	};

	function destroyUi () {
		self.destroyUI();
	}

},iris.path.ui);
