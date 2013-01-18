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

    function clearBody() {
        var irisGeneratedCode = $("#start_iris").nextAll();
        if (irisGeneratedCode !== undefined) {
            irisGeneratedCode.remove();
        }
    }
    
    module( "Module Bad Practices", {
        setup: function() {
            iris.notify("iris-reset");
        },teardown: function () {
            clearBody();
        }
    });
    
    test("Check if iris prevents multiple calls to the method iris.welcome()", function() {
        iris.welcome("test/bad_practices/welcome.js");

        expect(1);
        
        raises(function () {
            iris.welcome("test/bad_practices/welcome.js");
        }, "Thrown an exception when we recall to the iris.welcome() method");

    });
    
    test("Bad p_screens format in iris.screens method", function() {
        window.raises(function () {
            iris.welcome("test/bad_practices/welcome2.js");
        }, "Thrown an exception when We use the old format");


        iris.notify("iris-reset");
        window.raises(function () {
            iris.welcome("test/bad_practices/welcome3.js");
        }, "Thrown an exception when We use array of Strings");


        iris.notify("iris-reset");
        window.raises(function () {
            iris.welcome("test/bad_practices/welcome4.js");
        }, "Thrown an exception when We use bad hash format");


        iris.notify("iris-reset");
        try {
            iris.welcome("test/bad_practices/welcome5.js");
            window.ok(true, "Correct format");
        } catch (err) {
            window.ok(false, "Incorrect format."); 
        }
    });
    
    test("Check if iris prevents multiple calls to the self.screens() method", function() {
        
        iris.welcome("test/bad_practices/welcome_screens_calls.js");

    });
    
    test("Check it is impossible to register twice the same Hash-URL", function() {

        raises(function () {
            iris.welcome("test/bad_practices/welcome_same_jsurl.js");
        }, "The screens has the same file js URL");

    });

    test("Check if iris raises an exception when two Screens have the same #hash", function() {
        
        window.raises(function () {
            iris.welcome("test/bad_practices/welcome8.js");
        }, "Thrown an exception when two Screens have the same #hash");

    });
    
    test("Check if iris prevents multiple calls to the self.tmpl() method", function() {

        window.raises(function () {
            iris.welcome("test/bad_practices/welcome11.js");
        }, "Thrown an exception when multiple calls happen");

    });
    
    test("Check iris prevents reuse a screen container for a UI", function() {

        iris.welcome("test/bad_practices/welcome_reuse_screen_container.js");
    });

}(jQuery));