iris.Screen(function(self) {

	self.Create = function() {
		self.Template("library/screen/main.html");

		self.AddScreen("library", "#books", "library/screen/books.js");
		self.AddScreen("library", "#authors", "library/screen/authors.js");

	}

});
