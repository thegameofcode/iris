iris.ui(function (self) {

	self.create = function() {
		
		self.tmplMode(self.APPEND);
		self.tmpl(iris.path.ui_html);

		var model = self.model(iris.path.model);
		self.listen(model, 'change', onModelEvent);

		self.listen(self.setting('welcome'), 'welcome-event', onWelcomeEvent);
	};

	function onWelcomeEvent () {
		console.log('onWelcomeEvent!');
	}

	function onModelEvent () {
		console.log('onModelEvent listener ' + self.setting('count'), self);
	};

}, iris.path.ui);
