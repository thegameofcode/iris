iris.screen(function(self) {

	var todos = iris.resource(iris.path.resource);

	self.create = function() {
		self.tmpl(iris.path.welcome.html);

		todos.init(self);

		self.get("new-todo").on("keyup", function (e) {
			if ( e.keyCode === 13 && this.value.trim() !== "" ) {
				todos.add(this.value);
				this.value = "";
			}
		});

		self.get("toggle-all").on("mousedown", function () {
			var completed = self.get("toggle-all").attr("checked") !== "checked";
			todos.setAll( completed );
		});

		self.get("clear-completed").on("click", todos.removeCompleted);

		$("#filters").find("a").on("click", function (e) {
			$(".selected").removeClass("selected");
			$(this).addClass("selected");
		});
	}

	self.awake = function (params) {
		if ( params !== undefined && params.hasOwnProperty("filter") ) {
			todos.filter(params.filter);
		}
	}

	self.render = function () {
		self.inflate({
			completed: "Clear completed (" + todos.completedCount() + ")",
			remaining: todos.remainingCount()
		});

		if ( todos.count() === 0 ) {
			self.get("toggle-all").hide();
			self.get("footer").hide();
		} else {
			self.get("toggle-all").show();
			self.get("footer").show();
		}

		if ( todos.remainingCount() === 0 ) {
			self.get("toggle-all").attr("checked","checked");
		} else {
			self.get("toggle-all").removeAttr("checked");
		}

		if ( todos.completedCount() > 0 ) {
			self.get("clear-completed").show();
		} else {
			self.get("clear-completed").hide();
		}
	}
	
}, iris.path.welcome.js);