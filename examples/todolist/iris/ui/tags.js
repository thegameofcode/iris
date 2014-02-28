iris.ui(function(self) {

	var todos = iris.resource(iris.path.resource.todo.js);
	var model;

	self.create = function() {
		self.tmpl(iris.path.ui.tags.html);

		model = self.model(iris.path.model.todo.js);
		
		init();
	};

	function onAddTag(tag) {
		todos.addTag(tag, model);
	}

	function onRemoveTag(tag) {
		todos.removeTag(tag, model);
	}

	function init() {
		var tags = [];
		for (var tag in model.get('tags')) {
			tags.push({id: tag, text: tag});
		}

		self.get('tags').select2({tags: tags, tokenSeparators: [',', ' ']}).on('change', function(e) {
			if (e.added) {
				onAddTag(e.added.text);
			} else if (e.removed) {
				onRemoveTag(e.removed.text);
			}
		});
		self.get('tags').select2('data', tags);

	}


}, iris.path.ui.tags.js);