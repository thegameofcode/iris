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

  iris.cache(false);

  module('Module Component');

  asyncTest("Include JS", function() {

    // for lang values test
    iris.translations("test",{"TEST":"lang_val"});
    iris.locale("test");

    expect(1);

    iris.include("test/component/include_test.js");

  });

  asyncTest("Welcome Screen", function() {

    expect(4);

    iris.welcome("test/component/welcome.js");

  });

  asyncTest("Navigate To Screen", function() {
    
    expect(3);

    iris.goto("#screen");

  });

  asyncTest("Create UI", function() {

    expect(4);
    iris.notify("create_ui");
    
  });

  asyncTest("UI Settings", function() {

    expect(3);
    iris.notify("ui_settings");
  });

  asyncTest("Nested UI", function() {

    expect(6); // 3 creation + 3 nested callback
    iris.notify("nested_ui");
  });


  asyncTest("Destroy UI", function() {
    
    expect(1);

    iris.notify("destroy_ui");
  });

  asyncTest("Template Params", function() {

    expect(1);
    iris.notify("template_params");
  });

  asyncTest("Template Lang Values", function() {

    expect(1);
    iris.notify("template_langs");
  });

  asyncTest("Destroy Screen", function() {

    expect(1);
    iris.destroyScreen("#screen");
  });

}(jQuery));