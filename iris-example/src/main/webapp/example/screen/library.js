iris.Screen(
	function (self) {
		
		self.Create = function () {
			self.Template("example/screen/library.html");
			
			var $library = self.$Get("library");
			iris.screen.Add($library, "#library/books", "example/screen/books.js");
			iris.screen.Add($library, "#library/authors", "example/screen/authors.js");
			
			self.$Get("btn_create").click(_Create);
			self.$Get("btn_debug_uis").click(_DebugUIs); 
			self.$Get("btn_destroy").click(_Destroy); 
			
		}
		
		function _Create () {
			self.InstanceUI("uis", "example/ui/example.js", {"count" : self.__UIComponents__.length});
		}
		
		function _DebugUIs () {
			iris.D("UIs", self.__UIComponents__)
		}
		
		function _Destroy () {
			
			var idx = self.$Get("destroy_index").val();
			var ui = self.__UIComponents__[idx];
			self.DestroyUI(ui);
			
			iris.D("UIs", self.__UIComponents__)
		}
		
	}
);
