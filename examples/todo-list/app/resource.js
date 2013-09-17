iris.resource(function (self) {

	// Resource Events
	self.CREATE_TODO = "create-todo";
	self.DESTROY_TODO = "destroy-todo";
	self.CHANGE_TODO = "change-todo";

	var todos = {},
		remaining = 0,
		total = 0,
		ids = [],
		currentFilter = "all";

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
			if ( !todo.completed ) ++remaining;
			total++;

			iris.notify(self.CREATE_TODO, todo.id);
		}
	}

	self.add = function (text) {
		var todo = {id: String(new Date().getTime()), text: text, completed: false};
		todos[todo.id] = todo;
		saveTodo(todo);

		remaining++;
		total++;
		
		ids.push(todo.id);
		localStorage.setItem("ids" , ids.join(","));

		iris.notify(self.CREATE_TODO, todo.id);
	};

	self.getTodo = function (id) {
		var todo = todos[id];
		todo.visible = currentFilter === "all" 
			|| (todo.completed && currentFilter === "completed") 
			|| (!todo.completed && currentFilter === "active");
		return $.extend({}, todo);
	}

	self.remove = function (id) {
		removeTodo(todos[id])
		iris.notify(self.DESTROY_TODO, id);
	};

	self.toggle = function (id) {
		var todo = todos[id];
		todo.completed = !todo.completed;

		if ( todo.completed ) --remaining;
		else ++remaining;

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
		remaining = ( completed ) ? 0 : total;
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
	}

	self.count = function () {
		return total;
	};

	self.remainingCount = function () {
		return remaining;
	};

	self.completedCount = function () {
		return total - remaining;
	};

	function saveTodo (todo) {
		console.log("Saving todo name[" + todo.text + "]");
		localStorage.setItem("todo_" + todo.id, JSON.stringify(todo));
	}

	function removeTodo (todo) {
		total--;
		if ( !todo.completed ) --remaining;
		delete todos[todo.id];

		var key = "todo_" + todo.id;
		localStorage.removeItem(key);

		ids.splice(ids.indexOf(todo.id), 1);
		localStorage.setItem("ids" , ids.join(","));
	}

}, iris.path.resource);
