iris.model(function (self) {

	self.defaults = {
		visible: true,
		completed: false
	};

	self.functions = {
		validate : function () {
			if ( !this.get('title') ) {
				return false;
			}
		},
		toggle : function () {
			this.set({completed : !this.get('completed')});
			this.setVisible();
		},
		setCompleted : function (value) {
			if ( value !== this.get('completed') ) this.toggle();
		},
		setVisible : function () {
			var currentFilter = iris.resource(iris.path.resource.todo.js).getFilter();
			var isCompleted = this.get('completed');
			var isVisible = this.get('visible');
			var newIsVisible = currentFilter === "all" || 
					(isCompleted && currentFilter === "completed") ||
					(!isCompleted && currentFilter === "active");

			if ( isVisible !== newIsVisible ) this.set({ visible: newIsVisible });
		}
	};

	self.newTodo = function (data) {
		var model = self.create(data);
		model.setVisible();
		return model;
	};
	
}, iris.path.model.todo.js);
