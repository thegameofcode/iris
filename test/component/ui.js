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

		window.strictEqual(self.id, "container");
		window.strictEqual(self.fileJs, "test/component/ui.js");

		var label = self.get("label");
		window.strictEqual(label.size(), 1);

		self.on("ui_settings", onUISettings);

		if ( !self.setting("nested") ) {
			self.on("nested_ui", self.onNestedUI);
		}

	};

	function onUISettings () {
		window.strictEqual(self.setting("default-param"), "default_value");
		window.strictEqual(self.setting("template-param"), "template_value");
		window.strictEqual(self.setting("setting-param"), "setting_value");

		window.start();
	}

	self.onNestedUI = function () {
		var ui = self.ui("container", "test/component/ui.js", {nested:true, "setting-param":"nested_value"});

		window.strictEqual(ui.setting("default-param"), "default_value");
		window.strictEqual(ui.setting("template-param"), "overridden_val");
		window.strictEqual(ui.setting("setting-param"), "nested_value");

		window.start();
	};

});
