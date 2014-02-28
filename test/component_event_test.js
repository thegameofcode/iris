/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/
(function($) {

	module('Module Component Event', {
		setup: function() {
			window.resetIris();
			iris.path = {
				resource: "test/component_event/resource.js",
				model: "test/component_event/model.js",
				welcome_tmpl: "test/component_event/welcome.html",
				welcome: "test/component_event/welcome.js",
				screen_tmpl: "test/component_event/screen.html",
				screen: "test/component_event/screen.js",
				ui_tmpl: "test/component_event/ui.html",
				ui: "test/component_event/ui.js"
			};
			iris.enableLog(false);
			iris.welcome(iris.path.welcome);
		},
		teardown: function() {
			clearBody();
		}
	});

	function clearBody() {
		var irisGeneratedCode = $("#start_iris").nextAll();
		if (irisGeneratedCode !== undefined) {
			irisGeneratedCode.remove();
		}
	}


	asyncTest("Simple event trigger", function() {
		expect(1);

		iris.on(iris.AFTER_NAVIGATION, function() {
			iris.off(iris.AFTER_NAVIGATION);

			var resource = iris.resource(iris.path.resource);

			resource.on('test-event', function(msg) {
				strictEqual('test-event', msg);
				start();
			});

			resource.notify('test-event', 'test-event'); // +1

		});

	});

	asyncTest("On & Off Test", function() {
		expect(1);

		iris.on(iris.AFTER_NAVIGATION, function() {
			iris.off(iris.AFTER_NAVIGATION);

			var resource = iris.resource(iris.path.resource);

			resource.on("test-event", onEvent);
			resource.notify('test-event'); // +1
			resource.off("test-event", onEvent);
			resource.notify('test-event'); // 0
			start();
		});
	});

	asyncTest("Off all functions Test", function() {
		expect(4);

		iris.on(iris.AFTER_NAVIGATION, function() {
			iris.off(iris.AFTER_NAVIGATION);

			var resource = iris.resource(iris.path.resource);

			resource.on("off-all-functions", onEvent);
			resource.on("off-all-functions", onEvent2);
			resource.notify("off-all-functions"); // +2
			resource.off("off-all-functions", onEvent);
			resource.notify("off-all-functions"); // +1
			resource.off("off-all-functions");
			resource.notify("off-all-functions"); // 0
			resource.on("off-all-functions", onEvent);
			resource.notify("off-all-functions"); // +1
			start();
		});
	});

	asyncTest("Silent Test", function() {
		expect(4);

		iris.on(iris.AFTER_NAVIGATION, function() {
			iris.off(iris.AFTER_NAVIGATION);

			var resource = iris.resource(iris.path.resource);
			
			resource.on("silent", onEvent);
			resource.on("silent", onEvent2);

			resource.notify("silent"); // +2

			resource.notifyOff();

			resource.notify("silent"); // 0
			
			resource.notifyOn();

			resource.notify("silent"); // +2
			start();
		});
	});
	
	asyncTest("Listen Test", function() {
		expect(6);

		iris.events('listen-iris');
		iris.on(iris.AFTER_NAVIGATION, function() {
			iris.off(iris.AFTER_NAVIGATION);

			var resource = iris.resource(iris.path.resource);

			resource.listen(iris, "listen-iris", onEvent);
			resource.listen(iris, "listen-iris", onEvent2);
			
			iris.notify("listen-iris"); // +2
			
			resource.pauseListeners();
			
			iris.notify("listen-iris"); // 0
			
			resource.resumeListeners();
			
			iris.notify("listen-iris"); // +2
			
			resource.removeListeners();
			
			iris.notify("listen-iris"); // 0
			
			resource.resumeListeners();
			
			iris.notify("listen-iris"); // 0			
			
			resource.listen(iris, "listen-iris", onEvent);
			resource.listen(iris, "listen-iris", onEvent2);
			
			iris.notify("listen-iris"); // +2
			
			start();
		});
	});
	
	asyncTest("Destroy Observable Test (listen)", function() {
		expect(3);

		iris.on(iris.AFTER_NAVIGATION, function() {
			iris.off(iris.AFTER_NAVIGATION);

			var model = iris.model(iris.path.model);

			iris.listen(model, "listen-model", onEvent);
			iris.listen(model, "listen-model", onEvent2);
			
			model.notify("listen-model"); // +2
			
			model.on('destroy', onEvent);
			
			model.destroy(); // +1
			
			start();
		});
	});
	
	asyncTest("Destroy Observer Test (destroy)", function() {
		expect(1);

		iris.once(iris.AFTER_NAVIGATION, function() {

			var model = iris.model(iris.path.model);
			model.events('listen-weakReference');
			model.on('listen-weakReference', onEvent);
			model.destroy();
			
			try {
				model.notify("listen-weakReference"); // 0
			} catch (e) {
				window.ok(true, 'destroyed pub cannot notify anything'); // +1
			}

			start();
		});
	});
	
	asyncTest("Destroy Publisher Test (listen-weakReference)", function() {
		expect(3);

		iris.once(iris.AFTER_NAVIGATION, function() {

			var model = iris.model(iris.path.model);
			model.events('listen-weakReference');

			iris.listen(model, 'listen-weakReference', onEvent, true);
			iris.listen(model, 'listen-weakReference', onEvent2, true);

			model.notify("listen-weakReference"); // +2

			model.destroy();

			window.equal(0, iris.listens.length, 'the sub has not pub references'); // +1
			
			start();
		});
	});

	asyncTest("Destroy Publisher Test (listen-no weakReference)", function() {
		expect(3);
		
		iris.once(iris.AFTER_NAVIGATION, function() {

			var model = iris.model(iris.path.model);
			model.events('listen-weakReference');

			iris.listen(model, 'listen-weakReference', onEvent, false);
			iris.listen(model, 'listen-weakReference', onEvent2);

			model.notify("listen-weakReference"); // +2

			model.destroy();

			window.equal(2, iris.listens.length, 'the sub has pub references'); // +1
			
			start();
		});
	});
	
	asyncTest("Destroy Publisher Test (removeListeners in Subscriber)", function() {
		expect(3);
		
		iris.once(iris.AFTER_NAVIGATION, function() {

			var modelPub = iris.model(iris.path.model);
			var modelSub = iris.model(iris.path.model);
			
			modelPub.events('listen-weakReference');

			modelSub.listen(modelPub, 'listen-weakReference', onEvent, false);
			modelSub.listen(modelPub, 'listen-weakReference', onEvent2, false);
			modelSub.listen(modelPub, 'destroy', function() {
				modelSub.destroy();
			});
			
			modelSub.destroy = function() {
				modelSub.removeListeners();
				modelSub.notify('destroy');
			};

			modelPub.notify("listen-weakReference"); // +2
			

			modelPub.destroy();

			window.equal(0, modelSub.listens.length, 'the sub has pub references'); // +1
			
			start();
		});
	});
	
	
	asyncTest("Destroy Observable Test (on)", function() {
		expect(3);
		
		iris.on(iris.AFTER_NAVIGATION, function() {
			iris.off(iris.AFTER_NAVIGATION);

			var model = iris.model(iris.path.model);
			
			model.on("listen-model", onEvent);
			model.on("listen-model", onEvent2);
			
			model.notify("listen-model"); // +2
			
			model.on('destroy', onEvent);
			
			model.destroy(); // +1
			
			start();
		});
	});

	function onEvent() {
		window.ok(true, "On event callback");
	}

	function onEvent2() {
		window.ok(true, "On event2 callback");
	}

}(jQuery));