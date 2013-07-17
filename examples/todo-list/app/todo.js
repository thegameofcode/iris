iris.ui(function (self) {

	self.settings({
		id : null
	});

	var todos = iris.resource(iris.path.resource);

	self.create = function() {
		
		self.tmplMode(self.APPEND);
		self.tmpl(iris.path.todo.html);

		self.get("check").on("click", function () {
			todos.toggle(self.setting("id"));
		});

		self.get("destroy").on("click", function () {
			todos.remove(self.setting("id"));
		});

		self.get().on("dblclick", function () {
			self.get().addClass("editing");
			self.get("text").select();
		});

		self.get("text").on("blur change", function (e) {
			if ( !self.get().hasClass("editing") ) return;

			self.get().removeClass("editing");
			if ( this.value.trim() !== "" ) {
				todos.edit(self.setting("id"), this.value);
			}
		});

		self.render();
		self.get().hide().fadeIn("slow");
	};

	self.render = function () {
		var todo = todos.getTodo(self.setting("id"));
		self.get().toggleClass("completed", todo.completed);
		self.inflate({todo: todo});
		return self;
	};

	self.filter = function (status) {
		var todo = todos.getTodo(self.setting("id"));
		var visible = ( status === "all" 
			|| (todo.completed && status === "completed") 
			|| (!todo.completed && status === "active")
		);
		self.get().toggle(visible);
		return self;
	};

},iris.path.todo.js);
