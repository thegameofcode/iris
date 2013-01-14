iris.Screen(function(self) {

	var _$CodeExample
	,	_$ParamValue
	;
	
	self.Create = function() {
		self.Template("example/screen/example_screen_params.html");
		
		_$ParamValue = self.$Get("input_param_value");
		_$CodeExample = self.$Get("code_example");
		
		self.$Get("btn_send").click(_Send);
		self.$Get("step1").hide();
		
		self.AddScreen("screens", "#screen-parameters/child-screen", "example/screen/example_screen_params_child.js");
	}
	
	function _Send () {
		self.$Get("step1").show();
		
		var uri = "#screen-parameters/child-screen?parameter=" + encodeURIComponent(_$ParamValue.val());
		
		_$CodeExample.text("iris.navigate('" + uri + "');");
		
		iris.navigate(uri);
	}
});