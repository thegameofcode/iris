iris.screen(function(self) {

	self.create = function() {

		self.tmpl(iris.path.welcome_tmpl);

		self.screens("container", [
			["screen", iris.path.screen]
		]);
		
	};

}, iris.path.welcome);