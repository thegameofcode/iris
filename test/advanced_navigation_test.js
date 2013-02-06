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

    module('Module Advanced Navigation', {
        setup: function() {
            window.navigations = [];
            iris.path = {
                welcome : "test/advanced_navigation/welcome.js",
                screen1 : "test/advanced_navigation/screen1.js",
                screen1_1 : "test/advanced_navigation/screen1_1.js",
                screen1_1_1 : "test/advanced_navigation/screen1_1_1.js",
                screen1_2 : "test/advanced_navigation/screen1_2.js",
                screen2 : "test/advanced_navigation/screen2.js",
                screen2_1 : "test/advanced_navigation/screen2_1.js",
                screen2_2 : "test/advanced_navigation/screen2_2.js",
                ui : "test/advanced_navigation/ui.js",
                ui_tmpl : "test/advanced_navigation/ui.html",
                empty_tmpl : "test/advanced_navigation/empty.html"
            };
        },
        teardown: function () {
            iris.notify("iris-reset");
            clearBody();
        }
    });

    asyncTest("Navigate and do new navigate", function() {

        expect(7);

        iris.welcome(iris.path.welcome); // +1 create, +1 awake
        iris.navigate("#/screen1/screen1_1"); // +2 create, +2 awake

        iris.on(iris.AFTER_NAVIGATION, function () {
            iris.off(iris.AFTER_NAVIGATION);

            strictEqual(window.navigations.join(","), "[create] #,[awake] #,[create] #/screen1,[awake] #/screen1,[create] #/screen1/screen1_1,[awake] #/screen1/screen1_1", "The navigation map is correct"); // +1

            start();
        });
    
    });

    asyncTest("Multiple calls to iris.navigate", function() {

        expect(7);

        iris.welcome(iris.path.welcome); // +1 create, +1 awake
        iris.navigate("#/screen2");
        iris.navigate("#/screen1/screen1_1"); // +2 create, +2 awake

        iris.on(iris.AFTER_NAVIGATION, function () {
            iris.off(iris.AFTER_NAVIGATION);

            strictEqual(window.navigations.join(","), "[create] #,[awake] #,[create] #/screen1,[awake] #/screen1,[create] #/screen1/screen1_1,[awake] #/screen1/screen1_1", "The navigation map is correct"); // +1

            start();
        });
    
    });

    asyncTest("Navigate to a screen at level 1", function() {

        expect(5);

        iris.welcome(iris.path.welcome); // +1 create, +1 awake

        iris.on(iris.AFTER_NAVIGATION, function () {
            iris.off(iris.AFTER_NAVIGATION);

            // this will make an async call
            iris.navigate("#/screen1"); // +1 create, +1 awake

            iris.on(iris.AFTER_NAVIGATION, function () {
                
                strictEqual(window.navigations.join(","), "[create] #,[awake] #,[create] #/screen1,[awake] #/screen1", "The navigation map is correct"); // +1

                start();
            });
        });
    
    });

    asyncTest("Navigate to a screen at level 2", function() {

        expect(7);

        iris.welcome(iris.path.welcome); // +1 create, +1 awake

        iris.on(iris.AFTER_NAVIGATION, function () {
            iris.off(iris.AFTER_NAVIGATION);

            var navigationHash = "#/screen1/screen1_1";

            // this will make an async call
            iris.navigate(navigationHash); // +2 create, +2 awake

            iris.on(iris.AFTER_NAVIGATION, function () {

                if ( document.location.hash === navigationHash ) {
                    strictEqual(window.navigations.join(","), "[create] #,[awake] #,[create] #/screen1,[awake] #/screen1,[create] #/screen1/screen1_1,[awake] #/screen1/screen1_1", "The navigation map is correct"); // +1
                    start();
                }

            });
        });

    });

    asyncTest("Navigate to a screen at level 3", function() {

        expect(9);

        iris.welcome(iris.path.welcome); // +1 create, +1 awake

        iris.on(iris.AFTER_NAVIGATION, function () {
            iris.off(iris.AFTER_NAVIGATION);

            var navigationHash = "#/screen1/screen1_1/screen1_1_1";

            // this will make an async call
            iris.navigate(navigationHash); // +3 create, +3 awake

            iris.on(iris.AFTER_NAVIGATION, function () {
                if ( document.location.hash === navigationHash ) {
                    strictEqual(window.navigations.join(","), "[create] #,[awake] #,[create] #/screen1,[awake] #/screen1,[create] #/screen1/screen1_1,[awake] #/screen1/screen1_1,[create] #/screen1/screen1_1/screen1_1_1,[awake] #/screen1/screen1_1/screen1_1_1", "The navigation map is correct"); // +1
                    start();
                }

            });
        });

    });

    asyncTest("Navigate to a screen at level 3 and do history back", function() {

        expect(15);

        iris.welcome(iris.path.welcome); // +1 create, +1 awake

        iris.on(iris.AFTER_NAVIGATION, function () {
            iris.off(iris.AFTER_NAVIGATION);

            var navigationHash = "#/screen1/screen1_1/screen1_1_1";

            // this will make an async call
            iris.navigate(navigationHash); // +3 create, +3 awake

            iris.on(iris.AFTER_NAVIGATION, function () {

                if ( document.location.hash === navigationHash ) {
                    window.history.back(); // return to #, then +3 of canSleep, +3 sleep
                } else if ( document.location.hash === "" || document.location.hash === "#" ) {
                    // +1
                    strictEqual(window.navigations.join(","), "[create] #,[awake] #,[create] #/screen1,[awake] #/screen1,[create] #/screen1/screen1_1,[awake] #/screen1/screen1_1,[create] #/screen1/screen1_1/screen1_1_1,[awake] #/screen1/screen1_1/screen1_1_1,[canSleep] #/screen1/screen1_1/screen1_1_1,[canSleep] #/screen1/screen1_1,[canSleep] #/screen1,[sleep] #/screen1/screen1_1/screen1_1_1,[sleep] #/screen1/screen1_1,[sleep] #/screen1", "The navigation map is correct");
                    start();
                }

            });
        });

    });

    asyncTest("Navigate to a screen at level 3 and do history back but one screen cannot sleep", function() {
        expect(12);

        iris.welcome(iris.path.welcome); // +1 create, +1 awake

        iris.on(iris.AFTER_NAVIGATION, function () {
            iris.off(iris.AFTER_NAVIGATION);

            var navigationHash = "#/screen1/screen1_1?canSleep=false/screen1_1_1";

            // this will make an async call
            iris.navigate(navigationHash); // +3 create, +3 awake

            
            iris.on(iris.AFTER_NAVIGATION, function () {

                iris.off(iris.AFTER_NAVIGATION);

                iris.on(iris.AFTER_NAVIGATION, function () {
                    strictEqual(document.location.hash, navigationHash, "Correct hash map"); // +1
                    strictEqual(window.navigations.join(","), "[create] #,[awake] #,[create] #/screen1,[awake] #/screen1,[create] #/screen1/screen1_1,[awake] #/screen1/screen1_1,[create] #/screen1/screen1_1/screen1_1_1,[awake] #/screen1/screen1_1/screen1_1_1,[canSleep] #/screen1/screen1_1/screen1_1_1,[canSleep] #/screen1/screen1_1", "The navigation map is correct");
                    start();
                });

                // async call
                window.history.back(); // return to #, then +3 of canSleep, +3 sleep, +1 awake #
            });
        });

    });

    asyncTest("Navigate to a screen at level 3 and go to other branch at level 1", function() {
        expect(18);

        iris.welcome(iris.path.welcome); // +1 create, +1 awake

        iris.on(iris.AFTER_NAVIGATION, function () {
            iris.off(iris.AFTER_NAVIGATION);

            var navigationHash = "#/screen1/screen1_1/screen1_1_1";

            // this will make an async call
            iris.navigate(navigationHash); // +3 create, +3 awake

            iris.on(iris.AFTER_NAVIGATION, function () {
                iris.off(iris.AFTER_NAVIGATION);


                // async
                navigationHash = "#/screen2";
                iris.navigate(navigationHash);

                iris.on(iris.AFTER_NAVIGATION, function () {

                    strictEqual(navigationHash, document.location.hash, "The final hash is right"); // +1
                    strictEqual(window.navigations.join(","), "[create] #,[awake] #,[create] #/screen1,[awake] #/screen1,[create] #/screen1/screen1_1,[awake] #/screen1/screen1_1,[create] #/screen1/screen1_1/screen1_1_1,[awake] #/screen1/screen1_1/screen1_1_1,[canSleep] #/screen1/screen1_1/screen1_1_1,[canSleep] #/screen1/screen1_1,[canSleep] #/screen1,[sleep] #/screen1/screen1_1/screen1_1_1,[sleep] #/screen1/screen1_1,[sleep] #/screen1,[create] #/screen2,[awake] #/screen2", "The navigation map is correct"); // +1

                    start();
                });

            });
        });

    });

    asyncTest("Navigate to a screen at level 1 and go to other branch at the same level and check awake & sleep of children", function() {
        expect(22);

        iris.welcome(iris.path.welcome); // +1 create, +1 awake

        iris.on(iris.AFTER_NAVIGATION, function () {
            iris.off(iris.AFTER_NAVIGATION);

            var navigationHash = "#/screen2/screen2_1";

            // this will make an async call
            iris.navigate(navigationHash); // +3 create, +3 awake, +2 create-ui, +2 awake-ui

            iris.on(iris.AFTER_NAVIGATION, function () {

                iris.off(iris.AFTER_NAVIGATION);

                navigationHash = "#/screen2/screen2_2";
                iris.navigate(navigationHash); // +2 canSleep, +2 sleep-ui, +1 sleep, +1 create +1 awake

                iris.on(iris.AFTER_NAVIGATION, function () {

                    iris.off(iris.AFTER_NAVIGATION);

                    iris.on(iris.AFTER_NAVIGATION, function () {
                        strictEqual(window.navigations.join(","), "[create] #,[awake] #,[create] #/screen2,[awake] #/screen2,[create] #/screen2/screen2_1,[create-ui] screens_ createOtherUI=true,[create-ui] screens_ createOtherUI=false,[awake-ui] screens_ createOtherUI=false,[awake-ui] screens_ createOtherUI=true,[awake] #/screen2/screen2_1,[canSleep] #/screen2/screen2_1,[sleep-ui] screens_ createOtherUI=false,[sleep-ui] screens_ createOtherUI=true,[sleep] #/screen2/screen2_1,[create] #/screen2/screen2_2,[awake] #/screen2/screen2_2,[canSleep] #/screen2/screen2_2,[sleep] #/screen2/screen2_2,[awake] #/screen2/screen2_1,[awake-ui] screens_ createOtherUI=true,[awake-ui] screens_ createOtherUI=false", "Final Navigation map right");
                        start();
                    });

                    navigationHash = "#/screen2/screen2_1";
                    // async
                    iris.navigate(navigationHash); // +1 sleep, +3 awakes

                });
                
            });
        });
    });

    asyncTest("Create welcome screen and navigate to it passing parameters", function() {

        expect(5);

        iris.welcome(iris.path.welcome); // +1 create, +1 awake

        iris.on(iris.AFTER_NAVIGATION, function () {
            iris.off(iris.AFTER_NAVIGATION);

            iris.navigate("#?param=value&param2=value2"); // +1 awake, +1 params

            iris.on(iris.AFTER_NAVIGATION, function () {
                iris.off(iris.AFTER_NAVIGATION);

                strictEqual(window.navigations.join(","), "[create] #,[awake] #,[awake] #,[params] # param[value] param2[value2]", "The navigation map is correct"); // +1
                start();
            });
        });

    });

    asyncTest("Navigate to a screen at level 1 with params", function() {

        expect(6);

        iris.welcome(iris.path.welcome); // +1 create, +1 awake

        iris.on(iris.AFTER_NAVIGATION, function () {
            iris.off(iris.AFTER_NAVIGATION);

            // this will make an async call
            iris.navigate("#/screen1?param=value&param2=value2"); // +1 create, +1 awake, +1 param

            iris.on(iris.AFTER_NAVIGATION, function () {
                iris.off(iris.AFTER_NAVIGATION);
                
                strictEqual(window.navigations.join(","), "[create] #,[awake] #,[create] #/screen1,[awake] #/screen1,[params] #/screen1 param[value] param2[value2]", "The navigation map is correct"); // +1

                start();
            });
        });
    
    });

    asyncTest("Navigate to a screen at level 2, all screens receives parameters", function() {

        expect(11);

        iris.welcome(iris.path.welcome); // +1 create, +1 awake

        iris.on(iris.AFTER_NAVIGATION, function () {
            iris.off(iris.AFTER_NAVIGATION);

            // this will make an async call
            iris.navigate("#?param=valueWelcome&param2=valueWelcome-2/screen1?param=valueS1&param2=valueS1-2/screen1_1?param=valueS1_1&param2=valueS1_1-2"); // +2 create, +3 awake, +3 param

            iris.on(iris.AFTER_NAVIGATION, function () {
                iris.off(iris.AFTER_NAVIGATION);
                
                strictEqual(window.navigations.join(","), "[create] #,[awake] #,[awake] #,[params] # param[valueWelcome] param2[valueWelcome-2],[create] #/screen1,[awake] #/screen1,[params] #/screen1 param[valueS1] param2[valueS1-2],[create] #/screen1/screen1_1,[awake] #/screen1/screen1_1,[params] #/screen1/screen1_1 param[valueS1_1] param2[valueS1_1-2]", "The navigation map is correct"); // +1

                start();
            });
        });
    
    });

    asyncTest("Navigate to a screen at level 2 and navigate to its parent at level 1", function() {

        expect(9);

        iris.welcome(iris.path.welcome); // +1 create, +1 awake

        iris.on(iris.AFTER_NAVIGATION, function () {
            iris.off(iris.AFTER_NAVIGATION);

            iris.navigate("#/screen1/screen1_1"); // +2 create, +2 awake

            iris.on(iris.AFTER_NAVIGATION, function () {
                iris.off(iris.AFTER_NAVIGATION);

                iris.navigate("#/screen1"); // +1 cansleep, +1 sleep

                iris.on(iris.AFTER_NAVIGATION, function () {
                    iris.off(iris.AFTER_NAVIGATION);

                    strictEqual(window.navigations.join(","), "[create] #,[awake] #,[create] #/screen1,[awake] #/screen1,[create] #/screen1/screen1_1,[awake] #/screen1/screen1_1,[canSleep] #/screen1/screen1_1,[sleep] #/screen1/screen1_1", "The navigation map is correct"); // +1
                    start();
                });
            });
        });
    });

    asyncTest("Navigate to a screen at level 2 and navigate to its parent at level 1 and finally return to the screen at level 2", function() {

        expect(10);

        iris.welcome(iris.path.welcome); // +1 create, +1 awake

        iris.on(iris.AFTER_NAVIGATION, function () {
            iris.off(iris.AFTER_NAVIGATION);

            iris.navigate("#/screen1/screen1_1"); // +2 create, +2 awake

            iris.on(iris.AFTER_NAVIGATION, function () {
                iris.off(iris.AFTER_NAVIGATION);

                iris.navigate("#/screen1"); // +1 cansleep, +1 sleep

                iris.on(iris.AFTER_NAVIGATION, function () {
                    iris.off(iris.AFTER_NAVIGATION);

                    iris.navigate("#/screen1/screen1_1"); // +1 awake

                    iris.on(iris.AFTER_NAVIGATION, function () {
                        iris.off(iris.AFTER_NAVIGATION);

                        strictEqual(window.navigations.join(","), "[create] #,[awake] #,[create] #/screen1,[awake] #/screen1,[create] #/screen1/screen1_1,[awake] #/screen1/screen1_1,[canSleep] #/screen1/screen1_1,[sleep] #/screen1/screen1_1,[awake] #/screen1/screen1_1", "The navigation map is correct"); // +1
                        start();

                    });
                });
            });
        });
    });

    asyncTest("Navigate to a screen at level 3, then navigate to welcome screen and finally destroy the screen at level 1", function() {

        expect(18);

        iris.welcome(iris.path.welcome); // +1 create, +1 awake

        iris.on(iris.AFTER_NAVIGATION, function () {
            iris.off(iris.AFTER_NAVIGATION);

            var navigationHash = "#/screen1/screen1_1/screen1_1_1";

            // this will make an async call
            iris.navigate(navigationHash); // +3 create, +3 awake

            iris.on(iris.AFTER_NAVIGATION, function () {
                iris.off(iris.AFTER_NAVIGATION);

                // async
                navigationHash = "#";
                iris.navigate(navigationHash); // +3 cansleep, +3 sleep

                iris.on(iris.AFTER_NAVIGATION, function () {

                    iris.destroyScreen("#/screen1"); // +3 destroy
                    strictEqual(window.navigations.join(","), "[create] #,[awake] #,[create] #/screen1,[awake] #/screen1,[create] #/screen1/screen1_1,[awake] #/screen1/screen1_1,[create] #/screen1/screen1_1/screen1_1_1,[awake] #/screen1/screen1_1/screen1_1_1,[canSleep] #/screen1/screen1_1/screen1_1_1,[canSleep] #/screen1/screen1_1,[canSleep] #/screen1,[sleep] #/screen1/screen1_1/screen1_1_1,[sleep] #/screen1/screen1_1,[sleep] #/screen1,[destroy] #/screen1/screen1_1/screen1_1_1,[destroy] #/screen1/screen1_1,[destroy] #/screen1", "The navigation map is correct"); // +1

                    start();
                });

            });
        });
    });

}(jQuery));
