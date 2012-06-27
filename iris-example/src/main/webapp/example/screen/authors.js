iris.Screen(
	function (self) {
		
		self.Create = function () {
			self.Template("example/screen/authors.html");
			
			self.InstanceUI("btn_edit", "example/ui/btn.js", {"onClick" : _GotoEdit});
			
			iris.screen.Add(self.$Get("edit"), "#library/authors/edit", "example/screen/author_edit.js");
		}
		
		self.Awake = function () {
			iris.D("AWAKE AUTHOR LIST")
		}
		
		self.Sleep = function () {
			iris.D("SLEEP AUTHOR LIST")
		}
		
		function _GotoEdit () {
			iris.Goto("#library/authors/edit?t=Title&a=Author")
		}
		
	}
);
