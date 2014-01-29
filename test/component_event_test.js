/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/
(function($) {

	module('Module Component Event', {
		setup: function() {
			iris.notify("iris-reset");
			iris.path = {
				resource: "test/component_event/resource.js",
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
	
	asyncTest("Auto off when a component is destroyed", function() {
		expect(3);

		iris.on(iris.AFTER_NAVIGATION, function() {
			iris.off(iris.AFTER_NAVIGATION);
			iris.on(iris.AFTER_NAVIGATION, function() {
				iris.off(iris.AFTER_NAVIGATION);
				start();
			});
			iris.navigate("#/screen");
		});
	});

	function onEvent() {
		window.ok(true, "On event callback");
	}

	function onEvent2() {
		window.ok(true, "On event2 callback");
	}

}(jQuery));