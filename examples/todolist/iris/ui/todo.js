iris.ui(function(self) {
	
	var todos = iris.resource(iris.path.resource.todo.js);
	var model;
	var filter = {
		completed: 'all',
		tag: 'all'
	};

	self.create = function() {
		self.tmpl(iris.path.ui.todo.html);

		model = self.model(iris.path.model.todo.js);

		self.ui("tags-dialog", iris.path.ui.tags.js, {model: model}, self.APPEND);

		self.get('destroy').on('click', initDestroy);
		self.get().on('dblclick', startEdition);
		self.get('text').on('blur change', endEdition).on('keyup', endEditionOnEscape);
		self.get('check').on('click', toggle);
		self.get('tags').on('click', showTags);

		self.listen(model, 'change', render);
		self.listen(model, 'destroy', finishDestroy);
		
		self.listen(self.parentUI, 'filter', setVisible);

		render();
		setVisible();
	};

	function render() {
		var modelData = model.get();
		self.get().toggleClass('completed', modelData.completed);
		self.inflate({todo: modelData});
	}
	
	
	function setVisible (currentFilter) {
		if (currentFilter) filter = currentFilter;
		var isCompleted = model.get('completed');
		var isVisible = filter.completed === 'all' || 
				(isCompleted && filter.completed === 'completed') ||
				(!isCompleted && filter.completed === 'active');
		
		isVisible = isVisible && (filter.tag === 'all' || model.get('tags')[filter.tag]);
		self.get().toggleClass('hidden', !isVisible);
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
				initDestroy();
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
		setVisible();
	}

	function showTags() {
		$.fancybox(self.get('tags-dialog'), {
			title: model.data.text,
			afterClose: function() {
				setVisible();
			},
			afterShow: function() {
				self.get('tags-dialog').find('input').last().focus();

			}
		});
	}

}, iris.path.ui.todo.js);