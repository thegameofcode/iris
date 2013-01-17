iris.screen(
	 function (self) {
		
		self.create = function () {
			self.tmpl("screen/book_details.html");
		}
		
		self.awake = function (p_params) {
			iris.log("AWAKE BOOK DETAILS", p_params)
		}
		
		self.sleep = function () {
			iris.log("SLEEP BOOK DETAILS")
		}
	}
);
