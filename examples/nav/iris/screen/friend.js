iris.screen(function (self) {

	// var resource = iris.resource(iris.path.resource);

	self.create = function() {
		
		self.tmpl(iris.path.screen.friend.html);

		self.screens("screens", [
		 	["userhelp/final", iris.path.screen.user_help.js]
		]);
	};

	self.awake = function () {
		self.get('id_friend').text(self.param('id_friend'))
		self.get('id_group').text(self.param('id_group'))
	};

	// self.canSleep = function () {
	// 	return true;
	// };

	// self.sleep = function () {
		
	// };

	// self.destroy = function () {
		
	// };

},iris.path.screen.friend.js);
