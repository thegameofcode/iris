iris.ui(function (self) {

	self.create = function() {
		self.tmplMode(self.APPEND);
		self.tmpl(iris.path.ui_tmpl);
		
		self.on('ui-event', onEvent);
	};
	
	function onEvent() {
		window.ok(true, "On event callback");
	}

}, iris.path.ui);