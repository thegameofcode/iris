iris.screen(function(self) {
	var _Count = 0;
	
	self.create = function() {
		self.tmpl("screen/example_list.html");
		self.get("btncreateUI").click(createUI);
	}

	function createUI() {
		self.ui("container", "ui/example.js", {
			"count" : _Count++
		});
	}
});