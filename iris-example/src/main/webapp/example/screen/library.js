iris.Screen(
	function (self) {
		
		self.Create = function () {
			self.Template("example/screen/library.html");
			
			var $library = self.$Get("library");
			iris.screen.Add($library, "#library/books", "example/screen/books.js");
			iris.screen.Add($library, "#library/authors", "example/screen/authors.js");
			
		}
		
	}
);
