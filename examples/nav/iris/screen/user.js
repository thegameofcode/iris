iris.screen(function (self) {

	// var resource = iris.resource(iris.path.resource);

	self.create = function() {
		
		self.tmpl(iris.path.screen.user.html);

		self.screens("screens", [
		 	["friends/:id_friend/group/:id_group", iris.path.screen.friend.js]
		]);
	};

	self.awake = function () {
		self.get('id').text(self.param('id'))
	};

	// self.canSleep = function () {
	// 	return true;
	// };

	// self.sleep = function () {
		
	// };

	// self.destroy = function () {
		
	// };

},iris.path.screen.user.js);
