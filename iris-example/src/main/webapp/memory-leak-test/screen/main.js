iris.Screen(function(self) {
	
	var _$InputMaxUIs
	,	_$InputMaxScreens
	,	_ScreenCount
	,	_ScreenInterval
	,	_$UIResults
	;
	
	self.Create = function() {
		self.Template("memory-leak-test/screen/main.html");

		self.$Get("btn_create_uis").click(_CreateUIs);
		self.$Get("btn_destroy_all_uis").click(_DestroyAllUIs);

		self.$Get("btn_create_screens").click(_CreateScreens);
		self.$Get("btn_destroy_all_screens").click(_DestroyAllScreens);
		
		self.$Get("btn_run_ui_tests").click(_RunUITests);
		_$UIResults = self.$Get("ui_results");
		
		_$InputMaxUIs = self.$Get("ui_max");
		_$InputMaxScreens = self.$Get("screen_max");
	}

	
	function _CreateUIs() {
		var init = new Date().getTime();
		var num_uis = _$InputMaxUIs.val();
		
		for(var f=0, num_uis; f<num_uis; f++) {
			self.InstanceUI("uis", "example/ui/example.js", {
				"count" : self.__UIComponents__.length
			});
		}
		var total = new Date().getTime() - init;
		var avg = total / num_uis;
		_$UIResults.append("<li style='color:green;'>Creating " + num_uis + " UIs ... " + total + " ms (" + avg + " ms/object)</li>");
	}

	function _DestroyAllUIs() {
		var init = new Date().getTime();
		
		self.DestroyAllUIs("uis");
		
		_$UIResults.append("<li style='color:red;'>Destroying  UIs ..." + (new Date().getTime() - init) + " ms</li>");
	}
	
	function _RunUITests () {
		for ( var i=0; i<10; i++) {
			_CreateUIs();
		}
		_DestroyAllUIs();
	}
	
	
	function _CreateScreens() {
		var init = new Date().getTime();
		console.log("Creating screens and navigating...");
		
		_ScreenCount = _$InputMaxScreens.val();
		
		var f = 0, id;
		_ScreenInterval = setInterval(function(){
			if ( f == _ScreenCount ) {
				clearInterval(_ScreenInterval);
			}
			else {
				id = "#screen_" + f++;
				self.AddScreen("screens", id, "example/screen/example_instance.js");
				iris.Goto(id);
				
				iris.D("   Added screen=",id)
			}
		},500);
		
		console.log("    Finished at " + (new Date().getTime() - init) + " ms");
	}
	
	function _DestroyAllScreens() {
		_ScreenInterval = setInterval(function(){
			if ( _ScreenCount-- == 0 ) {
				clearInterval(_ScreenInterval);
			}
			else {
				var id = "#screen_" + _ScreenCount;
				iris.screen.Destroy(id);
				iris.D("   Removed screen=",id)
			}
		},500);
	}
});