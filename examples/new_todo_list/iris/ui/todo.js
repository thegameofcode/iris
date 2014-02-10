iris.ui(function (self) {

	var todos = iris.resource(iris.path.resource.todo.js);
	var model;

	self.create = function() {
		self.tmpl(iris.path.ui.todo.html);

		self.get('destroy').on('click', initDestroy);
		self.get().on('dblclick', startEdition);
		self.get('text').on('blur change', endEdition).on('keyup', endEditionOnEscape);
		self.get('check').on('click', toggle);

		model = self.model(iris.path.model.todo.js);
		model.on('change', render);
		model.on('remove', finishDestroy);

		render();
	};

	function render () {
		var modelData = model.get();
		self.get().toggleClass('completed', modelData.completed);
		self.inflate({todo: modelData});
	}

	function initDestroy (e) {
		todos.remove(model);
	}

	function finishDestroy () {
		self.destroyUI();
	}

	function startEdition (e) {
		self.get().addClass('editing');
		self.get('text').select();
	}

	function endEdition (e) {
		if ( self.get().hasClass('editing') ) {
			self.get().removeClass('editing');
			
			var newText = this.value.trim();
			if ( newText !== '' ) {
				model.set({ text : newText });
			} else {
				destroy();
			}
		}
	}

	function endEditionOnEscape (e) {
		if ( e.keyCode === 27 ) {
			self.get().removeClass('editing');
		}
	}

	function toggle (e) {
		todos.toggle(model);
		self.notify('toggle');
	}

},iris.path.ui.todo.js);
