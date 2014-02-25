iris.ui(function (self) {

	self.events('test-event-0');
	self.events('test-event-1');
	self.events('test-event-2');
	self.events('test-event-3');
	self.events('test-event-4');
	self.events('test-event-5');
	self.events('test-event-6');
	self.events('test-event-7');
	self.events('test-event-8');
	self.events('test-event-9');

	// self.settings({
	//	setting : null
	// });

	// var resource = iris.resource(iris.path.resource);
	// var model = iris.model(iris.path.model);

	self.create = function() {
		self.tmpl(iris.path.ui.basic.html);
	};

	self.listener = function () {
		console.log('listener!!');
	};

	// self.awake = function () {
		
	// };

	// self.sleep = function () {
		
	// };

	// self.destroy = function () {
		
	// };

}, iris.path.ui.basic.js);
