iris.ui(function (self) {

	self.settings({
		completed : false
	});

	self.create = function() {
		
		self.tmplMode(self.APPEND);
		self.tmpl("ui/todo_item.html");

		self.get("check").on("click", toggle);
		self.get("destroy").on("click", destroyTodo);

		self.on("set-all-todos", onSetAllTodos);
		self.on("clear-completed", onClearCompleted);
		self.on("filter-todos", onFilter);

		self.get().on("dblclick", edit);
		self.get("text").on("change", onTextBlur);

		self.get().hide().fadeIn("slow");

	};

	function toggle () {
		self.setting("completed", !self.setting("completed"));
		
		self.get().toggleClass("completed");
		self.get("check").attr("checked", self.setting("completed"));

		self.notify("toggle-todo", self.setting("completed"));
	}

	function destroyTodo () {
		self.notify("destroy-todo", self);
	}

	function onSetAllTodos (isCheck) {
		if ( self.setting("completed") !== isCheck ) {
			toggle();
		}
	}

	function onClearCompleted () {
		if ( self.setting("completed") ) {
			destroyTodo();
		}
	}

	function onFilter (filter) {
		var visible = true;

		switch (filter) {
			case "completed":
				visible = self.setting("completed");
			break;
			case "active":
				visible = !self.setting("completed");
			break;
		}

		if ( visible ) {
			self.show();
		} else {
			self.hide();
		}
	}

	function edit () {
		self.get().addClass("editing");
		self.get("text").select();
	}

	function onTextBlur () {
		self.get().removeClass("editing");
		self.inflate({text:self.get("text").val()});
	}


},"ui/todo_item.js");
