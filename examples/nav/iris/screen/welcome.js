iris.screen(function (self) {

	// var resource = iris.resource(iris.path.resource);

	self.create = function() {
		window.console.warn('welcome create');
		
		self.tmpl(iris.path.screen.welcome.html);

		self.screens("screens", [
		 	["user/:id", iris.path.screen.user.js],
		 	["general/help/screen", iris.path.screen.help.js]
		]);
	};

	self.awake = function () {
		window.console.warn('welcome awake');
	};

},iris.path.screen.welcome.js);
