/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/
(function($) {

	module('Module Data', {
		setup: function() {
			iris.notify("iris-reset");
			iris.enableLog(false);
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


	test("Data.get() Method", function() {
		var data = iris.data({test: 'test', test2: 'test2'});
		strictEqual('test', data.get('test'));
		equal(undefined, data.get('non exists'));
		deepEqual({test: 'test', test2: 'test2'}, data.get());
	});

	test("Data.get() Method (complex objects)", function() {
		var data = iris.data({test: {test2: 'test2'}});
		deepEqual({test2: 'test2'}, data.get('test'));
		deepEqual({test: {test2: 'test2'}}, data.get());
	});

	test("Data.set() Method", function() {
		expect(3);
		var data = iris.data({test: 'test', test2: 'test2'});
		data.on('change', function() {
			window.ok(true, "change event callback");
		});
		data.set({test: 'test_updated'});
		strictEqual('test_updated', data.get('test'));
		strictEqual('test2', data.get('test2'));
	});


	test("Data Event", function() {
		expect(3);
		var data = iris.data({test: 'test', test2: 'test2'});
		data.on('data-event', onEvent);
		data.on('data-event', onEvent2);
		data.notify('data-event'); // +2
		data.off('data-event', onEvent);
		data.notify('data-event'); // +1
		data.off('data-event');
		data.notify('data-event'); // 0
	});


	function onEvent() {
		window.ok(true, "On event callback");
	}
	
	function onEvent2() {
		window.ok(true, "On event2 callback");
	}

}(jQuery));