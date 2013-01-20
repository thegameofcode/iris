iris.screen(function (self) {

	self.create = function() {
		var msg = "[create] " + self.id;
		iris.log(msg);
		window.ok(true, msg);
		window.navigations.push(msg);

		self.tmpl("test/advanced_navigation/empty.html");

		self.screens("screens", [
			["screen1_1", "test/advanced_navigation/screen1_1.js"],
			["screen1_2", "test/advanced_navigation/screen1_2.js"]
		]);

	};

	self.awake = function () {
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

}, "test/advanced_navigation/screen1.js");