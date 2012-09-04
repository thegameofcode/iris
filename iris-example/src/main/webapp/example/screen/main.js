iris.Screen(function(self) {
	self.Create = function() {
		self.Template("example/screen/main.html");

		self.AddScreen("screens", "#destroy", "example/screen/example_destroy.js");
		self.AddScreen("screens", "#destroy-all", "example/screen/example_destroy_all.js");
		self.AddScreen("screens", "#instance", "example/screen/example_instance.js");
		self.AddScreen("screens", "#list", "example/screen/example_list.js");
		self.AddScreen("screens", "#addon-radios", "example/screen/example_addon_radios.js");
		self.AddScreen("screens", "#addon-validation", "example/screen/example_addon_validation.js");

		iris.GotoIfNoHash("#instance");
	}
});