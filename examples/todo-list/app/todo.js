iris.ui(function(self) {

	var todos = iris.resource(iris.path.todoResource);

	self.create = function() {
		self.tmpl(iris.path.todo.html);

		self.get('destroy').on('click', destroy);
		self.get().on('dblclick', startEdition);
		self.get('text').on('blur change', endEdition).on("keyup", endEditionOnEscape);
		self.get('check').on('click', toggle);

		var todo = self.setting('todo');
		todo.on('remove', remove);
		todo.on('change', render);

		render();
	};

	function render() {
		var todo = self.setting('todo').get();
		self.get().toggleClass('completed', todo.completed);
		self.inflate({todo: todo});
	}

	function remove() {
		self.destroyUI();
	}

	function destroy() {
		todos.remove(self.setting('todo'));
	}

	function startEdition() {
		self.get().addClass('editing');
		self.get('text').select();
	}

	function endEdition() {
		if (self.get().hasClass('editing')) {
			self.get().removeClass('editing');
			if (this.value.trim() !== '') {
				todos.setText(this.value, self.setting('todo'));
			} else {
				destroy();
			}
		} else {
			render();
		}
	}

	function endEditionOnEscape(e) {
		if (e.keyCode === 27) {
			self.get().removeClass('editing');
		}
	}

	function toggle() {
		todos.toggle(self.setting('todo'));
	}

}, iris.path.todo.js);
