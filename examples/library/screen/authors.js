iris.Screen(
	function (self) {
		
		var _$CanSleep;
		
		self.Create = function () {
			self.Template("library/screen/authors.html");
			
			self.InstanceUI("btn_edit", "example/ui/button.js", {"onClick" : _GotoEdit});
			
			self.AddScreen("edit", "#authors/edit", "library/screen/author_edit.js");
			
			_$CanSleep = self.$Get("input_cansleep");
		}
		
		self.Awake = function () {
			iris.D("AWAKE AUTHOR LIST")
		}
		
		self.Sleep = function () {
			iris.D("SLEEP AUTHOR LIST")
		}
		
		self.CanSleep = function () {
			var canSleep = _$CanSleep.is(':checked');
			
			if ( !canSleep ) {
				alert("Author list cannot be sleeping")
			}
			
			return canSleep;
		}
		
		function _GotoEdit () {
			iris.Goto("#authors/edit?t=Title&a=Author")
		}
		
	}
);
