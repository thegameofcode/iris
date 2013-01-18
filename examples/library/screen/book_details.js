iris.screen(
	 function (self) {
		
		self.create = function () {
			self.tmpl("screen/book_details.html");
		}
		
		self.awake = function (params) {

			var data = { book : { title : params.t, author : params.a, create: Number(params.d), price : Number(params.p) }};

			self.inflate(data);

			iris.log("AWAKE BOOK DETAILS", params);
		}
		
		self.sleep = function () {
			iris.log("SLEEP BOOK DETAILS");
		}
	}
);
