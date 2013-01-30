iris.screen(function(self) {

	self.create = function() {
		self.tmpl("screen/example_instance.html");
		self.get("btncreateUI").click(instanceUi);
	}

	function instanceUi() {
		self.ui("container", iris.path.ui_example_basic);
		self.get("btncreateUI").remove();
	}
}, iris.path.example_instance);