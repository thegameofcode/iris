iris.screen(function (self) {

	self.create = function() {

		self.tmpl(iris.path.screen_tmpl);
		
		self.on('screen-event', onEvent);
		
		self.notify('screen-event'); // +1
		
		var ui = self.ui('container', iris.path.ui);
		
		ui.on('ui-event', onEvent);
		
		ui.notify('ui-event'); // +2
		
		ui.destroyUI();
		
		ui.notify('ui-event'); // 0
		
	};
	
	function onEvent() {
		window.ok(true, "On event callback");
	}

}, iris.path.screen);