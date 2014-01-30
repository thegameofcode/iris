iris.resource(function (self) {

	var todos = [], currentFilter = 'all';

	self.init = function () {
		if ( localStorage ) {

			var savedTodos = localStorage.getItem('todos');
			if ( savedTodos ) {
				savedTodos = JSON.parse(savedTodos);
				var todo;
				for ( var i = 0; i < savedTodos.length; i++ ) {
					todo = savedTodos[i];
					self.add(todo.text, todo.completed, todo.visible);
				}
			}

			self.on('change', saveTodos);
			self.on('add', saveTodos);
			self.on('remove', saveTodos);
		}
	};

	self.add = function (text, completed, visible) {
		completed = (completed === undefined) ? false : completed;
		visible = (visible === undefined) ? true : visible;
		var todo = iris.data({ text: text, completed: completed, visible: visible });
		setVisible(todo);
		todos.push(todo);
		self.notify('add', todo);
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
				setVisible(todo);
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

	self.toArray = function () {
		var todoArray = [];
		for ( var i = 0; i < todos.length; i++ ) {
			todoArray.push(todos[i].data);
		};
		return todoArray;
	};

	self.toJson = function () {
		return JSON.stringify( self.toArray() );
	};

	function setVisible (todo) {
		var isCompleted = todo.get('completed');
		var isVisible = todo.get('visible');
		var newIsVisible = currentFilter === "all" || 
				(isCompleted && currentFilter === "completed") ||
				(!isCompleted && currentFilter === "active");

		if ( isVisible !== newIsVisible ) todo.set({visible: newIsVisible});
	}

	function saveTodos () {
		localStorage.setItem('todos', self.toJson());
	}

}, iris.path.resource.todo.js);
