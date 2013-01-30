iris.screen(function(self) {

	var codeExample
	,	paramValue
	;
	
	self.create = function() {
		self.tmpl(iris.path.example_screen_params_tmpl);
		
		paramValue = self.get("input_param_value");
		codeExample = self.get("code_example");
		
		self.get("btn_send").click(_Send);
		self.get("step1").hide();
		
		self.screens("screens", [["child-screen", iris.path.example_screen_params_child]]);
	}
	
	function _Send () {
		self.get("step1").show();
		
		var uri = "#/screen-parameters/child-screen?parameter=" + encodeURIComponent(paramValue.val());
		
		codeExample.text("iris.navigate('" + uri + "');");
		
		iris.navigate(uri);
	}
}, iris.path.example_screen_params);