iris.screen(function(self) {
	
	
	/*
	 * Notifies:
	 */


	/*
	 * Observes:
	 *				todos.on('change');
	 *				todos.on('add');
	 *				todo.on('toggle')
	 *				todoUI.on('change:tags')
	 */

	var todos = iris.resource(iris.path.resource.todo.js);
	var currentFilter = 'all';
	var tagFilter;
	var tagcloud;

	self.create = function() {
		self.tmpl(iris.path.screen.welcome.html);
		
		self.get("new-todo").on("keyup", newTodoOnKeyUp);
		self.get("toggle-all").on("change", toggleAllOnChange);
		self.get("clear-completed").on("click", todos.removeCompleted);

		todos.on('change', render);
		todos.on('add', addTodo);
		
		tagcloud = self.ui("tagcloud", iris.path.ui.tagcloud.js, {}, self.APPEND);
		
		todos.init();
		

		render();
	};

	self.awake = function () {
		currentFilter = self.param('filter') || 'all';
		tagFilter = self.param('tag') || 'all';

		var $footer = self.get('footer');
		
		$('.selected', $footer).removeClass('selected');
		self.get('tagcloud').find('span > a').removeClass('selected');
		
		if (tagFilter === 'all') {
			$('a[href="#;filter=' + currentFilter + '"]', $footer).addClass('selected');
		}
		tagcloud.selectTag(tagFilter);
		

		var uis = self.ui('todo-list');
		for (var i = 0; i < uis.length; i++) {
			setVisible(uis[i]);
		}
	};

	function newTodoOnKeyUp (e) {
		if ( e.keyCode === 13 && this.value.trim() !== "" ) {
			todos.add({text: this.value});
			this.value = "";
		}
	}

	function addTodo (todo) {
		var todoUI = self.ui("todo-list", iris.path.ui.todo.js, {model: todo}, self.APPEND);
		render();
		setVisible(todoUI);
		todo.on('toggle', function() {
			setVisible(todoUI);
		});
		todoUI.on('change:tags', function() {
			setVisible(todoUI);
		});
		
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

	function setVisible (todoUI) {
		var model = todoUI.model(iris.path.model.todo.js);
		var isCompleted = model.get('completed');
		var isVisible = currentFilter === 'all' || 
				(isCompleted && currentFilter === 'completed') ||
				(!isCompleted && currentFilter === 'active');
		
		isVisible = isVisible && (tagFilter === 'all' || model.get('tags')[tagFilter]);
		todoUI.get().toggleClass('hidden', !isVisible);
	}

},iris.path.screen.welcome.js);
