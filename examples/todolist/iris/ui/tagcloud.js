iris.ui(function(self) {
	
	var todos = iris.resource(iris.path.resource.todo.js);
	
	var tagFilter;

	self.create = function() {
		self.tmpl(iris.path.ui.tagcloud.html);
		self.listen(todos, 'change:tags', self.render);
	};

	self.render = function() {
		var tagcloud_array = [];
		var tags = todos.tags;
		for (var tag in tags) {
			tagcloud_array.push({
				text: tags[tag].get('title'),
				weight: tags[tag].get('todos').length,
				link: "#;tag=" + tags[tag].get('title')
			});
		}
		
		self.get('tagcloud').empty().jQCloud(tagcloud_array);
		self.selectTag();
	};

	self.selectTag = function(tag) {
		self.get('tagcloud').find('span > a').removeClass('selected');
		if (tag) {
			tagFilter = tag;
		}
		if (tagFilter !== 'all') {
			setTimeout(function() {
				self.get('tagcloud').find('span > a').filter('[href*="' + tagFilter + '"]').addClass('selected');
			}, 100);
		}
	};


}, iris.path.ui.tagcloud.js);
