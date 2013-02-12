iris.resource(function (self) {

	var incomplete = 0, todos = [], currentFilter = "all";

	self.toggle = function (todo) {
		todo.completed = !todo.completed;

		if ( todo.completed ) {
			--incomplete;
		} else {
			++incomplete;
		}
		iris.notify("change-todos");
	};
	
	self.new = function (ui, text) {
		var todo = { text: text, completed: false, ui: ui };
		todos.push(todo);
		incomplete++;
		ui.setting("data", todo);
		ui.inflate(todo);
		applyFilter(todo);
		iris.notify("change-todos");
		return todo;
	};

	self.len = function () {
		return todos.length;
	}

	self.incomplete = function () {
		return incomplete;
	}

	self.completed = function () {
		return todos.length - incomplete;
	}

	self.allCompleted = function () {
		return incomplete === 0;
	}

	function deleteTodo (i, todo) {
		todos.splice(i, 1);
		if ( !todo.completed ) {
			--incomplete;
		}
		iris.notify("destroy-todo", todo.ui);
	}

	self.remove = function (todoUI) {
		var todo = todoUI.setting("data");
		for ( var i = 0; i < todos.length; i++ ) {
			if (todo === todos[i]) {
				deleteTodo(i, todo);
				iris.notify("change-todos");
				break;
			}
		}
	};

	self.clearCompleted = function () {
		var i, todo;
		for ( i = todos.length-1; i >= 0 ; i-- ) {
			todo = todos[i];
			if (todo.completed) {
				deleteTodo(i, todo);
			}
		}
		iris.notify("change-todos");
	}

	self.setAll = function (completed) {
		for (var i = 0; i < todos.length; i++ ) {
			if ( todos[i].completed !== completed ) {
				todos[i].completed = completed;
				todos[i].ui.render();
			}
		}

		incomplete = ( completed ) ? 0 : todos.length;

		iris.notify("change-todos");
	}

	self.filter = function (filter) {
		currentFilter = filter;
		var i, todo;
		for (i = 0; i < todos.length; i++ ) {
			applyFilter(todos[i]);
		}
	}

	function applyFilter (todo) {
		if ( currentFilter === "all" || (todo.completed && currentFilter === "completed") || (!todo.completed && currentFilter === "active") ) {
			todo.ui.show();
		} else {
			todo.ui.hide();
		}
	}

}, iris.path.res.todo);