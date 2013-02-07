iris.Screen(function(self) {

	self.Create = function() {
		
		var params = {
			 "price" : 1499.99
			,"date" : new Date()
			,"object" : {
				"property" : "This is a object property value"
			}
		};
		
		self.Template("example/screen/example_template_params.html", params);
	}
});