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
		var tags = '';
		for (var tag in model.get('tags')) {
			if (tags !== '') {
				tags += ',';
			}
			tags += tag;
		}

		self.get('tags').tagsInput({
			onAddTag: onAddTag,
			onRemoveTag: onRemoveTag
		}).importTags(tags);

	}


}, iris.path.ui.tags.js);