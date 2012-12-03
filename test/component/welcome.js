iris.screen(function (self) {

	self.create = function() {

		self.tmpl("test/component/welcome.html");

		self.screen("screens", "#screen", "test/component/screen.js");

		// check screen properties
		window.strictEqual(self.id, "welcome-screen");
		window.deepEqual(self.con, $(document.body));
		window.strictEqual(self.fileJs, "test/component/welcome.js");
		window.strictEqual(self.uis.length, 0);

	};

});