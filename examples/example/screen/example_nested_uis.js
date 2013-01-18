iris.screen(function(self) {

	self.create = function() {
		
		self.tmpl("screen/example_nested_uis.html");
		
		self.ui("uis", "ui/nested.js");
	}
	
});