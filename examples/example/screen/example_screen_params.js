iris.screen(function(self) {

	var codeExample
	,	paramValue
	;
	
	self.create = function() {
		self.tmpl("screen/example_screen_params.html");
		
		paramValue = self.get("input_param_value");
		codeExample = self.get("code_example");
		
		self.get("btn_send").click(_Send);
		self.get("step1").hide();
		
		self.screens("screens", [["child-screen", "screen/example_screen_params_child.js"]]);
	}
	
	function _Send () {
		self.get("step1").show();
		
		var uri = "#screen-parameters/child-screen?parameter=" + encodeURIComponent(paramValue.val());
		
		codeExample.text("iris.navigate('" + uri + "');");
		
		iris.navigate(uri);
	}
}, "screen/example_screen_params.js");