iris.screen(
	function (self) {
		
		self.create = function () {
			self.tmpl("screen/books.html");
			
			var $btnEdit = self.get("btn_edit");
			$btnEdit.click(gotoSleep)
			
			//var btnEdit = self.ui("btn_edit", "example/ui/button.js", {"onClick" : gotoSleep});
			
			self.screens("screens", [["edit", "screen/book_edit.js"]]);

			if ( document.location.hash == "#books" ) {
				iris.navigate("#books/edit");
			}
		}
		
		self.awake = function () {
			iris.log("AWAKE BOOK LIST")
		}
		
		self.sleep = function () {
			iris.log("SLEEP BOOK LIST")
		}
		
		function gotoSleep () {
			iris.navigate("#books/edit?t=Title&a=Author")
		}
		
	}
);
