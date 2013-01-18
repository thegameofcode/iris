iris.screen(function(self) {
	
	self.create = function() {
		self.tmpl("screen/example_screen_params_child.html");
	}
	
	self.awake = function(params) {
		self.get("screen_param").text(params["parameter"]);
	}
});