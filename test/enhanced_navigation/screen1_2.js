iris.screen(function (self) {

	self.create = function() {

		self.tmpl(iris.path.empty_tmpl);

		var msg = "[create] " + self.id;
		iris.log(msg);
		window.ok(true, msg);
		window.navigations.push(msg);

		window.equal(self.param('parameter'), '123456_ABCD', 'The path param "parameter" is equal');
		window.equal(self.param('other_param'), '&?_test:|', 'The path param "other_param" is equal');

	};

	self.awake = function (params) {
		var msg = "[awake] " + self.id;
		iris.log(msg);
		window.ok(true, msg);
		window.navigations.push(msg);
	};

	self.sleep = function () {
		var msg = "[sleep] " + self.id;
		iris.log(msg);
		window.ok(true, msg);
		window.navigations.push(msg);
	};

	self.canSleep = function () {
		var msg = "[canSleep] " + self.id;
		iris.log(msg);
		window.ok(true, msg);
		window.navigations.push(msg);
	};

	self.destroy = function () {
		var msg = "[destroy] " + self.id;
		iris.log(msg);
		window.ok(true, msg);
		window.navigations.push(msg);
	};

}, iris.path.screen1_2);