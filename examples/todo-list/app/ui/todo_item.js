iris.ui(function (self) {

	var todos = iris.resource(iris.path.res.todo);

	self.create = function() {
		
		self.tmplMode(self.APPEND);
		self.tmpl(iris.path.ui.todo.html);

		self.get().hide().fadeIn("slow");

		self.get("check").on("click", function () {
			todos.toggle(self.setting("data"));
			self.render();
		});

		self.get("destroy").on("click", function () {
			todos.remove(self);
		});

		self.get().on("dblclick", function () {
			self.get().addClass("editing");
			self.get("text").select();
		});

		self.get("text").on("blur", onTextBlur);
		self.get("text").on("change", onTextBlur);
		
	};

	function onTextBlur () {
		self.get().removeClass("editing");
		todos.edit(self.setting("data"), self.get("text").val());
		self.render();
	}

	self.render = function () {
		var todo = self.setting("data");

		if ( todo.completed ) {
			self.get().addClass("completed");
		} else {
			self.get().removeClass("completed");
		}

		self.get("check").prop("checked", todo.completed);
		self.inflate(todo);
	}

},iris.path.ui.todo.js);
