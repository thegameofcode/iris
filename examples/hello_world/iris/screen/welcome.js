iris.screen(function (self) {

	self.create = function() {
		self.tmpl(iris.path.screen.welcome.html);

		self.get('name').on('keyup', function () {
			self.inflate({ name : self.get('name').val() });
		});
	};

},iris.path.screen.welcome.js);
