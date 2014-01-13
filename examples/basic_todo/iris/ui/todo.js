
iris.ui(function (self) {

	self.create = function() {
		self.tmpl(iris.path.ui.todo.html);

		var index = self.setting('index');
		var parent = self.setting('parent');
		var todo = parent.todos[index];

		self.inflate(todo);

		self.get().toggleClass('todo-done', todo.done);

		self.get('check').on('click', function () {
			todo.done = !todo.done;
			parent.render();
		});
	};

},iris.path.ui.todo.js);
