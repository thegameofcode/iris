iris.resource(function(self){
	self.create = function() {
		self.events('test-event', 'off-all-functions');
	};
	

}, iris.path.resource);
