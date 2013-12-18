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

  test("Notify An Undefined Event", function () {
      expect(1);

      raises(function () {
          iris.notify(undefined);

      },
      "[notify] event name parameter is not defined",
      "Thrown an exception when notify an undefined event");
  });

  test("Notify An Event Without Callbacks Test", function () {
      expect(1);

      iris.notify("test-event");

      window.ok(true, "No errors when notify a undefined event without callbacks");
  });

  test("On & Off Test", function () {
      expect(1);

      iris.on("test-event", onEvent);
      iris.notify("test-event"); // +1

      iris.off("test-event", onEvent);
      iris.notify("test-event"); // 0

  });

  test("Manage Multiple Event Types Test", function () {
      expect(8);

      iris.on("event-type-1", onEvent);
      iris.notify("event-type-1"); // +1

      iris.on("event-type-2", onEvent);
      iris.notify("event-type-2"); // +1

      iris.on("event-type-1", onEvent2);
      iris.notify("event-type-1"); // +2

      iris.on("event-type-2", onEvent2);
      iris.notify("event-type-2"); // +2

      iris.off("event-type-1", onEvent);
      iris.notify("event-type-1"); // +1

      iris.off("event-type-2", onEvent);
      iris.notify("event-type-2"); // +1

      iris.off("event-type-1", onEvent2);
      iris.notify("event-type-1"); // 0

      iris.off("event-type-2", onEvent2);
      iris.notify("event-type-2"); // 0
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

  test("Invalid functions", function () {
      expect(7);
      
      raises(function () {
          iris.on("test", undefined);
      },
      "invalid function",
      "Thrown an exception when callback is undefined");

      raises(function () {
          iris.on("test", new Date());
      },
      "invalid function",
      "Thrown an exception when callback is Date");

      raises(function () {
          iris.on("test", 'function');
      },
      "invalid function",
      "Thrown an exception when callback is 'function'");

      raises(function () {
          iris.on("test", null);
      },
      "invalid function",
      "Thrown an exception when callback is null");

      iris.on("test", function () {}); // first create test callback array before test iris.off

      raises(function () {
          iris.off("test", new Date());
      },
      "invalid function",
      "Thrown an exception when callback is Date");

      raises(function () {
          iris.off("test", 'function');
      },
      "invalid function",
      "Thrown an exception when callback is 'function'");

      raises(function () {
          iris.off("test", null);
      },
      "invalid function",
      "Thrown an exception when callback is null");
  });
  
  
  function onEvent () {
    window.ok(true, "On event callback");
  }
  
  function onEvent2 () {
    window.ok(true, "On event2 callback");
  }

  // Test component event functions

  module('Module Event in Components', {
      setup: function() {
          iris.notify("iris-reset");
          iris.path = {
              welcome : "test/event/welcome.js",
              welcome_tmpl : "test/event/welcome.html"
          };
      },
      teardown: function () {
          clearBody();
      }
  });

  asyncTest("Execute self.on event defined whitin screen", function() {
    
    expect(1);

    iris.welcome(iris.path.welcome);

    iris.on(iris.AFTER_NAVIGATION, function () {
      iris.off(iris.AFTER_NAVIGATION);
      iris.notify('test-event');

      start();
    });
  });

  asyncTest("Execute self.off event defined within screen", function() {
    
    expect(1);

    iris.welcome(iris.path.welcome);

    iris.on(iris.AFTER_NAVIGATION, function () {
      iris.off(iris.AFTER_NAVIGATION);
      iris.notify('remove-test-event');

      start();
    });
  });

  asyncTest("Execute self.off event (without callback) defined within screen", function() {
    
    expect(1);

    iris.welcome(iris.path.welcome);

    iris.on(iris.AFTER_NAVIGATION, function () {
      iris.off(iris.AFTER_NAVIGATION);
      iris.notify('remove-all-test-event');

      start();
    });
  });

}(jQuery));