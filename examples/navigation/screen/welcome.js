iris.screen(function (self) {

	self.create = function() {
		self.tmpl(iris.path.welcome_html);

		self.screens('screens',[
			['home', iris.path.home],
			['help', iris.path.help]
		]);
	};

},iris.path.welcome);
