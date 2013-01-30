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
    
    
    module( "UI replacement", {
        setup: function() {
            clearBody();
            iris.notify("iris-reset");
            iris.path = {
              welcome : "test/ui_replacement/welcome.js",
              welcome_tmpl : "test/ui_replacement/welcome.html",
              main : "test/ui_replacement/main.js",
              main_tmpl : "test/ui_replacement/main.html",
              my_ui : "test/ui_replacement/my_ui.js",
              my_ui_tmpl : "test/ui_replacement/my_ui.html",
              my_ui2 : "test/ui_replacement/my_ui2.js",
              my_ui2_tmpl : "test/ui_replacement/my_ui2.html"
            };
        },
        teardown: function () {
        }
    });
    
    asyncTest("Test Create my_ui", function() {        
        window.expect(4);
        iris.welcome(iris.path.welcome);

        iris.on(iris.AFTER_NAVIGATION, function () {
            iris.off(iris.AFTER_NAVIGATION);

            iris.navigate("#/main");
        });
    }
    );
    

}(jQuery));