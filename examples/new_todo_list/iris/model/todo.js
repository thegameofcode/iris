iris.model(function (self) {
	
	
	/*
	 * Notifies:
	 *				self.notify('toggle')
	 */


	/*
	 * Observes:
	 */

	self.defaults = {
		title: '',
		completed: false,
		tags: {}
	};

	self.toggle = function () {
		self.set({completed : !self.get('completed')});
		self.notify('toggle', self);
	};
	
	self.setCompleted = function (value) {
		if ( value !== self.get('completed') ) self.toggle();
	};
	
	self.addTag = function(tag) {
		self.get('tags')[tag.get('title')] = tag;
	};
	
	self.removeTag = function(tag) {
		delete self.get('tags')[tag];
	};
	
}, iris.path.model.todo.js);