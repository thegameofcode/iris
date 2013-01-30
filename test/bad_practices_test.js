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
            iris.path = {
                welcome : "test/bad_practices/welcome.js",
                welcome_tmpl : "test/bad_practices/welcome.html",
                welcome_calls_tmpl : "test/bad_practices/welcome_calls_tmpl.js",
                welcome_format : "test/bad_practices/welcome_format.js",
                welcome_screens_calls : "test/bad_practices/welcome_screens_calls.js",
                welcome_same_jsurl : "test/bad_practices/welcome_same_jsurl.js",
                welcome_same_hash : "test/bad_practices/welcome_same_hash.js",
                welcome_reuse_screen_container : "test/bad_practices/welcome_reuse_screen_container.js",
                my_ui : "test/bad_practices/my_ui.js",
                my_ui_tmpl : "test/bad_practices/my_ui.html"
            };
        },teardown: function () {
            clearBody();
        }
    });
    
    asyncTest("Check if iris prevents multiple calls to the method iris.welcome()", function() {
        iris.welcome(iris.path.welcome);

        expect(1);
        
        raises(function () {
            iris.welcome(iris.path.welcome);
        }, "Thrown an exception when we recall to the iris.welcome() method");

    });
    
    asyncTest("Bad p_screens format in iris.screens method", function() {

        expect(1);
        
        iris.welcome(iris.path.welcome_format);
        
    });
    
    asyncTest("Check if iris prevents multiple calls to the self.screens() method", function() {
        
        expect(1);
        iris.welcome(iris.path.welcome_screens_calls);

    });
    
    asyncTest("Check it is impossible to register twice the same Hash-URL", function() {

        
        expect(1);
        iris.welcome(iris.path.welcome_same_jsurl);

    });

    asyncTest("Check if iris raises an exception when two Screens have the same #hash", function() {
        
        expect(1);
        iris.welcome(iris.path.welcome_same_hash);
        

    });
    
    asyncTest("Check if iris prevents multiple calls to the self.tmpl() method", function() {

        expect(1);
        iris.welcome(iris.path.welcome_calls_tmpl);
        

    });
    
    asyncTest("Check iris prevents reuse a screen container for a UI", function() {

        expect(1);
        iris.welcome(iris.path.welcome_reuse_screen_container);
    });

}(jQuery));