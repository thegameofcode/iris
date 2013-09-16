iris.screen(function(self) {

	self.create = function() {
		iris.locale(
		  "en_US", {
			dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
			monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
			dateFormat: "m/d/Y h:i:s",
			currency: {
			  formatPos: "s n",
			  formatNeg: "(s n)",
			  decimal: ".",
			  thousand: ",",
			  precision: 2,
			  symbol : "$"
			},
			number : {
			  decimal: ".",
			  thousand: ",",
			  precision: 2
			}
		  }
		);
		
		self.tmpl(iris.path.example_template_params_tmpl);
		var params = {
			 "price" : 1499.99
			,"date" : new Date()
			,"object" : {
				"property" : "This is a object property value"
			}
		};
		self.inflate(params);
	}
}, iris.path.example_template_params);