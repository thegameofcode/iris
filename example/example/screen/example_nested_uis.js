iris.Screen(function(self) {

	self.Create = function() {
		
		self.Template("example/screen/example_nested_uis.html");
		
		self.InstanceUI("uis", "example/ui/nested.js");
	}
	
});