iris.screen(function(self) {

	var todos = iris.resource(iris.path.res.todo);

	self.create = function() {
		
		self.tmpl(iris.path.screen.todo.html);


		self.get("new-todo").on("keyup", function (e) {
			if ( e.keyCode === 13 ) {
				var ui = self.ui("todo-list", iris.path.ui.todo.js);
				todos.new(ui, this.value);

				self.get("new-todo").val("");
			}
		});

		self.get("set-all").on("click", function () {
			todos.setAll( self.get("set-all").attr("checked") !== "checked" );
		});

		self.get("clear-completed").on("click", function () {
			todos.clearCompleted();
		});

		self.get("filters").on("click", function (e) {
			if ( e.target.nodeName.toLowerCase() === "a") {
				$(".selected", self.get("filters")).each(function () {
					$(this).removeClass("selected");
				});
				$(e.target).addClass("selected");
			}
		});

		self.on("destroy-todo", function (todoUI) {
			self.destroyUI(todoUI);
		});

		self.on("change-todos", function () {
			self.inflate({completed: "Clear completed (" + todos.completed() + ")", incomplete: todos.incomplete()});

			if ( todos.len() === 0 ) {
				self.get("set-all").hide();
				self.get("footer").hide();
			} else {
				self.get("set-all").show();
				self.get("footer").show();
			}

			if ( todos.allCompleted() ) {
				self.get("set-all").attr("checked","checked");
			} else {
				self.get("set-all").removeAttr("checked");
			}

			if ( todos.completed() > 0 ) {
				self.get("clear-completed").show();
			} else {
				self.get("clear-completed").hide();
			}
		});
	}

	self.awake = function (params) {
		if ( params !== undefined && params.hasOwnProperty("filter") ) {
			todos.filter(params.filter);
		}
	}

	
}, iris.path.screen.todo.js);