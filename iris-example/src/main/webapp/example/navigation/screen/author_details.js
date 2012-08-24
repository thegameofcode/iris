iris.Screen(
	 function (self) {
		
		self.Create = function () {
			self.Template("example/screen/author_details.html");
		}
		
		self.Awake = function (p_params) {
			iris.D("AWAKE AUTHOR DETAILS", p_params)
		}
		
		self.Sleep = function () {
			iris.D("SLEEP AUTHOR DETAILS")
		}
	}
);
