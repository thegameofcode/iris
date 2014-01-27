iris.ui(function (self) {

	var todos = iris.resource(iris.path.resource);

	self.create = function() {
		self.tmpl(iris.path.todo.html);

		self.get('destroy').on('click', destroy);
		self.get().on('dblclick', startEdition);
		self.get('text').on('blur change', endEdition);
		self.get('check').on('click', toggle);

		var todo = self.setting('todo');
		todo.on('remove', remove);
		todo.on('change', render);

		render();
	};

	function render () {
		var todo = self.setting('todo').get();
		self.get().toggleClass('completed', todo.completed);
		self.inflate({todo: todo});
	}

	function remove () {
		self.destroyUI();
	}

	function destroy () {
		todos.remove(self.setting('todo'));
	}

	function startEdition () {
		self.get().addClass('editing');
		self.get('text').select();
	}

	function endEdition () {
		self.get().removeClass('editing');
		if ( this.value.trim() !== '' ) {
			self.setting('todo').set({text : this.value});
			todos.notify('change');
		}
	}

	function toggle () {
		todos.toggle(self.setting('todo'));
	}

},iris.path.todo.js);
