/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/
(function($) {

  /*
    ======== A Handy Little QUnit Reference ========
    http://docs.jquery.com/QUnit

    Test methods:
      expect(numAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      raises(block, [expected], [message])
  */

  function clearBody() {
      var irisGeneratedCode = $("#start_iris").nextAll();
      if (irisGeneratedCode !== undefined) {
          irisGeneratedCode.remove();
      }
  }

  module('Module Event', {
      setup: function() {
          iris.notify("iris-reset");
      },
      teardown: function () {
          clearBody();
      }
  });

  test("Event Test", function () {
      expect(1);

      iris.on("test-event", onEvent);
      iris.notify("test-event");

      iris.off("test-event", onEvent);
      iris.notify("test-event");

  });

  test("Duplicated Event Test", function () {
      expect(1);

      iris.on("duplicated-event", onEvent);
      iris.on("duplicated-event", onEvent);
      iris.on("duplicated-event", onEvent);

      iris.notify("duplicated-event");

  });
  
  test("Off all functions Test", function () {
      expect(3);
      
      iris.on("off-all-functions", onEvent);
      iris.on("off-all-functions", onEvent2);

      iris.notify("off-all-functions"); // +2

      iris.off("off-all-functions");
      
      iris.notify("off-all-functions"); // 0

      iris.on("off-all-functions", onEvent);
      iris.notify("off-all-functions"); // +1
  });
  
  
  function onEvent () {
    ok(true, "On event callback");
  }
  
  function onEvent2 () {
    ok(true, "On event2 callback");
  }

}(jQuery));