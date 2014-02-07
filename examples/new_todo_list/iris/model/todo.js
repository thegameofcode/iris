iris.model(function (self) {

	self.defaults = {
		title: '',
		completed: false
	};

	self.toggle = function () {
		self.set({completed : !self.get('completed')});
	};
	
	self.setCompleted = function (value) {
		if ( value !== self.get('completed') ) self.toggle();
	};
	
}, iris.path.model.todo.js);
