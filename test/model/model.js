iris.model(function(self) {
	self.defaults = {
		key1: 'value1',
		key2: 'value2'
	};
	
	self.create = function() {
		window.ok(true, "On model create");
		self.set({'key2': 'value2_updated'});
	};


}, iris.path.model);
