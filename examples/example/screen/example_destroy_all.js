iris.screen(function(self) {
	self.create = function() {
		self.tmpl("screen/example_destroy_all.html");

		self.get("btncreateUI").click(createUI);
		self.get("btn_destroy_all").click(_DestroyAllUIs);
	}

	function createUI() {
		self.ui("uis", "ui/example.js", {
			"count" : self.uis.length
		});
	}

	function _DestroyAllUIs() {
		self.destroyUIs("uis");
	}
}, "screen/example_destroy_all.js");