iris.Screen(
	 function (self) {
		
		self.Create = function () {
			self.Template("library/screen/book_details.html");
		}
		
		self.Awake = function (p_params) {
			iris.D("AWAKE BOOK DETAILS", p_params)
		}
		
		self.Sleep = function () {
			iris.D("SLEEP BOOK DETAILS")
		}
	}
);
