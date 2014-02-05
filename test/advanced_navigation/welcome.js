iris.screen(function (self) {

	self.create = function() {
		var msg = "[create] " + self.id;
		iris.log(msg);
		window.ok(true, msg);
		window.navigations.push(msg);

		self.tmpl("test/advanced_navigation/empty.html");

		self.screens("screens", [
			["screen1", iris.path.screen1],
			["screen2", iris.path.screen2],
			["screen3/:param/:param2", iris.path.screen3],
			["screen4/:param/:param2", iris.path.screen4],
			["screen5/:param/:param2", iris.path.screen5]
		]);

	};

	self.awake = function (params) {
		var msg = "[awake] " + self.id;
		iris.log(msg);
		window.ok(true, msg);
		window.navigations.push(msg);

		if ( params !== undefined && params.hasOwnProperty("param") && params.hasOwnProperty("param2") ) {
			msg = "[params] " + self.id + " param[" + params.param + "] param2[" + params.param2 + "]";
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