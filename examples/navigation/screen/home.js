iris.screen(function (self) {

	self.create = function() {
		self.tmpl(iris.path.template);

		self.inflate({ name : 'home' });
	};

},iris.path.home);
