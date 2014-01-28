iris.resource(function (self) {

	var todos = [], currentFilter = 'all';

	self.add = function (text) {
		var todo = iris.data({ text: text, completed: false, visible: true });
		setVisible(todo);
		todos.push(todo);
		return todo;
	};

	self.remove = function (todo) {
		var idx = $.inArray(todo, todos);
		if ( idx !== -1 ) {
			todos.splice(idx, 1);
			todo.notify('remove');
			self.notify('change');
		}
	};

	self.count = function () {
		var i, remaining = 0, total = todos.length;

		for ( i = 0; i < total; i++ ) {
			if ( !todos[i].get().completed ) remaining++;
		}
		
		return { remaining: remaining, total: total, completed: total - remaining };
	};

	self.removeCompleted = function () {
		var todo, removed = false;
		for ( var i = todos.length - 1; i >= 0; i-- ) {
			todo = todos[i];
			if ( todo.get('completed') ) {
				todos.splice(i, 1);
				removed = true;
				todo.notify('remove');
			}
		}
		if ( removed ) self.notify('change');
	};

	self.setAll = function (completed) {
		var i, todo, changed = false;
		for ( i = 0; i < todos.length; i++ ) {
			todo = todos[i];
			if ( todo.get('completed') !== completed ) {
				todo.set({ completed : completed });
				changed = true;
			}
		}
		if ( changed ) self.notify('change');
	};

	self.setFilter = function (filter) {
		currentFilter = filter;

		for ( var i = 0; i < todos.length; i++ ) {
			setVisible(todos[i]);
		}

		self.notify('change');
	};

	self.toggle = function (todo) {
		todo.set({completed : !todo.get('completed')});
		setVisible(todo);
		self.notify('change');
	};

	self.setText = function (todo, newText) {
		todo.set({text : newText});
		self.notify('change');
	};

	function setVisible (todo) {
		var isCompleted = todo.get('completed');
		var isVisible = todo.get('visible');
		var newIsVisible = currentFilter === "all" || 
				(isCompleted && currentFilter === "completed") ||
				(!isCompleted && currentFilter === "active");

		if ( isVisible !== newIsVisible ) todo.set({visible: newIsVisible});
	}

}, iris.path.resource);
