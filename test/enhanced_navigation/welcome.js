iris.screen(function (self) {

	self.create = function() {
		var msg = "[create] " + self.id;
		iris.log(msg);
		window.ok(true, msg);
		window.navigations.push(msg);

		self.tmpl( iris.path.empty_tmpl );

		self.screens("screens", [
			["first/screen", iris.path.screen1],
			["second/screen", iris.path.screen2]
		]);

	};

	self.awake = function () {
		var msg = "[awake] " + self.id;
		iris.log(msg);
		window.ok(true, msg);
		window.navigations.push(msg);

		var param = self.param('param');
		var param2 = self.param('param2');

		if ( param && param2 ) {
			msg = "[params] " + self.id + " param[" + param + "] param2[" + param2 + "]";
			window.ok(true, msg);
			iris.log(msg);
			window.navigations.push(msg);
		}
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

}, iris.path.welcome);