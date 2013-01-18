iris.screen(
	 function (self) {
		
		self.create = function () {
			self.tmpl("screen/book_details.html");
		}
		
		self.awake = function (p_params) {

			var data = { book : { title : p_params.title, author : p_params.author }};
			self.inflate(data);

			iris.log("AWAKE BOOK DETAILS", p_params);
		}
		
		self.sleep = function () {
			iris.log("SLEEP BOOK DETAILS");
		}
	}
);
