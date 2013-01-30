iris.screen(function(self) {

	var newTodo, setAllBtn, clearCompletedBtn, todoLeft = 0, numTodos = 0, completeAllShowed = false, filters;

	self.create = function() {
		
		self.tmpl("screen/welcome.html");

		newTodo = self.get("new-todo").on("keyup", newTodoOnKeyUp);
		setAllBtn = self.get("toggle-all").on("click", setAll);
		clearCompletedBtn = self.get("clear-completed").on("click", clearCompleted);
		filters = self.get("filters").on("click", onFiltersClick);

		self.on("destroy-todo", onDestroyTodo);
		self.on("toggle-todo", onToggleTodo);

		render();
	}

	self.awake = function (params) {
		if ( params !== undefined && params.hasOwnProperty("filter") ) {
			self.notify("filter-todos", params.filter);
		}
	}

	function newTodoOnKeyUp (e) {
		if ( e.keyCode === 13 ) {
			createTodo();
		}
	}

	function createTodo () {
		var todo = { text: newTodo.val() };
		self.ui("todo-list", iris.path.todo_item).inflate(todo);
		
		newTodo.val("");
		self.get("todo-count").text(++todoLeft);
		numTodos++;
		render();
	}

	function onDestroyTodo (todo) {
		if ( !todo.setting("completed") ) {
			self.get("todo-count").text(--todoLeft);
		}
		self.destroyUI(todo);
		numTodos--;
		render();
	}

	function onToggleTodo (isChecked) {
		if ( isChecked ) {
			self.get("todo-count").text(--todoLeft);
		} else {
			self.get("todo-count").text(++todoLeft);
		}
		render();
	}

	function onFiltersClick (e) {
		if ( e.target.nodeName.toLowerCase() === "a") {
			$(".selected", filters).each(function () {
				$(this).removeClass("selected");
			})
			$(e.target).addClass("selected");
		}
	}

	function render () {
		if ( numTodos === 0 ) {
			setAllBtn.hide();
			self.get("footer").hide();
		} else {
			setAllBtn.show();
			self.get("footer").show();

			if ( todoLeft === 0 && completeAllShowed ) {
				completeAllShowed = false;
				setAllBtn.attr("checked","checked");
			} else if ( todoLeft <= numTodos && !completeAllShowed ) {
				completeAllShowed = true;
				setAllBtn.removeAttr("checked");
			}
		}

		var completed = numTodos - todoLeft;
		if ( completed > 0 ) {
			clearCompletedBtn.text("Clear completed (" + completed + ")");
			clearCompletedBtn.show();
		} else {
			clearCompletedBtn.hide();
		}

	}

	function setAll () {
		self.notify("set-all-todos", completeAllShowed);
	}
	function clearCompleted () {
		self.notify("clear-completed");
	}
	
}, iris.path.welcome);