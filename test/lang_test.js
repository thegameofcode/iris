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

  module('Module Lang', {
      setup: function() {
          iris.notify("iris-reset");
      },
      teardown: function () {
          clearBody();
      }
  });

  function clearBody() {
      var irisGeneratedCode = $("#start_iris").nextAll();
      if (irisGeneratedCode !== undefined) {
          irisGeneratedCode.remove();
      }
  }


  test("Lang Test", function() {

    iris.translations("es_ES", {
      TEST: {
        LABEL: "VALUE"
      }
    });
    
    iris.translations("en_US", {
      TEST: {
        LABEL: "VALUE2"
      }
    });

    iris.locale("es_ES");

    var translated = iris.translate("TEST.LABEL");
    strictEqual(translated, "VALUE", "Should get a lang value");
    
    translated = iris.translate("TEST.LABEL", "en_US");
    strictEqual(translated, "VALUE2", "Should get a lang value in non default locale");

    iris.locale("locale_not_loaded");
    translated = iris.translate("TEST.LABEL");
    strictEqual(translated, "??TEST.LABEL??", "Should get a non created value");

  });
  
  asyncTest("Lang Load Relative URL Test", function() {
    expect(3);

    iris.translations("fr-FR", "./resource/lang.json", {"success" : onSuccess, "error" : onError });
  });

  asyncTest("Lang Load Absolute URL Test", function() {
    expect(3);

    iris.translations("fr-FR2", "http://localhost:8080/test/resource/lang.json", {"success" : onSuccess, "error" : onError });
  });
  
  asyncTest("Lang Load Relative URL Test", function() {
    expect(3);

    iris.translations("fr-FR3", "./resource/lang.json", {"success" : onSuccess, "error" : onError });
  });

  function onSuccess (locale) {
      
    iris.locale(locale);
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