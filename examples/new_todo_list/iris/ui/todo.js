iris.ui(function(self) {
	
	
	/*
	 * Notifies:
	 *				self.notify("change:tags")
	 */


	/*
	 * Observes:
	 *				todo.on('change');
	 *				todo.on('remove')
	 */

	var todos = iris.resource(iris.path.resource.todo.js);
	var model;

	self.create = function() {
		self.tmpl(iris.path.ui.todo.html);

		model = self.model(iris.path.model.todo.js);

		self.ui("tags-dialog", iris.path.ui.tags.js, {model: model}, self.APPEND);

		self.get('destroy').on('click', initDestroy);
		self.get().on('dblclick', startEdition);
		self.get('text').on('blur change', endEdition).on('keyup', endEditionOnEscape);
		self.get('check').on('click', toggle);
		self.get('tags').on('click', showTags);


		model.on('change', render);
		model.on('remove', finishDestroy);

		render();
	};

	function render() {
		var modelData = model.get();
		self.get().toggleClass('completed', modelData.completed);
		self.inflate({todo: modelData});
	}

	function initDestroy(e) {
		todos.remove(model);
	}

	function finishDestroy() {
		self.destroyUI();
	}

	function startEdition(e) {
		self.get().addClass('editing');
		self.get('text').select();
	}

	function endEdition(e) {
		if (self.get().hasClass('editing')) {
			self.get().removeClass('editing');

			var newText = this.value.trim();
			if (newText !== '') {
				model.set({text: newText});
			} else {
				destroy();
			}
		}
	}

	function endEditionOnEscape(e) {
		if (e.keyCode === 27) {
			self.get().removeClass('editing');
		}
	}

	function toggle(e) {
		todos.toggle(model);
	}

	function showTags() {
		$.fancybox(self.get('tags-dialog'), {
			title: model.data.text,
			afterClose: function() {
				self.notify("change:tags");
			},
			afterShow: function() {
				self.get('tags-dialog').find('input').last().focus();

			}
		});
	}

}, iris.path.ui.todo.js);
