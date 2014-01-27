iris.screen(function (self) {

	var PARAM_VAL = "param_value";

	self.create = function() {
		iris.translations("test-lang-into-tmpl", {"TEST" : "TEST"});
		iris.locale("test-lang-into-tmpl");

		self.tmpl("test/component/welcome.html", {param:PARAM_VAL});

		self.screens("screens",  [["screen", iris.path.screen]]);

		iris.on("template_langs", templateLangs);
		iris.on("awake_params", awakeParams);

		// check screen properties
		window.strictEqual(self.id, "#", "Compare welcom screen properties: self.id");
		window.deepEqual(self.con, $(document.body), "Compare welcom screen properties: self.con");
		window.strictEqual(self.fileJs, "test/component/welcome.js", "Compare welcom screen properties: self.fileJs");
		window.strictEqual(self.uis.length, 0, "Compare welcom screen properties: self.uis.length");

	};

	function templateLangs () {
		window.strictEqual(self.get("lang_values").text(), iris.translate("TEST","test-lang-into-tmpl"));
	}

	function awakeParams () {
		window.strictEqual(self.param("param1"), "value1");
		window.strictEqual(self.param("param2"), "value2");
		window.strictEqual(self.param("param3"), "value3");
	}

},iris.path.welcome);