iris.resource(function (self) {

	var todos = [],
		remaining = 0,
		localStorageEnabled = false;

	self.init = function () {
		uis = [];

		if ( Storage !== undefined ) {
			console.log("reading todos from storage... ");
			localStorageEnabled = true;
			if ( localStorage.todos !== undefined && localStorage.todos !== "" ) {
				var storage = localStorage.todos.split(";");
				for ( var i = 0; i < storage.length; i++ ) {
					var todo = JSON.parse(storage[i]);
					if ( !todo.completed ) ++remaining;
					todos.push( todo );
					iris.notify("create-todo", todo);
				}
			}
		}
		iris.notify("render-list");
	}

	function save () {
		if ( localStorageEnabled ) {
			var json = "";
			for ( var i = 0; i < todos.length; i++ ) {
				json += ";" + JSON.stringify(todos[i]);
			}
			localStorage.todos = json.substr(1);
		}
	}

	self.add = function (text) {
		remaining++;

		var todo = {id: new Date().getTime(), text: text, completed: false};
		todos.push(todo);

		iris.notify("create-todo", todo);
		iris.notify("render-list");

		save();
	};

	self.remove = function (todo) {

		if ( !todo.completed ) --remaining;
		todos.splice(todos.indexOf(todo), 1);

		iris.notify("render-list");
		save();
	};

	self.toggle = function (todo) {
		todo.completed = !todo.completed;

		if ( todo.completed ) --remaining;
		else ++remaining;

		iris.notify("render-list");
		iris.notify("render-todo", todo.id);
		save();
	};

	self.removeCompleted = function () {

		for ( var i = todos.length-1; i >= 0 ; i-- ) {
			var todo = todos[i];
			if (todo.completed) {
				iris.notify("destroy-todo", todo.id);
				todos.splice(i, 1);
			}
		}

		iris.notify("render-list");
		save();
	};

	self.setAll = function (completed) {
		for (var i = 0; i < todos.length; i++ ) {
			var todo = todos[i];
			if ( todo.completed !== completed ) {
				todo.completed = completed;
				iris.notify("render-todo", todo.id);
			}
		}
		remaining = ( completed ) ? 0 : todos.length;
		save();
	};

	self.edit = function () {
		save();
	};

	self.count = function () {
		return todos.length;
	};

	self.remainingCount = function () {
		return remaining;
	};

	self.completedCount = function () {
		return todos.length - remaining;
	};

}, iris.path.resource);