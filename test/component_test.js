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

    module('Module Component', {
        setup: function() {
            console.log("***************");
            iris.init();
        },
        teardown: function () {
            clearBody();
            console.log("***************");
        }
    });

    asyncTest("Include JS", function() {
        expect(1);

        iris.include("test/component/include_test.js");

    });

    asyncTest("Welcome Screen", function() {

        expect(4);

        iris.welcome("test/component/welcome.js");

    });

    asyncTest("Navigate To Screen", function() {
    
        expect(7);
    
        iris.welcome("test/component/welcome.js"); // + 4
        iris.navigate("#screen"); // +3

    });

    asyncTest("Create UI", function() {

        expect(11);

        iris.welcome("test/component/welcome.js"); // + 4
        iris.navigate("#screen"); // +3

        iris.notify("create_ui"); // + 4
    
    });

    asyncTest("UI Settings", function() {

        expect(10);

        iris.welcome("test/component/welcome.js"); // + 4
        iris.navigate("#screen"); // +3

        stop();

        iris.notify("ui_settings"); // +3
    });

    asyncTest("Nested UI", function() {

        expect(13);

        iris.welcome("test/component/welcome.js"); // + 4
        iris.navigate("#screen"); // +3

        iris.notify("nested_ui"); // 3 creation + 3 nested callback
    });


    asyncTest("Destroy UI", function() {
    
        expect(8);

        iris.welcome("test/component/welcome.js"); // + 4
        iris.navigate("#screen"); // +3

        iris.notify("destroy_ui"); // +1
    });

    asyncTest("Template Params", function() {

        expect(8);

        iris.welcome("test/component/welcome.js"); // + 4
        iris.navigate("#screen"); // +3

        iris.notify("template_params"); // +1
    });

    asyncTest("Template Lang Values", function() {

        expect(8);

        iris.welcome("test/component/welcome.js"); // + 4
        iris.navigate("#screen"); // +3

        iris.notify("template_langs"); // +1
    });

    asyncTest("Destroy Screen", function() {

        expect(8);

        iris.welcome("test/component/welcome.js"); // + 4
        iris.navigate("#screen"); // +3
        
        window.throws(function() {
            iris.destroyScreen("#screen");
        },"Fail. It is impossible remove the current screen.");

        window.start();
    });

}(jQuery));