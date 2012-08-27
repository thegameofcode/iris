iris.Screen(function(self) {
	
	var _$Msg;
	
	self.Create = function() {
		self.Template("example/screen/example_be_radios.html");
		
		var btn1 = self.InstanceUI("button_one", "example/ui/button.js", {"onClick" : _One});
		var btn2 = self.InstanceUI("button_two", "example/ui/button.js", {"onClick" : _Two});
		var btn3 = self.InstanceUI("button_three", "example/ui/button.js", {"onClick" : _Three});
		
		var beRadios = iris.ApplyBE("example/be/be_radios.js", [btn1, btn2, btn3]);
		
		_$Msg = self.$Get("msg");
		
	}
	
	function _One () {
		_$Msg.text("Button one pressed");
	}
	
	function _Two () {
		_$Msg.text("Button two pressed");
	}
	
	function _Three () {
		_$Msg.text("Button three pressed");
	}

});