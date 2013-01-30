iris.screen(function(self) {

	self.create = function() {
		
		self.tmpl(iris.path.example_nested_uis_tmpl);
		
		self.ui("uis", iris.path.ui_nested);
	}
	
}, iris.path.example_nested_uis);