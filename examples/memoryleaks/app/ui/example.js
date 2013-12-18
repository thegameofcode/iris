iris.ui(function (self) {

	self.create = function() {
		
		self.tmplMode(self.APPEND);
		self.tmpl(iris.path.ui_html);

		self.on('test-event', funcExample);
	};

	function funcExample () {
		console.log('Example function!')
	}

}, iris.path.ui);
