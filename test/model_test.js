/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/
(function($) {

	module('Module Model', {
		setup: function() {
			window.resetIris();
			iris.path = {
				model: "test/model/model.js",
				welcome_tmpl: "test/model/welcome.html",
				welcome: "test/model/welcome.js"
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


	asyncTest("Model create method", function() {
		expect(1);

		iris.on(iris.AFTER_NAVIGATION, function() {
			iris.off(iris.AFTER_NAVIGATION);

			iris.model(iris.path.model); // +1

			start();
		});
	});
	
	asyncTest("Model defaults test", function() {
		expect(2);

		iris.on(iris.AFTER_NAVIGATION, function() {
			iris.off(iris.AFTER_NAVIGATION);

			var model = iris.model(iris.path.model); // +1
			
			window.ok(model.get('key1') === 'value1', 'Key1 retrieved from the model.defaults object');

			start();
		});
	});
	
	asyncTest("Model defaults test", function() {
		expect(3);

		iris.on(iris.AFTER_NAVIGATION, function() {
			iris.off(iris.AFTER_NAVIGATION);

			var model = iris.model(iris.path.model); // +1
			
			window.ok(model.get('key1') === 'value1', 'key1 retrieved from the model.defaults object'); // +1
			
			window.ok(model.get('key3') === undefined, 'key3 non exists'); // +1

			start();
		});
	});
	
	
	
	asyncTest("Model set test", function() {
		expect(3);

		iris.on(iris.AFTER_NAVIGATION, function() {
			iris.off(iris.AFTER_NAVIGATION);

			var model = iris.model(iris.path.model); // +1
			
			window.ok(model.get('key2') === 'value2_updated', 'key2 has been modified'); // +1
			
			model.set({'key3': 'value3'});
			
			deepEqual({key1: 'value1', key2: 'value2_updated', key3: 'value3'}, model.get()); // +1

			start();
		});
	});
	
	asyncTest("Model.get() Method (complex objects)", function() {
		expect(2);

		iris.on(iris.AFTER_NAVIGATION, function() {
			iris.off(iris.AFTER_NAVIGATION);

			var model = iris.model(iris.path.model); // +1
			
			model.set({test: {test2: 'test2'}});
			
			deepEqual({test2: 'test2'}, model.get('test')); // +1

			start();
		});
	});
	
	asyncTest("Model change Event", function() {
		expect(2);

		iris.on(iris.AFTER_NAVIGATION, function() {
			iris.off(iris.AFTER_NAVIGATION);

			var model = iris.model(iris.path.model); // +1
			
			model.on('change', function() {
				window.ok(true, "change event callback");
			});
			
			model.set({test: {test2: 'test2'}}); // +1

			start();
		});
	});

}(jQuery));