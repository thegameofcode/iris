iris.resource(function (self) {

	var models = [],
		remaining = 0,
		localStorageEnabled = false,
		currentFilter = "all";

	self.init = function (manager) {
		self.manager = manager;
		self.uis = [];

		if ( Storage !== undefined ) {
			localStorageEnabled = true;
			if ( localStorage.models !== undefined && localStorage.models !== "" ) {
				var storage = localStorage.models.split(";");
				for ( var i = 0; i < storage.length; i++ ) {
					var todo = JSON.parse(storage[i]);
					if ( !todo.completed ) ++remaining;
					models.push( todo );
					createUI(todo);
				}
			}
		}
		self.manager.render();
	}

	function createUI (todo) {
		var ui = self.manager.ui("todo-list", iris.path.todo.js);
		ui.render(todo);
		applyFilter(ui);
		self.uis.push(ui);
	}

	function save () {
		if ( localStorageEnabled ) {
			var json = "";
			for ( var i = 0; i < models.length; i++ ) {
				json += ";" + JSON.stringify(models[i]);
			}
			localStorage.models = json.substr(1);
		}
	}

	function applyFilter (todoUI) {
		if ( currentFilter === "all" 
			|| (todoUI.data.completed && currentFilter === "completed") 
			|| (!todoUI.data.completed && currentFilter === "active")
		) {
			todoUI.show();
		} else {
			todoUI.hide();
		}
	}

	self.filter = function (filter) {
		currentFilter = filter;
		for (var i = 0; i < self.uis.length; i++ ) {
			applyFilter(self.uis[i]);
		}
	};

	self.add = function (text) {
		remaining++;
		var todo = {text: text, completed: false};
		models.push(todo);
		createUI(todo);
		self.manager.render();
		save();
	};

	self.remove = function (todoUI) {
		var todo = todoUI.data;
		if ( !todo.completed ) --remaining;
		var idx = models.indexOf(todo);
		models.splice(idx, 1);
		self.uis.splice(idx, 1);
		self.manager.destroyUI(todoUI);
		self.manager.render();
		save();
	};

	self.toggle = function (todoUI) {
		var todo = todoUI.data;
		todo.completed = !todo.completed;

		if ( todo.completed ) --remaining;
		else ++remaining;

		todoUI.render();
		self.manager.render();
		save();
	};

	self.removeCompleted = function () {
		for ( var i = models.length-1; i >= 0 ; i-- ) {
			if (models[i].completed) {
				models.splice(i, 1);
				var todoUI = self.uis.splice(i, 1)[0];
				self.manager.destroyUI(todoUI);
			}
		}
		self.manager.render();
		save();
	};

	self.setAll = function (completed) {
		for (var i = 0; i < models.length; i++ ) {
			if ( models[i].completed !== completed ) {
				models[i].completed = completed;
				self.uis[i].render();
			}
		}
		remaining = ( completed ) ? 0 : models.length;
		self.manager.render();
		save();
	};

	self.edit = function (todoUI, text) {
		todoUI.data.text = text;
		todoUI.render();
		save();
	};

	self.count = function () {
		return models.length;
	};

	self.remainingCount = function () {
		return remaining;
	};

	self.completedCount = function () {
		return models.length - remaining;
	};

}, iris.path.resource);