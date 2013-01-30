iris.screen(function(self) {

	self.create = function() {
		
		var params = {
			 "price" : 1499.99
			,"date" : new Date()
			,"object" : {
				"property" : "This is a object property value"
			}
		};
		
		self.tmpl(iris.path.example_template_params_tmpl, params);
	}
}, iris.path.example_template_params);