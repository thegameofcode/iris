iris.ui(function (self) {

	var todos = iris.resource(iris.path.resource);

	self.create = function() {
		
		self.tmplMode(self.APPEND);
		self.tmpl(iris.path.todo.html);

		self.get("check").on("click", function () {
			todos.toggle(self);
		});

		self.get("destroy").on("click", function () {
			todos.remove(self);
		});

		self.get().on("dblclick", function () {
			self.get().addClass("editing");
			self.get("text").select();
		});

		self.get("text").on("blur change", function (e) {
			self.get().removeClass("editing");
			if ( this.value.trim() !== "" ) todos.edit(self, this.value);
			else this.value = self.data.text;
		});
		
		self.get().hide().fadeIn("slow");
	};

	self.render = function (model) {
		if ( model !== undefined ) {
			self.data = model;
		}
		if ( self.data.completed ) {
			self.get().addClass("completed");
		} else {
			self.get().removeClass("completed");
		}
		self.get("check").prop("checked", self.data.completed);
		self.inflate(self.data);
	};

},iris.path.todo.js);
