iris.screen(function(self) {

	var currentFilter = 'all', todosCollection;

	self.create = function() {
		self.tmpl(iris.path.screen.welcome.html);

		self.get('new-todo').on('keyup', newTodoOnKeyUp);
		self.get('toggle-all').on('change', toggleAllOnChange);
		self.get('clear-completed').on('click', removeCompleted);

		todosCollection = new iris.Collection(iris.path.model.todo.js, { storage: 'localStorage' });
		todosCollection.on('add', addTodo);
		todosCollection.on('remove', render);
		todosCollection.load();
	};

	self.awake = function () {
		currentFilter = self.param('filter') || 'all';

		var $footer = self.get('footer');
		$('.selected', $footer).removeClass('selected');
		$('a[href="#;filter=' + currentFilter + '"]', $footer).addClass('selected');

		var uis = self.ui('todo-list');
		for (var i = 0; i < uis.length; i++) {
			setVisible(uis[i]);
		}
	};

	function newTodoOnKeyUp (e) {
		var text = this.value.trim();
		this.value = '';
		if ( e.keyCode === 13 && text !== '' ) {
			var todo = todosCollection.add({ text: text });
			todo.on('change', todosCollection.save);
			todo.on('change', render);
			todo.on('remove', removeTodo);
			todosCollection.save();
		}
	}

	function addTodo (todo) {
		var ui = self.ui('todo-list', iris.path.ui.todo.js, {model: todo}, self.APPEND);
		setVisible(ui);
		render();
	}

	function removeTodo (todo) {
		todosCollection.remove(todo);
		todosCollection.save();
	};

	function removeCompleted () {
		todosCollection.where({completed: true}, function (todo) {
			todosCollection.remove(todo);
		});

		todosCollection.save();
		render();
	};

	function toggleAllOnChange (e) {
		var completed = self.get('toggle-all').prop('checked');
		todosCollection.each(function (todo) {
			todo.setCompleted(completed);
		});
		render();
	}

	function getCounts () {
		var i, remaining = 0, total = todosCollection.size();

		todosCollection.each(function (todo) {
			if ( !todo.get('completed') ) remaining++;
		});
		
		return { remaining: remaining, total: total, completed: total - remaining };
	}

	function setVisible (todo) {
		var isCompleted = todo.model().get('completed');
		var isVisible = currentFilter === 'all' || 
				(isCompleted && currentFilter === 'completed') ||
				(!isCompleted && currentFilter === 'active');
		todo.get().toggleClass('hidden', !isVisible);
	}

	function render () {
		var count = getCounts();

		self.inflate({
			completed: 'Clear completed (' + count.completed + ')',
			remaining: {
				count: count.remaining,
				text: 'item' + (count.remaining !== 1 ? 's ' : ' ') + 'left' 
			},
			hasTodos: (count.total !== 0),
			hasRemainings: (count.completed > 0),
			noRemainingTodos: (count.remaining === 0)
		});
	}

},iris.path.screen.welcome.js);
