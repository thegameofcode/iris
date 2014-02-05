iris.ui(function (self) {

	self.create = function() {
		self.tmpl(iris.path.ui.todo.html);

		self.get('destroy').on('click', initDestroy);
		self.get().on('dblclick', startEdition);
		self.get('text').on('blur change', endEdition).on('keyup', endEditionOnEscape);
		self.get('check').on('click', toggle);

		var model = self.model();
		model.on('change', render);
		model.on('remove', destroy);

		render();
	};

	function render () {
		var modelData = self.model().get();
		self.get().toggleClass('completed', modelData.completed);
		self.inflate({todo: modelData});
	}

	function destroy () {
		self.destroyUI();
	}

	function initDestroy (e) {
		self.model().notify('remove', self.model());
	}

	function startEdition (e) {
		self.get().addClass('editing');
		self.get('text').select();
	}

	function endEdition (e) {
		var $this = self.get();
		if ( !$this.hasClass('editing') ) return;

		self.get().removeClass('editing');
		if ( this.value.trim() !== '' ) {
			self.model().set({text : this.value});
		} else {
			destroy();
		}
	}

	function endEditionOnEscape (e) {
		if ( e.keyCode === 27 ) self.get().removeClass('editing');
	}

	function toggle (e) {
		self.model().toggle();
	}

},iris.path.ui.todo.js);
