iris.screen(function (self) {

	self.create = function() {
		self.tmpl(iris.path.template);

		self.inflate({ name : 'help' });
	};

},iris.path.help);
