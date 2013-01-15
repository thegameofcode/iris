iris.Screen(
	function (self) {
		
		self.Create = function () {
			self.Template("library/screen/books.html");
			
			var $btnEdit = self.$Get("btn_edit");
			$btnEdit.click(_GotoEdit)
			
			var btnEdit = self.InstanceUI("btn_edit", "example/ui/button.js", {"onClick" : _GotoEdit});
			
			self.AddScreen("screens", "#books/edit", "library/screen/book_edit.js");

			if ( document.location.hash == "#books" ) {
				iris.navigate("#books/edit");
			}
		}
		
		self.Awake = function () {
			iris.D("AWAKE BOOK LIST")
		}
		
		self.Sleep = function () {
			iris.D("SLEEP BOOK LIST")
		}
		
		function _GotoEdit () {
			iris.navigate("#books/edit?t=Title&a=Author")
		}
		
	}
);
