iris.Screen(function(self) {
	
	self.Create = function() {
		self.Template("example/screen/example_screen_params_child.html");
	}
	
	self.Awake = function(p_params) {
		self.$Get("screen_param").text(p_params["parameter"]);
	}
});