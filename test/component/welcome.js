iris.screen(function (self) {

	var PARAM_VAL = "param_value";

	self.create = function() {

		iris.translations("test-lang-into-tmpl", {"TEST" : "TEST"});
		iris.locale("test-lang-into-tmpl");
		self.tmpl("test/component/welcome.html", {param:PARAM_VAL});

		self.screens("screens",  [["#screen", "test/component/screen.js"]]);

		self.on("template_params", templateParams);
		self.on("template_langs", templateLangs);

		// check screen properties
		window.strictEqual(self.id, "welcome-screen", "Compare welcom screen properties: self.id");
		window.deepEqual(self.con, $(document.body), "Compare welcom screen properties: self.con");
		window.strictEqual(self.fileJs, "test/component/welcome.js", "Compare welcom screen properties: self.fileJs");
		window.strictEqual(self.uis.length, 0, "Compare welcom screen properties: self.uis.length");

	};

	function templateLangs () {
		window.strictEqual(self.get("lang_values").text(), iris.translate("TEST"));
	}

	function templateParams () {
		window.strictEqual(self.get("param").text(), PARAM_VAL);
	}

});