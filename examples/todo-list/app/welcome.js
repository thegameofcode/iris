iris.screen(function(self) {

	var todos = iris.resource(iris.path.resource);

	self.create = function() {
		self.tmpl(iris.path.welcome.html);

		self.get("new-todo").on("keyup", newTodoOnKeyUp);
		self.get("toggle-all").on("change", toggleAllOnChange);
		self.get("clear-completed").on("click", todos.removeCompleted);

		todos.on('change', render);
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
			var todo = todos.add(this.value);
			this.value = "";
			addTodo(todo);
		}
	}

	function addTodo (todo) {
		self.ui("todo-list", iris.path.todo.js, {todo: todo}, self.APPEND);
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

}, iris.path.welcome.js);