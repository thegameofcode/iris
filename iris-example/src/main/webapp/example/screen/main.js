iris.Screen(function(self) {
	self.Create = function() {
		self.Template("example/screen/main.html");
		
		var $screens = self.$Get("screens");
		iris.screen.Add($screens, "#example/destroy", "example/screen/example_destroy.js");
		iris.screen.Add($screens, "#example/destroy-all", "example/screen/example_destroy_all.js");
		iris.screen.Add($screens, "#example/instance", "example/screen/example_instance.js");
		iris.screen.Add($screens, "#example/list", "example/screen/example_list.js");
		iris.screen.Add($screens, "#example/behaviour-radios", "example/screen/example_be_radios.js");
		iris.screen.Add($screens, "#example/behaviour-validation", "example/screen/example_be_validation.js");
	}
});