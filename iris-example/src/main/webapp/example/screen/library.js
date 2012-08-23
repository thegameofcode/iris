iris.Screen(
	function (self) {
		
		self.Create = function () {
			self.Template("example/screen/library.html");
			
			var $library = self.$Get("library");
			iris.screen.Add($library, "#library/books", "example/screen/books.js");
			iris.screen.Add($library, "#library/authors", "example/screen/authors.js");
			
			self.$Get("btn_create").click(_Create);
			
			self.$Get("btn_destroy").click(_Destroy); 
			self.$Get("btn_destroy_all").click(_DestroyAllUIs);
			
			self.InstanceUI("btn_debug_uis", "example/ui/btn.js", {"onClick":_DebugUIs,"label":"Debug UI elements"});
			
		}
		
		function _Create () {
			self.InstanceUI("uis", "example/ui/example.js", {"count" : self.__UIComponents__.length});
		}
		
		function _DebugUIs () {
			iris.D("UIs", self.__UIComponents__)
		}
		
		function _DestroyAllUIs () {
			self.DestroyAllUIs("uis");
		}
		
		function _Destroy () {
			
			var idx = Number(self.$Get("destroy_index").val()) + 1; // Skip debug button
			var ui = self.__UIComponents__[idx];
			self.DestroyUI(ui);
			
			iris.D("UIs", self.__UIComponents__)
		}
		
	}
);
