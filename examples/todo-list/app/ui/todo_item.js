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

		self.get("text").on("change", function () {
			self.get().removeClass("editing");
			self.inflate({text:self.get("text").val()});
		});
		
	};

	self.render = function () {
		var todo = self.setting("data");
		self.get().toggleClass("completed");
		self.get("check").attr("checked", todo.completed);
	}

},iris.path.ui.todo.js);
