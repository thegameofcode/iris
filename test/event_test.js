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
          window.resetIris();
          iris.enableLog(false);
          iris.events('test-event', 'event-type-1', 'event-type-2', 'duplicated-event', 'off-all-functions', 'test', 'silent');
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
  
  test("notifyOff/notiffyOn Test", function () {
      expect(4);

      iris.on("silent", onEvent);
      iris.on("silent", onEvent2);

      iris.notify("silent"); // +2

      iris.notifyOff();

      iris.notify("silent"); // 0

      iris.notifyOn();

      iris.notify("silent"); // +2
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
          window.resetIris();
          iris.path = {
              welcome : "test/event/welcome.js",
              welcome_tmpl : "test/event/welcome.html"
          };
          iris.enableLog(false);
          iris.events('test-event', 'remove-test-event', 'remove-all-test-event', 'remove-all-test-event-then-add-event');
      },
      teardown: function () {
          clearBody();
      }
  });

  asyncTest("Execute iris.once", function() {
    
    expect(1);

    iris.events('test-event-for-once');
    
    iris.once('test-event-for-once', function () {
      window.ok(true, 'Once event listener');
    });

    iris.notify('test-event-for-once'); // +1
    iris.notify('test-event-for-once'); // 0
    iris.notify('test-event-for-once'); // 0

    start();
  });

  asyncTest("Execute iris.once with params", function() {
    
    expect(4);

    var p = {example: 'test', num: 5};

    iris.events('test-event-for-once');
    
    iris.once('test-event-for-once', function (params) {
      window.ok(true, 'Once event listener');
      window.ok(params, 'Checking parameter');
      window.equal(params.example, p.example, 'Checking parameter value');
      window.equal(params.num, p.num, 'Checking parameter value');
    });

    iris.notify('test-event-for-once', p); // +3
    iris.notify('test-event-for-once', p); // 0
    iris.notify('test-event-for-once', p); // 0

    start();
  });

  asyncTest("Execute self.on event defined whitin screen", function() {
    
    expect(1);

    iris.welcome(iris.path.welcome);

    iris.once(iris.AFTER_NAVIGATION, function () {
      iris.notify('test-event');

      start();
    });
  });

  asyncTest("Execute self.off event defined within screen", function() {
    
    expect(1);

    iris.welcome(iris.path.welcome);

    iris.once(iris.AFTER_NAVIGATION, function () {
      iris.notify('remove-test-event');

      start();
    });
  });

  asyncTest("Execute self.off event (without callback) defined within screen", function() {
    
    expect(1);

    iris.welcome(iris.path.welcome);

    iris.once(iris.AFTER_NAVIGATION, function () {
      iris.notify('remove-all-test-event');

      start();
    });
  });

  asyncTest("Execute self.off event and then self.on on the same event defined within screen", function() {
    
    expect(2);

    iris.welcome(iris.path.welcome);

    iris.once(iris.AFTER_NAVIGATION, function () {
      iris.notify('remove-all-test-event-then-add-event');

      start();
    });
  });

}(jQuery));