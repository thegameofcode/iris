iris.resource(function (self) {

	var todos = [];

	self.init = function () {
		if ( localStorage ) {

			var savedTodos = localStorage.getItem('todos');
			if ( savedTodos ) {
				savedTodos = JSON.parse(savedTodos);
				for ( var i = 0; i < savedTodos.length; i++ ) {
					self.add( savedTodos[i] );
				}
			}

			self.on('change', saveTodos);
			self.on('add', saveTodos);
			self.on('remove', saveTodos);
		}
	};

	self.add = function (data) {
		var todo = iris.model(iris.path.model.todo.js, data);
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
		for ( var i = 0; i < todos.length; i++ ) {
			todos[i].setCompleted(completed);
		}
		self.notify('change');
	};

	self.toggle = function (todo) {
		todo.toggle();
		self.notify('change');
	};

	self.setText = function (todo, newText) {
		todo.set({text : newText});
	};

	function saveTodos () {
		var todoArray = [];
		for ( var i = 0; i < todos.length; i++ ) {
			todoArray.push(todos[i].data);
		};
		localStorage.setItem( 'todos', JSON.stringify(todoArray) );
	}

}, iris.path.resource.todo.js);
