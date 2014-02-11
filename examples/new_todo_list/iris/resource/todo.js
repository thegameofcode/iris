iris.resource(function(self) {

	/*
	 * Notifies:
	 *				self.notify('add'), 
	 *				self.notify('change:tags')
	 *				self.notify('change')
	 *				todo.notify('remove')
	 *				todo.notify('change:tags')
	 */

	/*
	 * Observes:
	 *				self.on('change')
	 *				self.on('add')
	 *				self.on('change:tags')
	 */

	var tags = {};
	var todos = [];

	self.tags = tags;

	self.init = function() {
		if (localStorage) {

			var savedTodos = localStorage.getItem('todos');
			if (savedTodos) {
				savedTodos = JSON.parse(savedTodos);
				for (var i = 0; i < savedTodos.length; i++) {
					self.add(savedTodos[i]);
				}
				self.notify('change:tags');
			}

			self.on('change', saveTodos);
			self.on('add', saveTodos);
			self.on('change:tags', saveTodos);
		}
	};

	self.add = function(data) {
		var todo = iris.model(iris.path.model.todo.js, {
			text: data.text,
			completed: data.completed
		});
		todos.push(todo);
		if (data.tags) {
			data.tags.forEach(function(tag) {
				self.addTag(tag, todo, true);
			});
		}
		self.notify('add', todo);
	};

	self.remove = function(todo) {
		var idx = $.inArray(todo, todos);
		if (idx !== -1) {
			todos.splice(idx, 1);
			removeAllTags(todo);
			self.notify('change:tags');
			todo.notify('remove');
			self.notify('change');
		}
	};

	self.count = function() {
		var i, remaining = 0, total = todos.length;

		for (i = 0; i < total; i++) {
			if (!todos[i].get().completed)
				remaining++;
		}

		return {remaining: remaining, total: total, completed: total - remaining};
	};

	self.removeCompleted = function() {
		var todo, removed = false;
		for (var i = todos.length - 1; i >= 0; i--) {
			todo = todos[i];
			if (todo.get('completed')) {
				removeAllTags(todo);
				todos.splice(i, 1);
				removed = true;
				todo.notify('remove');
			}
		}
		if (removed) {
			self.notify('change:tags');
			self.notify('change');
		}
	};

	self.setAll = function(completed) {
		for (var i = 0; i < todos.length; i++) {
			todos[i].setCompleted(completed);
		}
		self.notify('change');
	};

	self.toggle = function(todo) {
		todo.toggle();
		self.notify('change');
	};

	self.setText = function(todo, newText) {
		todo.set({text: newText});
	};

	self.addTag = function(tag, todo, silent) {
		if (!tags[tag]) {
			tags[tag] = iris.model(iris.path.model.tag.js, {title: tag});
		}

		tags[tag].get('todos').push(todo);
		todo.addTag(tags[tag]);

		if (!silent) {
			self.notify('change:tags');
		}

	};

	self.removeTag = function(tag, todo, silent) {
		if (tags[tag]) {
			var todos = tags[tag].get('todos');
			todos.splice(todos.indexOf(todo), 1);
			todo.removeTag(tag);
			if (todos.length === 0) {
				delete tags[tag];
			}
		}

		if (!silent) {
			self.notify('change:tags');
		}
	};

	function removeAllTags(todo) {
		for (var tag in todo.get('tags')) {
			self.removeTag(tag, todo, true);
		}
	}
	;


	function saveTodos() {
		var todoArray = [];
		for (var i = 0; i < todos.length; i++) {
			todoArray.push({
				text: todos[i].get('text'),
				completed: todos[i].get('completed'),
				tags: Object.keys(todos[i].get('tags'))
			});
		}
		;
		localStorage.setItem('todos', JSON.stringify(todoArray));
	}

}, iris.path.resource.todo.js);
