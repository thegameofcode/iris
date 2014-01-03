iris.screen(function (self) {

	self.settings({canSleep: true});

	self.create = function() {
		var msg = "[create] " + self.id;
		iris.log(msg);
		window.ok(true, msg);
		window.navigations.push(msg);

		self.tmpl(iris.path.empty_tmpl);

		self.screens("screens", [
			["screen/at/deep/three", iris.path.screen1_1_1]
		]);

	};

	self.awake = function () {
		var msg = "[awake] " + self.id;
		iris.log(msg);
		window.ok(true, msg);
		window.navigations.push(msg);

		var canSleep = self.param('canSleep');
		if ( canSleep ) {
			self.setting("canSleep", false);
		}

		var param = self.param('param');
		var param2 = self.param('param2');
		if ( param2 !== undefined && param !== undefined ) {
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

		return self.setting("canSleep");
	};

	self.destroy = function () {
		var msg = "[destroy] " + self.id;
		iris.log(msg);
		window.ok(true, msg);
		window.navigations.push(msg);
	};

}, iris.path.screen1_1);