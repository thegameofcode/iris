iris.screen(function(self) {

	self.create = function() {

		self.tmpl("screen/welcome.html");

		self.screens("screens",[
			["books", "screen/books.js"],
			["authors", "screen/authors.js"]
		]);

		if ( !document.location.hash ) {
		    iris.navigate("#/books");
		}
	}

},"screen/welcome.js");
