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

    module('Module Enhanced Navigation', {
        setup: function() {
            iris.notify("iris-reset");
            window.navigations = [];
            iris.path = {
                welcome : "test/enhanced_navigation/welcome.js",
                empty_tmpl : "test/enhanced_navigation/empty.html",
                screen1 : "test/enhanced_navigation/screen1.js",
                screen1_1 : "test/enhanced_navigation/screen1_1.js",
                screen1_1_1 : "test/enhanced_navigation/screen1_1_1.js",
                screen1_2 : "test/enhanced_navigation/screen1_2.js",
                screen2 : "test/enhanced_navigation/screen2.js",
                screen2_1 : "test/enhanced_navigation/screen2_1.js",
                screen2_2 : "test/enhanced_navigation/screen2_2.js",
                ui : "test/enhanced_navigation/ui.js",
                ui_tmpl : "test/enhanced_navigation/ui.html"
            };
            iris.cache(false);
            iris.enableLog(false);
        },
        teardown: function () {
            $("#start_iris").empty();
        }
    });



    asyncTest("Navigate to a screen at level 0", function() {

        expect(3);

        iris.welcome(iris.path.welcome); // +1 create, +1 awake

        iris.on(iris.AFTER_NAVIGATION, function () {

            strictEqual(window.navigations.join(","), "[create] #,[awake] #", "The navigation map is correct"); // +1

            start();
        });
    
    });

    asyncTest("Navigate to a screen at level 1", function() {

        expect(5);

        iris.welcome(iris.path.welcome); // +1 create, +1 awake

        iris.on(iris.AFTER_NAVIGATION, function () {
            iris.off(iris.AFTER_NAVIGATION);
            // this will make an async call
            iris.navigate("#/first/screen"); // +1 create, +1 awake

            iris.on(iris.AFTER_NAVIGATION, function () {
                
                strictEqual(window.navigations.join(","), "[create] #,[awake] #,[create] #/first/screen,[awake] #/first/screen", "The navigation map is correct"); // +1

                start();
            });
        });
    
    });

    asyncTest("Navigate to a screen at level 2", function() {

        expect(7);

        iris.welcome(iris.path.welcome); // +1 create, +1 awake

        iris.on(iris.AFTER_NAVIGATION, function () {
            iris.off(iris.AFTER_NAVIGATION);

            var navigationHash = "#/first/screen/screen/at/deep/two";

            // this will make an async call
            iris.navigate(navigationHash); // +2 create, +2 awake

            iris.on(iris.AFTER_NAVIGATION, function () {

                if ( document.location.hash === navigationHash ) {
                    strictEqual(window.navigations.join(","), "[create] #,[awake] #,[create] #/first/screen,[awake] #/first/screen,[create] #/first/screen/screen/at/deep/two,[awake] #/first/screen/screen/at/deep/two", "The navigation map is correct"); // +1
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

            var navigationHash = "#/first/screen/screen/at/deep/two/screen/at/deep/three";

            // this will make an async call
            iris.navigate(navigationHash); // +3 create, +3 awake

            iris.on(iris.AFTER_NAVIGATION, function () {
                if ( document.location.hash === navigationHash ) {
                    strictEqual(window.navigations.join(","), "[create] #,[awake] #,[create] #/first/screen,[awake] #/first/screen,[create] #/first/screen/screen/at/deep/two,[awake] #/first/screen/screen/at/deep/two,[create] #/first/screen/screen/at/deep/two/screen/at/deep/three,[awake] #/first/screen/screen/at/deep/two/screen/at/deep/three", "The navigation map is correct"); // +1
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

            var navigationHash = "#/first/screen/screen/at/deep/two/screen/at/deep/three";

            // this will make an async call
            iris.navigate(navigationHash); // +3 create, +3 awake

            iris.on(iris.AFTER_NAVIGATION, function () {
                iris.off(iris.AFTER_NAVIGATION);
                window.history.back(); // return to #, then +3 of canSleep, +3 sleep

                iris.on(iris.AFTER_NAVIGATION, function () {
                    iris.off(iris.AFTER_NAVIGATION);

                    // +1
                    strictEqual(window.navigations.join(","), "[create] #,[awake] #,[create] #/first/screen,[awake] #/first/screen,[create] #/first/screen/screen/at/deep/two,[awake] #/first/screen/screen/at/deep/two,[create] #/first/screen/screen/at/deep/two/screen/at/deep/three,[awake] #/first/screen/screen/at/deep/two/screen/at/deep/three,[canSleep] #/first/screen/screen/at/deep/two/screen/at/deep/three,[canSleep] #/first/screen/screen/at/deep/two,[canSleep] #/first/screen,[sleep] #/first/screen/screen/at/deep/two/screen/at/deep/three,[sleep] #/first/screen/screen/at/deep/two,[sleep] #/first/screen", "The navigation map is correct");
                    start();
                });

            });
        });

    });

    asyncTest("Navigate to a screen at level 3 and go to other branch at level 1", function() {
        expect(18);

        iris.welcome(iris.path.welcome); // +1 create, +1 awake

        iris.on(iris.AFTER_NAVIGATION, function () {
            iris.off(iris.AFTER_NAVIGATION);

            var navigationHash = "#/first/screen/screen/at/deep/two/screen/at/deep/three";

            // this will make an async call
            iris.navigate(navigationHash); // +3 create, +3 awake

            iris.on(iris.AFTER_NAVIGATION, function () {
                iris.off(iris.AFTER_NAVIGATION);


                // async
                navigationHash = "#/second/screen";
                iris.navigate(navigationHash);

                iris.on(iris.AFTER_NAVIGATION, function () {

                    strictEqual(navigationHash, document.location.hash, "The final hash is right"); // +1
                    strictEqual(window.navigations.join(","), "[create] #,[awake] #,[create] #/first/screen,[awake] #/first/screen,[create] #/first/screen/screen/at/deep/two,[awake] #/first/screen/screen/at/deep/two,[create] #/first/screen/screen/at/deep/two/screen/at/deep/three,[awake] #/first/screen/screen/at/deep/two/screen/at/deep/three,[canSleep] #/first/screen/screen/at/deep/two/screen/at/deep/three,[canSleep] #/first/screen/screen/at/deep/two,[canSleep] #/first/screen,[sleep] #/first/screen/screen/at/deep/two/screen/at/deep/three,[sleep] #/first/screen/screen/at/deep/two,[sleep] #/first/screen,[create] #/second/screen,[awake] #/second/screen", "The navigation map is correct"); // +1

                    start();
                });

            });
        });

    });

    asyncTest("Navigate to a screen at level 2 and navigate to its parent at level 1", function() {

        expect(9);

        iris.welcome(iris.path.welcome); // +1 create, +1 awake

        iris.on(iris.AFTER_NAVIGATION, function () {
            iris.off(iris.AFTER_NAVIGATION);

            iris.navigate("#/first/screen/screen/at/deep/two"); // +2 create, +2 awake

            iris.on(iris.AFTER_NAVIGATION, function () {
                iris.off(iris.AFTER_NAVIGATION);

                iris.navigate("#/first/screen"); // +1 cansleep, +1 sleep

                iris.on(iris.AFTER_NAVIGATION, function () {
                    iris.off(iris.AFTER_NAVIGATION);

                    strictEqual(window.navigations.join(","), "[create] #,[awake] #,[create] #/first/screen,[awake] #/first/screen,[create] #/first/screen/screen/at/deep/two,[awake] #/first/screen/screen/at/deep/two,[canSleep] #/first/screen/screen/at/deep/two,[sleep] #/first/screen/screen/at/deep/two", "The navigation map is correct"); // +1
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

            var navigationHash = "#/second/screen/second_screen/at/deep/two";

            // this will make an async call
            iris.navigate(navigationHash); // +3 create, +3 awake, +2 create-ui, +2 awake-ui

            iris.on(iris.AFTER_NAVIGATION, function () {
                iris.off(iris.AFTER_NAVIGATION);

                navigationHash = "#/second/screen/second_screen/at/deep/two/bis";
                iris.navigate(navigationHash); // +2 canSleep, +2 sleep-ui, +1 sleep, +1 create +1 awake

                iris.on(iris.AFTER_NAVIGATION, function () {
                    iris.off(iris.AFTER_NAVIGATION);

                    iris.on(iris.AFTER_NAVIGATION, function () {
                        strictEqual(window.navigations.join(","), "[create] #,[awake] #,[create] #/second/screen,[awake] #/second/screen,[create] #/second/screen/second_screen/at/deep/two,[create-ui] screens_ createOtherUI=true,[create-ui] screens_ createOtherUI=false,[awake-ui] screens_ createOtherUI=false,[awake-ui] screens_ createOtherUI=true,[awake] #/second/screen/second_screen/at/deep/two,[canSleep] #/second/screen/second_screen/at/deep/two,[sleep-ui] screens_ createOtherUI=false,[sleep-ui] screens_ createOtherUI=true,[sleep] #/second/screen/second_screen/at/deep/two,[create] #/second/screen/second_screen/at/deep/two/bis,[awake] #/second/screen/second_screen/at/deep/two/bis,[canSleep] #/second/screen/second_screen/at/deep/two/bis,[sleep] #/second/screen/second_screen/at/deep/two/bis,[awake] #/second/screen/second_screen/at/deep/two,[awake-ui] screens_ createOtherUI=true,[awake-ui] screens_ createOtherUI=false", "Final Navigation map right");
                        start();
                    });

                    navigationHash = "#/second/screen/second_screen/at/deep/two";
                    // async
                    iris.navigate(navigationHash); // +1 sleep, +3 awakes

                });
                
            });
        });
    });

    asyncTest("Navigate to a screen at level 2 and navigate to its parent at level 1 and finally return to the screen at level 2", function() {

        expect(10);

        iris.welcome(iris.path.welcome); // +1 create, +1 awake

        iris.on(iris.AFTER_NAVIGATION, function () {
            iris.off(iris.AFTER_NAVIGATION);

            iris.navigate("#/first/screen/screen/at/deep/two"); // +2 create, +2 awake

            iris.on(iris.AFTER_NAVIGATION, function () {
                iris.off(iris.AFTER_NAVIGATION);

                iris.navigate("#/first/screen"); // +1 cansleep, +1 sleep

                iris.on(iris.AFTER_NAVIGATION, function () {
                    iris.off(iris.AFTER_NAVIGATION);

                    iris.navigate("#/first/screen/screen/at/deep/two"); // +1 awake

                    iris.on(iris.AFTER_NAVIGATION, function () {
                        iris.off(iris.AFTER_NAVIGATION);

                        strictEqual(window.navigations.join(","), "[create] #,[awake] #,[create] #/first/screen,[awake] #/first/screen,[create] #/first/screen/screen/at/deep/two,[awake] #/first/screen/screen/at/deep/two,[canSleep] #/first/screen/screen/at/deep/two,[sleep] #/first/screen/screen/at/deep/two,[awake] #/first/screen/screen/at/deep/two", "The navigation map is correct"); // +1
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

            var navigationHash = "#/first/screen/screen/at/deep/two/screen/at/deep/three";

            // this will make an async call
            iris.navigate(navigationHash); // +3 create, +3 awake

            iris.on(iris.AFTER_NAVIGATION, function () {
                iris.off(iris.AFTER_NAVIGATION);

                // async
                navigationHash = "#";
                iris.navigate(navigationHash); // +3 cansleep, +3 sleep

                iris.on(iris.AFTER_NAVIGATION, function () {

                    iris.destroyScreen("#/first/screen"); // +3 destroy
                    strictEqual(window.navigations.join(","), "[create] #,[awake] #,[create] #/first/screen,[awake] #/first/screen,[create] #/first/screen/screen/at/deep/two,[awake] #/first/screen/screen/at/deep/two,[create] #/first/screen/screen/at/deep/two/screen/at/deep/three,[awake] #/first/screen/screen/at/deep/two/screen/at/deep/three,[canSleep] #/first/screen/screen/at/deep/two/screen/at/deep/three,[canSleep] #/first/screen/screen/at/deep/two,[canSleep] #/first/screen,[sleep] #/first/screen/screen/at/deep/two/screen/at/deep/three,[sleep] #/first/screen/screen/at/deep/two,[sleep] #/first/screen,[destroy] #/first/screen/screen/at/deep/two/screen/at/deep/three,[destroy] #/first/screen/screen/at/deep/two,[destroy] #/first/screen", "The navigation map is correct"); // +1

                    start();
                });

            });
        });
    });

    asyncTest("Navigate and do new navigate", function() {

        expect(7);

        iris.welcome(iris.path.welcome); // +1 create, +1 awake
        iris.navigate("#/first/screen/screen/at/deep/two"); // +2 create, +2 awake

        iris.on(iris.AFTER_NAVIGATION, function () {
            iris.off(iris.AFTER_NAVIGATION);

            strictEqual(window.navigations.join(","), "[create] #,[awake] #,[create] #/first/screen,[awake] #/first/screen,[create] #/first/screen/screen/at/deep/two,[awake] #/first/screen/screen/at/deep/two", "The navigation map is correct"); // +1

            start();
        });
    
    });

    asyncTest("Multiple calls to iris.navigate", function() {

        expect(7);

        iris.welcome(iris.path.welcome); // +1 create, +1 awake
        iris.navigate("#/second/screen");
        iris.navigate("#/first/screen/screen/at/deep/two"); // +2 create, +2 awake

        iris.on(iris.AFTER_NAVIGATION, function () {
            iris.off(iris.AFTER_NAVIGATION);

            strictEqual(window.navigations.join(","), "[create] #,[awake] #,[create] #/first/screen,[awake] #/first/screen,[create] #/first/screen/screen/at/deep/two,[awake] #/first/screen/screen/at/deep/two", "The navigation map is correct"); // +1

            start();
        });
    
    });


    // Path params

    asyncTest("Navigate to a screen with path params", function() {

        expect(9);

        iris.welcome(iris.path.welcome); // +1 create, +1 awake

        iris.on(iris.AFTER_NAVIGATION, function () {
            iris.off(iris.AFTER_NAVIGATION);

            // 123456_ABCD is the path param of "screen/with/pathparam/:parameter/and/:other_param"
            iris.navigate("#/first/screen/screen/with/pathparam/123456_ABCD/and/&?_test:|"); // +2 create, +2 awake, +2 params

            iris.on(iris.AFTER_NAVIGATION, function () {
                iris.off(iris.AFTER_NAVIGATION);

                strictEqual(window.navigations.join(","), "[create] #,[awake] #,[create] #/first/screen,[awake] #/first/screen,[create] #/first/screen/screen/with/pathparam/:parameter/and/:other_param,[awake] #/first/screen/screen/with/pathparam/:parameter/and/:other_param", "The navigation map is correct"); // +1
                start();
            });
        });

    });

    
    asyncTest("Create the welcome screen and navigate to it passing matrix parameters", function() {

        expect(5);

        iris.welcome(iris.path.welcome); // +1 create, +1 awake

        iris.on(iris.AFTER_NAVIGATION, function () {
            iris.off(iris.AFTER_NAVIGATION);

            iris.navigate("#;param=value;param2=value2"); // +1 awake, +1 params

            iris.on(iris.AFTER_NAVIGATION, function () {
                iris.off(iris.AFTER_NAVIGATION);

                strictEqual(window.navigations.join(","), "[create] #,[awake] #,[awake] #,[params] # param[value] param2[value2]", "The navigation map is correct"); // +1
                start();
            });
        });

    });

    asyncTest("Navigate to a screen at level 1 with matrix params", function() {

        expect(6);

        iris.welcome(iris.path.welcome); // +1 create, +1 awake

        iris.on(iris.AFTER_NAVIGATION, function () {
            iris.off(iris.AFTER_NAVIGATION);

            // this will make an async call
            iris.navigate("#/first/screen;PARAM-1=value_1234;Param_2=value_test"); // +1 create, +1 awake, +1 param

            iris.on(iris.AFTER_NAVIGATION, function () {
                iris.off(iris.AFTER_NAVIGATION);
                
                strictEqual(window.navigations.join(","), "[create] #,[awake] #,[create] #/first/screen,[awake] #/first/screen,[params] #/first/screen PARAM-1[value_1234] Param_2[value_test]", "The navigation map is correct"); // +1

                start();
            });
        });
    
    });

    asyncTest("Navigate to a screen at level 1 with matrix params and change the parameters", function() {

        expect(8);

        iris.welcome(iris.path.welcome); // +1 create, +1 awake

        iris.on(iris.AFTER_NAVIGATION, function () {
            iris.off(iris.AFTER_NAVIGATION);

            // this will make an async call
            iris.navigate("#/first/screen;PARAM-1=value_1234;Param_2=value_test"); // +1 create, +1 awake, +1 param

            iris.on(iris.AFTER_NAVIGATION, function () {
                iris.off(iris.AFTER_NAVIGATION);
                

                iris.navigate("#/first/screen;PARAM-1=NewValue;Param_2=OtherNewValue"); // +1 awake, +1 param
                iris.on(iris.AFTER_NAVIGATION, function () {
                    iris.off(iris.AFTER_NAVIGATION);

                    
                    strictEqual(window.navigations.join(","), "[create] #,[awake] #,[create] #/first/screen,[awake] #/first/screen,[params] #/first/screen PARAM-1[value_1234] Param_2[value_test],[awake] #/first/screen,[params] #/first/screen PARAM-1[NewValue] Param_2[OtherNewValue]", "The navigation map is correct"); // +1
                    start();
                });
            });
        });
    
    });

    asyncTest("Navigate to a screen at level 2, all screens receive some parameter", function() {

        expect(11);

        iris.welcome(iris.path.welcome); // +1 create, +1 awake

        iris.on(iris.AFTER_NAVIGATION, function () {
            iris.off(iris.AFTER_NAVIGATION);

            // this will make an async call
            iris.navigate("#?param=valueWelcome&param2=valueWelcome-2/first/screen;PARAM-1=valueS1;Param_2=valueS1-2/screen/at/deep/two;param=valueS1_1;param2=valueS1_1-2"); // +2 create, +3 awake, +3 param

            iris.on(iris.AFTER_NAVIGATION, function () {
                iris.off(iris.AFTER_NAVIGATION);
                
                strictEqual(window.navigations.join(","), "[create] #,[awake] #,[awake] #,[params] # param[valueWelcome] param2[valueWelcome-2],[create] #/first/screen,[awake] #/first/screen,[params] #/first/screen PARAM-1[valueS1] Param_2[valueS1-2],[create] #/first/screen/screen/at/deep/two,[awake] #/first/screen/screen/at/deep/two,[params] #/first/screen/screen/at/deep/two param[valueS1_1] param2[valueS1_1-2]", "The navigation map is correct"); // +1

                start();
            });
        });
    
    });

    asyncTest("Navigate to a screen at level 3 and do history back but one screen cannot sleep", function() {
        expect(12);

        iris.welcome(iris.path.welcome); // +1 create, +1 awake

        iris.on(iris.AFTER_NAVIGATION, function () {
            iris.off(iris.AFTER_NAVIGATION);

            var navigationHash = "#/first/screen/screen/at/deep/two?canSleep=false/screen/at/deep/three";

            // this will make an async call
            iris.navigate(navigationHash); // +3 create, +3 awake

            
            iris.on(iris.AFTER_NAVIGATION, function () {

                iris.off(iris.AFTER_NAVIGATION);

                iris.on(iris.AFTER_NAVIGATION, function () {
                    strictEqual(document.location.hash, navigationHash, "Correct hash map"); // +1
                    strictEqual(window.navigations.join(","), "[create] #,[awake] #,[create] #/first/screen,[awake] #/first/screen,[create] #/first/screen/screen/at/deep/two,[awake] #/first/screen/screen/at/deep/two,[create] #/first/screen/screen/at/deep/two/screen/at/deep/three,[awake] #/first/screen/screen/at/deep/two/screen/at/deep/three,[canSleep] #/first/screen/screen/at/deep/two/screen/at/deep/three,[canSleep] #/first/screen/screen/at/deep/two", "The navigation map is correct");
                    start();
                });

                // async call
                window.history.back(); // return to #, then +3 of canSleep, +3 sleep, +1 awake #
            });
        });

    });

    asyncTest("Navigate to an unregistered screen", function() {
        expect(4);

        iris.welcome(iris.path.welcome); // +1 create, +1 awake

        iris.on(iris.AFTER_NAVIGATION, function () {
            iris.off(iris.AFTER_NAVIGATION);

            var navigationHash = "#/screen_not_defined";


            iris.on(iris.SCREEN_NOT_FOUND, function (invalidHash) {
                strictEqual(invalidHash, navigationHash, 'The invalid hash must be equal to SCREEN_NOT_FOUND event parameter'); // +1
                strictEqual(window.location.hash, navigationHash, 'The current hash must be equal'); // +1
                start();
            });
            
            iris.on(iris.AFTER_NAVIGATION, function () {
                throw "A navigation event has been raises";
            });

            iris.navigate(navigationHash);
        });

    });

    asyncTest("Navigate to an unregistered screen whitout initial navigation to welcome screen", function() {
        expect(4);

        var navigationHash = "#/screen_not_defined";
        document.location.hash = navigationHash;

        iris.on(iris.SCREEN_NOT_FOUND, function (invalidHash) {
            strictEqual(invalidHash, navigationHash, 'The invalid hash must be equal to SCREEN_NOT_FOUND event parameter'); // +1
            strictEqual(window.location.hash, navigationHash, 'The current hash must be equal'); // +1
            start();
        });

        iris.on(iris.AFTER_NAVIGATION, function () {
            throw "A navigation event has been raises";
        });

        iris.welcome(iris.path.welcome); // +1 create, +1 awake
    });


}(jQuery));
