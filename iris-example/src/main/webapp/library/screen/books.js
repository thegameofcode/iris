iris.Screen(
	function (self) {
		
		self.Create = function () {
			self.Template("library/screen/books.html");
			
			var $btnEdit = self.$Get("btn_edit");
			$btnEdit.click(_GotoEdit)
			
			var btnEdit = self.InstanceUI("btn_edit", "example/ui/button.js", {"onClick" : _GotoEdit});
			
			self.AddScreen("edit", "#books/edit", "library/screen/book_edit.js");
		}
		
		self.Awake = function () {
			iris.D("AWAKE BOOK LIST")
		}
		
		self.Sleep = function () {
			iris.D("SLEEP BOOK LIST")
		}
		
		function _GotoEdit () {
			iris.Goto("#books/edit?t=Title&a=Author")
		}
		
	}
);
