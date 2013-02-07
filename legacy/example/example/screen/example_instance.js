iris.Screen(function(self) {

	self.Create = function() {
		self.Template("example/screen/example_instance.html");
		self.$Get("btn_create").click(_Create);
	}

	function _Create() {
		self.InstanceUI("container", "example/ui/example_basic.js");
		self.$Get("btn_create").remove();
	}
});