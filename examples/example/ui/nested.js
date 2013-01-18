iris.ui(function (self) {

	self.create = function() {
		
		self.tmplMode(this.APPEND);
		self.tmpl("ui/nested.html");

		self.get("create_ui").click(createNestedUI);

	};
	
	function createNestedUI () {
		self.ui("uis", "ui/nested.js");
	}

});
