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
      
      throws(block, [expected], [message])
      http://api.qunitjs.com/throws/
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
            iris.notify("iris-reset");
            iris.path = {
                welcome : "test/component/welcome.js",
                welcome_tmpl : "test/component/welcome.html",
                ui_replace : "test/component/ui_replace.js",
                ui_replace_tmpl : "test/component/ui_replace.html",
                ui : "test/component/ui.js",
                ui_tmpl : "test/component/ui.html",
                ui_repeated_dataid : "test/component/ui_repeated_dataid.js",
                ui_repeated_dataid_tmpl : "test/component/ui_repeated_dataid.html",
                screen : "test/component/screen.js",
                screen_tmpl : "test/component/screen.html",
                datajq : "test/component/datajq.js",
                datajq_tmpl : "test/component/datajq.html"
            };
        },
        teardown: function () {
            clearBody();
        }
    });

    asyncTest("Register An Invalid Screen", function() {

        expect(5);

        var mockedScreen = function() {};

        raises(function () {
            iris.screen(mockedScreen, undefined);
        }, "Invalid path on screen registration");

        raises(function () {
            iris.screen(mockedScreen, null);
        }, "Invalid path on screen registration");

        raises(function () {
            iris.screen(mockedScreen, "");
        }, "Invalid path on screen registration");

        raises(function () {
            iris.screen(mockedScreen, false);
        }, "Invalid path on screen registration");

        raises(function () {
            iris.screen(mockedScreen, 7);
        }, "Invalid path on screen registration");

        start();

    });

    asyncTest("Register An Invalid UI", function() {

        expect(5);

        var mockedUI = function() {};

        raises(function () {
            iris.ui(mockedUI, undefined);
        }, "Invalid path on ui registration");

        raises(function () {
            iris.ui(mockedUI, null);
        }, "Invalid path on ui registration");

        raises(function () {
            iris.ui(mockedUI, "");
        }, "Invalid path on ui registration");

        raises(function () {
            iris.ui(mockedUI, false);
        }, "Invalid path on ui registration");

        raises(function () {
            iris.ui(mockedUI, 7);
        }, "Invalid path on ui registration");

        start();

    });

    asyncTest("Register An Invalid Resource", function() {

        expect(5);

        var mockedRes = function() {};

        raises(function () {
            iris.resource(mockedRes, undefined);
        }, "Invalid path on resource registration");

        raises(function () {
            iris.resource(mockedRes, null);
        }, "Invalid path on resource registration");

        raises(function () {
            iris.resource(mockedRes, "");
        }, "Invalid path on resource registration");

        raises(function () {
            iris.resource(mockedRes, false);
        }, "Invalid path on resource registration");

        raises(function () {
            iris.resource(mockedRes, 7);
        }, "Invalid path on resource registration");

        start();

    });

    asyncTest("Welcome Screen", function() {

        expect(4);

        iris.welcome("test/component/welcome.js");

        iris.on(iris.AFTER_NAVIGATION, function () {
            start();
        });
    });

    asyncTest("Navigate To An Invalid Screen", function() {
    
        expect(5);
    
        iris.welcome("test/component/welcome.js"); // + 4

        iris.on(iris.AFTER_NAVIGATION, function () {
            iris.off(iris.AFTER_NAVIGATION);

            iris.on(iris.AFTER_NAVIGATION, function () {
                throw "A navigation event has been raises";
            });

            iris.on(iris.SCREEN_NOT_FOUND, function (path) {
                strictEqual(path, "#/invalid_screen_not_exists", "The path is not the same");
                start();
            });

            iris.navigate("#/invalid_screen_not_exists"); // 0
        });

    });

    asyncTest("Navigate To Screen", function() {
    
        expect(7);
    
        iris.welcome("test/component/welcome.js"); // + 4

        iris.on(iris.AFTER_NAVIGATION, function () {
            iris.off(iris.AFTER_NAVIGATION);

            iris.navigate("#/screen"); // +3

            iris.on(iris.AFTER_NAVIGATION, function () {
                start();
            });
        });

    });

    asyncTest("Create UI With Template Mode Append", function() {

        expect(13);

        iris.welcome("test/component/welcome.js"); // + 4

        iris.on(iris.AFTER_NAVIGATION, function () {
            iris.off(iris.AFTER_NAVIGATION);

            // this will make a real async call
            iris.navigate("#/screen"); // +3

            iris.on(iris.AFTER_NAVIGATION, function () {
                iris.notify("create_ui"); // + 4
                iris.notify("get_ui"); // + 2

                start();
            });
        });
    
    });

    asyncTest("Create UI With Template Mode Replace", function() {

        expect(12);

        iris.welcome("test/component/welcome.js"); // + 4

        iris.on(iris.AFTER_NAVIGATION, function () {
            iris.off(iris.AFTER_NAVIGATION);

            // this will make a real async call
            iris.navigate("#/screen"); // +3

            iris.on(iris.AFTER_NAVIGATION, function () {
                iris.notify("create_ui_tmpl_replace"); // + 3
                iris.notify("get_ui_tmpl_replace"); // + 2

                start();
            });
        });
    
    });

    asyncTest("UI Settings", function() {

        expect(14);

        iris.welcome("test/component/welcome.js"); // + 4

        iris.on(iris.AFTER_NAVIGATION, function () {
            iris.off(iris.AFTER_NAVIGATION);
            iris.navigate("#/screen"); // +3

            iris.on(iris.AFTER_NAVIGATION, function () {
                iris.notify("create_ui"); // + 4

                iris.notify("ui_settings"); // +3
                start();
            });
        });

    });

    asyncTest("Nested UI", function() {

        expect(17);

        iris.welcome("test/component/welcome.js"); // + 4

        iris.on(iris.AFTER_NAVIGATION, function () {
            iris.off(iris.AFTER_NAVIGATION);

            iris.navigate("#/screen"); // +3

            iris.on(iris.AFTER_NAVIGATION, function () {
                iris.notify("create_ui"); // + 4

                iris.notify("nested_ui"); // 3 creation + 3 nested callback
                start();
            });
        });
    });


    asyncTest("Destroy UI", function() {
    
        expect(25);

        iris.welcome("test/component/welcome.js"); // + 4

        iris.on(iris.AFTER_NAVIGATION, function () {
            iris.off(iris.AFTER_NAVIGATION);

            iris.navigate("#/screen"); // +3

            iris.on(iris.AFTER_NAVIGATION, function () {
                iris.notify("create_ui"); // + 4

                iris.notify("destroy_ui"); // +2
                start();
            });
        });
    });

    asyncTest("Auto Destroy UI", function() {
    
        expect(12);

        iris.welcome("test/component/welcome.js"); // + 4

        iris.on(iris.AFTER_NAVIGATION, function () {
            iris.off(iris.AFTER_NAVIGATION);

            iris.navigate("#/screen"); // +3

            iris.on(iris.AFTER_NAVIGATION, function () {
                iris.notify("create_ui"); // + 4

                iris.notify("self_destroy_ui");
                iris.notify("destroy_ui_check"); // +1

                start();
            });
        });
    });

    asyncTest("Destroy Multiple UIs", function() {
    
        expect(18);

        iris.welcome("test/component/welcome.js"); // + 4

        iris.on(iris.AFTER_NAVIGATION, function () {
            iris.off(iris.AFTER_NAVIGATION);

            iris.navigate("#/screen"); // +3

            iris.on(iris.AFTER_NAVIGATION, function () {

                iris.notify("destroy_multiple_uis"); // +2

                start();
            });
        });
    });

    asyncTest("Destroy Multiple UIs 2", function() {
    
        expect(19);

        iris.welcome("test/component/welcome.js"); // + 4

        iris.on(iris.AFTER_NAVIGATION, function () {
            iris.off(iris.AFTER_NAVIGATION);

            iris.navigate("#/screen"); // +3

            iris.on(iris.AFTER_NAVIGATION, function () {

                iris.notify("destroy_multiple_uis2"); // +3

                start();
            });
        });
    });

    asyncTest("Destroy UIs of container replaced by an UI", function() {
    
        expect(11);

        iris.welcome("test/component/welcome.js"); // + 4

        iris.navigate("#/screen"); // +3

        iris.on(iris.AFTER_NAVIGATION, function () {
            iris.notify("destroy_ui_replace"); // +1
            start();
        });
    });

    asyncTest("Create UI with same data-id", function() {
    
        expect(8);

        iris.welcome("test/component/welcome.js"); // + 4

        iris.navigate("#/screen"); // +3

        iris.on(iris.AFTER_NAVIGATION, function () {
            iris.notify("ui_repeated_dataid"); // +1
            start();
        });
    });

    asyncTest("Template Params", function() {

        expect(8);

        iris.welcome("test/component/welcome.js"); // + 4

        iris.on(iris.AFTER_NAVIGATION, function () {
            iris.off(iris.AFTER_NAVIGATION);

            iris.navigate("#/screen"); // +3

            iris.on(iris.AFTER_NAVIGATION, function () {

                iris.notify("template_params"); // +1
                start();
            });
        });
    });

    asyncTest("Template Lang Values", function() {

        expect(8);

        iris.welcome("test/component/welcome.js"); // + 4

        iris.on(iris.AFTER_NAVIGATION, function () {
            iris.off(iris.AFTER_NAVIGATION);

            iris.navigate("#/screen"); // +3

            iris.on(iris.AFTER_NAVIGATION, function () {
                iris.notify("template_langs"); // +1
                start();
            });
        });
    });

    asyncTest("Destroy Screen", function() {

        expect(8);

        iris.welcome("test/component/welcome.js"); // + 4

        iris.on(iris.AFTER_NAVIGATION, function () {
            iris.off(iris.AFTER_NAVIGATION);
            
            iris.navigate("#/screen"); // +3

            iris.on(iris.AFTER_NAVIGATION, function () {
            
                window.throws(function() {
                    iris.destroyScreen("#/screen");
                },"Fail. It is impossible remove the current screen.");

                start();
            });
        });
    });

    asyncTest("Test data-jq-*", function() {
        iris.welcome(iris.path.datajq);
    });

    asyncTest("Test include", function() {
        window.expect(1);

        iris.include(["test/component/resource.js"], function () {
  
          iris.resource("test/component/resource.js").test();

        });
    
    });

    asyncTest("Test include with absolute path", function() {
        window.expect(1);

        iris.include(["http://localhost:8080/test/component/resource.js"], function () {
  
          iris.resource("test/component/resource.js").test();

        });
    
    });

}(jQuery));