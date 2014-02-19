iris.resource(function(self){
	self.create = function() {
		self.events('test-event', 'off-all-functions', 'silent', 'listen-iris');
	};
	

}, iris.path.resource);
