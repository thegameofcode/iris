iris.screen(function (self) {

	// var resource = iris.resource(iris.path.resource);

	self.create = function() {
		window.console.warn('friend create');
		
		self.tmpl(iris.path.screen.friend.html);

		self.screens("screens", [
		 	["userhelp/final", iris.path.screen.user_help.js]
		]);
	};

	self.awake = function () {
		window.console.warn('friend awake');
		
		self.get('id_friend').text(self.param('id_friend'))
		self.get('id_group').text(self.param('id_group'))
	};

	self.canSleep = function () {
		window.console.warn('friend canSleep');

		return true;
	};

	self.sleep = function () {
		window.console.warn('friend sleep');
		
	};

	self.destroy = function () {
		window.console.warn('friend destroy');
		
	};

},iris.path.screen.friend.js);
