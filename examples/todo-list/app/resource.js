iris.resource(function (self) {

	// Resource Events
	self.CREATE_TODO = "create-todo";
	self.DESTROY_TODO = "destroy-todo";
	self.CHANGE_TODO = "change-todo";

	var todos = {},
		ids = [],
		currentFilter = "all",
		id = 0;

	self.reset = function() {
		todos = {};
		ids = [];
		currentFilter = "all";
		localStorage.clear();
		id = 0;
	};

	self.init = function () {
		console.log("Reading todos from storage... ");
		var idsSaved = localStorage.getItem("ids");
		if ( idsSaved ) {
			ids = idsSaved.split(",");
		}

		var todoString, todo, f, F;
		for (f = 0, F = ids.length; f < F; f++) {
			todoString = localStorage.getItem("todo_" + ids[f]);

			todo = JSON.parse(todoString);
			todos[todo.id] = todo;

			if(todo.id > id) {
				id = todo.id;
			}

			iris.notify(self.CREATE_TODO, todo.id);
		}
	};

	self.add = function (text) {
		id++;
		var todo = {id: String(id), text: text, completed: false};
		todos[todo.id] = todo;
		saveTodo(todo);
		
		ids.push(todo.id);
		localStorage.setItem("ids" , ids.join(","));
		
		iris.notify(self.CREATE_TODO, todo.id);
		return todo.id;
	};

	self.getTodo = function (id) {
		var todo = todos[id];
		todo.visible = currentFilter === "all" || 
		(todo.completed && currentFilter === "completed") ||
		(!todo.completed && currentFilter === "active");
		return $.extend({}, todo);
	};

	self.remove = function (id) {
		removeTodo(todos[id]);
		iris.notify(self.DESTROY_TODO, id);
	};

	self.toggle = function (id) {
		var todo = todos[id];
		todo.completed = !todo.completed;
		saveTodo(todo);

		iris.notify(self.CHANGE_TODO, todo.id);
	};

	self.removeCompleted = function () {
		for (var id in todos ) {
			var todo = todos[id];
			if (todo.completed) {
				removeTodo(todo);
				iris.notify(self.DESTROY_TODO, todo.id);
			}
		}
	};

	self.setAll = function (completed) {
		for (var id in todos ) {
			var todo = todos[id];
			if ( todo.completed !== completed ) {
				todo.completed = completed;
				saveTodo(todo);
				iris.notify(self.CHANGE_TODO, todo.id);
			}
		}
	};

	self.edit = function (id, text) {
		var todo = todos[id];
		todo.text = text;
		saveTodo(todo);
		iris.notify(self.CHANGE_TODO, todo.id);
	};

	self.setFilter = function (filter) {
		console.log("Set filter = " + filter);
		currentFilter = filter;
	};

	self.count = function () {
		var remaining = 0;
		var total = ids.length;

		for ( var id in todos ) {
			if ( !todos[id].completed ) {
				remaining++;
			}
		}
		return { remaining: remaining, total: total, completed: total - remaining };
	};

	function saveTodo (todo) {
		console.log("Saving todo name[" + todo.text + "]");
		localStorage.setItem("todo_" + todo.id, JSON.stringify(todo));
	}

	function removeTodo (todo) {
		delete todos[todo.id];

		var key = "todo_" + todo.id;
		localStorage.removeItem(key);

		ids.splice(ids.indexOf(todo.id), 1);
		localStorage.setItem("ids" , ids.join(","));
	}

}, iris.path.resource);
