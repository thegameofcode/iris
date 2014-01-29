iris.resource(function (self) {

	self.init = function () {
		if ( localStorage ) {
			var todos = iris.resource(iris.path.resource.todo.js);
			var savedTodos = localStorage.getItem('todos');
			if ( savedTodos ) {
				savedTodos = JSON.parse(savedTodos);
				var todo;
				for ( var i = 0; i < savedTodos.length; i++ ) {
					todo = savedTodos[i];
					todos.add(todo.text, todo.completed, todo.visible);
				}
			}

			todos.on('change', saveTodos);
			todos.on('add', saveTodos);
			todos.on('remove', saveTodos);
		}
	};

	function saveTodos () {
		var todos = iris.resource(iris.path.resource.todo.js);
		localStorage.setItem('todos', todos.toJson());
	}

}, iris.path.resource.localstorage.js);
