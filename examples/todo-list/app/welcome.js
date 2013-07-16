iris.screen(function(self) {

	var todos = iris.resource(iris.path.resource),
	 	currentFilter = "all",
	 	todoUIs = {};

	self.create = function() {
		self.tmpl(iris.path.welcome.html);

		self.get("new-todo").on("keyup", function (e) {
			if ( e.keyCode === 13 && this.value.trim() !== "" ) {
				todos.add(this.value);
				this.value = "";
			}
		});

		self.get("toggle-all").on("mousedown", function () {
			var completed = self.get("toggle-all").prop("checked");
			todos.setAll( !completed );
			refreshCounters();
		});

		self.get("clear-completed").on("click", todos.removeCompleted);

		self.on("render-list", render);

		self.on("create-todo", function (todo) {
			console.log("creating todo... ", todo);
			var ui = self.ui("todo-list", iris.path.todo.js);
			ui.render(todo);
			filterTodo(ui);
			todoUIs[todo.id] = ui;
		});

		self.on("destroy-todo", function (id) {
			console.log("destroying todo... ", id);
			self.destroyUI( todoUIs[id] );
		});

		self.on("render-todo", function (id) {
			var ui = todoUIs[id];
			ui.render();
			filterTodo(ui);
		});

		todos.init();
	}

	self.awake = function (params) {
		if ( params !== undefined && params.hasOwnProperty("filter") ) {
			console.log("set filter = " + params.filter);
			filterAllTodos(params.filter);

			$(".selected").removeClass("selected");
			$("a[href='#?filter=" + params.filter + "']").addClass("selected");
		}
	}

	function refreshCounters () {
		self.inflate({
			completed: "Clear completed (" + todos.completedCount() + ")",
			remaining: todos.remainingCount()
		});

		if ( todos.completedCount() > 0 ) {
			self.get("clear-completed").show();
		} else {
			self.get("clear-completed").hide();
		}
	}

	function render () {
		refreshCounters();

		if ( todos.count() === 0 ) {
			self.get("toggle-all").hide();
			self.get("footer").hide();
		} else {
			self.get("toggle-all").show();
			self.get("footer").show();
		}

		self.get("toggle-all").prop("checked", todos.remainingCount() === 0);
	}

	function filterTodo (todoUI) {
		if ( currentFilter === "all" 
			|| (todoUI.data.completed && currentFilter === "completed") 
			|| (!todoUI.data.completed && currentFilter === "active")
		) {
			todoUI.show();
		} else {
			todoUI.hide();
		}
	}

	function filterAllTodos (filter) {
		currentFilter = filter;
		for (var i = 0; i < self.uis.length; i++ ) {
			filterTodo(self.uis[i]);
		}
	};

}, iris.path.welcome.js);
