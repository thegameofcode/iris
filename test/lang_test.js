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


  test("Lang Test", function() {

    iris.translations("es-ES", {
      TEST: {
        LABEL: "VALUE"
      }
    });

    iris.locale("es-ES");

    var translated = iris.translate("TEST.LABEL");
    strictEqual(translated, "VALUE", "Should get a lang value");

    iris.locale("en-US");
    translated = iris.translate("TEST.LABEL");
    strictEqual(translated, "??TEST.LABEL??", "Should get a non created value");

  });

  asyncTest("Lang Load Test", function() {
    expect(3);

    iris.translations("fr-FR", "/test/service/lang.json", {"success" : onSuccess, "error" : onError });
  });

  function onSuccess () {

    iris.locale("fr-FR");
    var translated = iris.translate("LANG-TEST");
    strictEqual(translated, "LANG-TEST-VALUE", "Should get a lang value");

    translated = iris.translate("TITLE");
    strictEqual(translated, "TITLE-VALUE", "Should get a lang value");

    translated = iris.translate("NO_EXISTS");
    strictEqual(translated, "??NO_EXISTS??", "Should get a lang value");    

    start();
  }

  function onError () {
    ok(false, "Error callback unexpected");
    start();
  }

}(jQuery));