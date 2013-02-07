iris.Screen(function(self) {
	var _Count = 0;
	
	self.Create = function() {
		self.Template("example/screen/example_list.html");
		self.$Get("btn_create").click(_Create);
	}

	function _Create() {
		self.InstanceUI("container", "example/ui/example.js", {
			"count" : _Count++
		});
	}
});