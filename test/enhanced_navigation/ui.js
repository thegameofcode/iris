iris.ui(function (self) {

	self.settings({
		createOtherUI : true
	});

	self.create = function() {

		var msg = "[create-ui] " + self.id + "_ createOtherUI=" + self.setting("createOtherUI");
		iris.log(msg);
		window.ok(true, msg);
		window.navigations.push(msg);

		self.tmpl(iris.path.empty_tmpl);

		if ( self.setting("createOtherUI") ) {
			self.ui("screens", iris.path.ui, {createOtherUI:false});
		}

	};

	self.awake = function () {
		var msg = "[awake-ui] " + self.id + "_ createOtherUI=" + self.setting("createOtherUI");
		iris.log(msg);
		window.ok(true, msg);
		window.navigations.push(msg);
	};

	self.sleep = function () {
		var msg = "[sleep-ui] " + self.id + "_ createOtherUI=" + self.setting("createOtherUI");
		iris.log(msg);
		window.ok(true, msg);
		window.navigations.push(msg);
	};

	self.canSleep = function () {
		var msg = "[canSleep-ui] " + self.id + "_ createOtherUI=" + self.setting("createOtherUI");
		iris.log(msg);
		window.ok(true, msg);
		window.navigations.push(msg);
	};

	self.destroy = function () {
		var msg = "[destroy-ui] " + self.id + "_ createOtherUI=" + self.setting("createOtherUI");
		iris.log(msg);
		window.ok(true, msg);
		window.navigations.push(msg);
	};

}, iris.path.ui);
