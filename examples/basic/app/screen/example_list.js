iris.screen(function(self) {
	var _Count = 0;
	
	self.create = function() {
		self.tmpl(iris.path.example_list_tmpl);
		self.get("btncreateUI").click(createUI);
	}

	function createUI() {
		self.ui("container", iris.path.ui_example, {
			"count" : _Count++
		});
	}
}, iris.path.example_list);