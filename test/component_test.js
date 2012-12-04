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

  test("Include JS", function() {
    stop();

    // for lang values test
    iris.translations("test",{"TEST":"lang_val"});
    iris.locale("test");

    expect(1);

    iris.include("test/component/include_test.js");

  });

  test("Welcome Screen", function() {
    stop();

    expect(4);

    iris.welcome("test/component/welcome.js");

  });

  test("Create & Navigate To Screen", function() {
    stop();
    
    expect(3);

    iris.goto("#screen");

  });

  test("Create UI", function() {
    stop();

    expect(4);

    iris.notify("create_ui");
  });

  test("Destroy UI", function() {
    stop();

    expect(1);

    iris.notify("destroy_ui");
  });

  test("Template Params", function() {
    stop();

    expect(1);
    iris.notify("template_params");
  });

  test("Template Lang Values", function() {
    stop();

    expect(1);
    iris.notify("template_langs");
  });

  test("Destroy Screen", function() {
    stop();

    expect(1);
    iris.destroyScreen("#screen");
  });

}(jQuery));