iris.screen(function (self) {

	// var resource = iris.resource(iris.path.resource);

	self.create = function() {
		window.console.warn('user create');
		
		self.tmpl(iris.path.screen.user.html);

		self.screens("screens", [
		 	["friends/:id_friend/group/:id_group", iris.path.screen.friend.js]
		]);
	};

	self.awake = function () {
		window.console.warn('user awake');
		
		self.get('id').text(self.param('id'))
	};

	self.canSleep = function () {
		window.console.warn('user canSleep');
		return true;
	};

	self.sleep = function () {
		window.console.warn('user sleep');
		
	};

	self.destroy = function () {
		window.console.warn('user destroy');
		
	};

},iris.path.screen.user.js);
