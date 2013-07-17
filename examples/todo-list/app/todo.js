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
			self.render();
		});

		self.get("destroy").on("click", function () {
			todos.remove(self.setting("id"));
			self.destroyUI();
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
				self.render();
			}

		});

		self.on(todos.DESTROY_TODO, function (id) {
			if (self.setting("id") === id) {
				self.destroyUI();
			}
		});
	};



	self.render = function () {
		var todo = todos.getTodo(self.setting("id"));
		self.get().toggleClass("completed", todo.completed);
		self.inflate({todo: todo});
		return self;
	};

	self.show = function () {
		self.get().hide().fadeIn("slow");
		return self;
	};

},iris.path.todo.js);
