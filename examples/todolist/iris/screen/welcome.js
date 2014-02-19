iris.screen(function(self) {
	
	var todos = iris.resource(iris.path.resource.todo.js);
	var tagcloud;
	
	self.events('filter');

	self.create = function() {
		self.tmpl(iris.path.screen.welcome.html);
		
		self.get("new-todo").on("keyup", newTodoOnKeyUp);
		self.get("toggle-all").on("change", toggleAllOnChange);
		self.get("clear-completed").on("click", todos.removeCompleted);

		todos.on('change', render);
		todos.on('add', addTodo);
		
		tagcloud = self.ui("tagcloud", iris.path.ui.tagcloud.js, {}, self.APPEND);
		
		todos.init();
	};

	self.awake = function () {
		var currentFilter = self.param('filter') || 'all';
		var tagFilter = self.param('tag') || 'all';

		var $footer = self.get('footer');
		
		$('.selected', $footer).removeClass('selected');
		
		
		if (tagFilter === 'all') {
			$('a[href="#;filter=' + currentFilter + '"]', $footer).addClass('selected');
		}
		tagcloud.selectTag(tagFilter);
		
		self.notify('filter', {completed: currentFilter, tag: tagFilter});
		
	};

	function newTodoOnKeyUp (e) {
		if ( e.keyCode === 13 && this.value.trim() !== "" ) {
			todos.add({text: this.value});
			this.value = "";
		}
	}

	function addTodo (todo) {
		self.ui("todo-list", iris.path.ui.todo.js, {model: todo}, self.APPEND);
		render();
	}

	function toggleAllOnChange (e) {
		var completed = self.get("toggle-all").prop("checked");
		todos.setAll( completed );
	}

	function render () {
		var count = todos.count();
		self.inflate({
			completed: "Clear completed (" + count.completed + ")",
			remaining: {
				count: count.remaining,
				text: "item" + (count.remaining !== 1 ? "s " : " ") + "left" 
			},
			hasTodos: (count.total !== 0),
			hasRemainings: (count.completed > 0),
			noRemainingTodos: (count.remaining === 0)
		});
	}

},iris.path.screen.welcome.js);