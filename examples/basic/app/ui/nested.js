iris.ui(function (self) {

	self.create = function() {
		
		self.tmplMode(this.APPEND);
		self.tmpl(iris.path.ui_nested_tmpl);

		self.get("create_ui").click(createNestedUI);

	};
	
	function createNestedUI () {
		self.ui("uis", iris.path.ui_nested);
	}

},iris.path.ui_nested);
