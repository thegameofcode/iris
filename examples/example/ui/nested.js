iris.UI(function (self) {

	self.Create = function() {
		
		this.TemplateMode(this.TEMPLATE_APPEND);
		this.Template("example/ui/nested.html");

		self.$Get("create_ui").click(_CreateUI);

	};
	
	function _CreateUI () {
		self.InstanceUI("uis", "example/ui/nested.js");
	}

});
