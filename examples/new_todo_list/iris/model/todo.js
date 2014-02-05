iris.model(function (self) {

	self.defaults = {
		title: '',
		completed: false
	};

	self.functions = {
		toggle : function () {
			this.set({completed : !this.get('completed')});
		},
		setCompleted : function (value) {
			if ( value !== this.get('completed') ) this.toggle();
		}
	};
	
}, iris.path.model.todo.js);
