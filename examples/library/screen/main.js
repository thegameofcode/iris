iris.Screen(function(self) {

	self.Create = function() {
		self.Template("library/screen/main.html");

		self.AddScreen("screens", "#books", "library/screen/books.js");
		self.AddScreen("screens", "#authors", "library/screen/authors.js");
		
		if ( !document.location.hash ) {
		    iris.navigate("#books");
		}
	}

});
