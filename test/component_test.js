/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/
(function($) {

  var iris = window.iris;

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


  asyncTest("Create & Navigate To Screen", function() {
    
    expect(7);

    iris.welcome("test/component/welcome.js");

    iris.goto("#screen");

  });

  asyncTest("Create UI", function() {
    expect(4);

    iris.notify("create_ui");
  });

  asyncTest("Destroy UI", function() {
    expect(1);

    iris.notify("destroy_ui");
  });

  asyncTest("Destroy Screen", function() {
    expect(1);

    iris.destroyScreen("#screen");
  });

}(jQuery));