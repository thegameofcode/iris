iris.screen(function(self) {

	self.create = function() {
		
		var params = {
			 "price" : 1499.99
			,"date" : new Date()
			,"object" : {
				"property" : "This is a object property value"
			}
		};
		
		self.tmpl("screen/example_template_params.html", params);
	}
}, iris.path.example_template_params);