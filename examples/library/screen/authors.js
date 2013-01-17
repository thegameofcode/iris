iris.screen(
	function (self) {
		
		var _$CanSleep;
		
		self.create = function () {
			self.tmpl("screen/authors.html");
			
			//self.ui("btn_edit", "example/ui/button.js", {"onClick" : gotoSleep});
			self.get("btn_edit").on("click", gotoSleep);
			
			self.screens("edit", [["#authors/edit", "screen/author_edit.js"]]);
			
			_$CanSleep = self.get("input_cansleep");
		}
		
		self.awake = function () {
			iris.log("AWAKE AUTHOR LIST")
		}
		
		self.sleep = function () {
			iris.log("SLEEP AUTHOR LIST")
		}
		
		self.canSleep = function () {
			var canSleep = _$CanSleep.is(':checked');
			
			if ( !canSleep ) {
				alert("Author list cannot be sleeping")
			}
			
			return canSleep;
		}
		
		function gotoSleep () {
			iris.navigate("#authors/edit?t=Title&a=Author")
		}
		
	}
);
