iris.screen(function (self) {

	self.create = function() {
		self.tmpl("test/advanced_navigation/empty.html");

		
	};

	self.awake = function () {
		var msg = "[awake] " + self.id;
		iris.log(msg);
		window.ok(true, msg);
		window.navigations.push(msg);

		if ( self.param !== undefined && self.param("param") && self.param("param2") ) {
			msg = "[params] " + self.id + " self.param('param') = '" + self.param("param") + "' self.param('param2') = '" + self.param("param2") + "'";
			window.ok(true, msg);
			iris.log(msg);
			window.navigations.push(msg);
		}
	};

}, iris.path.screen5);