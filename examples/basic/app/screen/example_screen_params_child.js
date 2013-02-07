iris.screen(function(self) {
	
	self.create = function() {
		self.tmpl(iris.path.example_screen_params_child_tmpl);
	}
	
	self.awake = function(params) {
		self.get("screen_param").text(params["parameter"]);
	}
}, iris.path.example_screen_params_child);