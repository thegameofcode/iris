iris.Screen(
	function (self) {
		
		var _$CanSleep;
		
		self.Create = function () {
			self.Template("example/screen/authors.html");
			
			self.InstanceUI("btn_edit", "example/ui/btn.js", {"onClick" : _GotoEdit});
			
			iris.screen.Add(self.$Get("edit"), "#library/authors/edit", "example/screen/author_edit.js");
			
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
			iris.Goto("#library/authors/edit?t=Title&a=Author")
		}
		
	}
);
