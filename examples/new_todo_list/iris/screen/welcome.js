iris.screen(function(self) {

	var todos = iris.resource(iris.path.resource.todo.js);

	self.create = function() {
		self.tmpl(iris.path.screen.welcome.html);

		self.get("new-todo").on("keyup", newTodoOnKeyUp);
		self.get("toggle-all").on("change", toggleAllOnChange);
		self.get("clear-completed").on("click", todos.removeCompleted);

		todos.on('change', render);
		todos.on('add', addTodo);
		todos.init();
		
		render();
	};

	self.awake = function () {
		var filter = self.param("filter");
		if ( filter ) {
			todos.setFilter(filter);

			var $footer = self.get("footer");
			$(".selected", $footer).removeClass("selected");
			$("a[href='#;filter=" + filter + "']", $footer).addClass("selected");
		}
	};

	function newTodoOnKeyUp (e) {
		if ( e.keyCode === 13 && this.value.trim() !== "" ) {
			todos.add(this.value);
			this.value = "";
		}
	}

	function addTodo (todo) {
		self.ui("todo-list", iris.path.ui.todo.js, {todo: todo}, self.APPEND);
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
