iris.ui(function(self) {

	var observables = [];

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
		if (self.setting('onNoLeaks')) {
			self.on('destroy', function() {
				observables.forEach(function(array) {
					array[0].off(array[1], array[2]);
					array[0].removeObservable(self);
				});
			});
		}
	};

	self.listener = function(showConsole) {
		if (showConsole) {
			console.log('listener!!');
		}
	};

	self.addObservable = function(observable, event) {
		observable.on(event, self.listener);
		observables.push([observable, event, self.listener]);
	};
	
	self.removeObservable = function (observable) {
		for (var i = observables.length -1; i >= 0; i--) {
			if (observables[i][0] === observable) {
				observables.splice(i, 1);
			}
		}
	};

	// self.awake = function () {

	// };

	// self.sleep = function () {

	// };

	// self.destroy = function () {

	// };

}, iris.path.ui.basic.js);
