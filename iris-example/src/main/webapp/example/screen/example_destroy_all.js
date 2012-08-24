iris.Screen(function(self) {
	self.Create = function() {
		self.Template("example/screen/example_destroy_all.html");

		self.$Get("btn_create").click(_Create);
		self.$Get("btn_destroy_all").click(_DestroyAllUIs);
	}

	function _Create() {
		self.InstanceUI("uis", "example/ui/example.js", {
			"count" : self.__UIComponents__.length
		});
	}

	function _DestroyAllUIs() {
		self.DestroyAllUIs("uis");
	}
});