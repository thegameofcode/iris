iris.screen(
	 function (self) {
		
		self.create = function () {
			self.tmpl("screen/author_details.html");
		}
		
		self.awake = function (p_params) {
			iris.log("AWAKE AUTHOR DETAILS", p_params)
		}
		
		self.sleep = function () {
			iris.log("SLEEP AUTHOR DETAILS")
		}
	}
);
