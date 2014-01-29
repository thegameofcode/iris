iris.resource(function (self) {

	self.init = function () {
		if ( localStorage ) {
			var todos = iris.resource(iris.path.resource.todo.js);
			var savedTodos = localStorage.getItem('todos');
			if ( savedTodos ) {
				savedTodos = JSON.parse(savedTodos);
				for ( var i = 0; i < savedTodos.length; i++ ) {
					todos.notify('add', iris.data(savedTodos[i]));
				}
			}

			todos.on('change', saveTodos);
			todos.on('add', saveTodos);
		}
	};

	function saveTodos () {
		var todos = iris.resource(iris.path.resource.todo.js);
		localStorage.setItem('todos', todos.toJson());
	}

}, iris.path.resource.localstorage.js);
