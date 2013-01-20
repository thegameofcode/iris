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
        },
        teardown: function () {
            iris.notify("iris-reset");
            clearBody();
        }
    });

    asyncTest("Navigate to a screen at level 1", function() {

        expect(5);

        iris.welcome("test/advanced_navigation/welcome.js"); // +1 create, +1 awake

        // this will make an async call
        iris.navigate("#screen1"); // +1 create, +1 awake

        iris.on(iris.AFTER_NAVIGATION, function () {
            
            strictEqual(window.navigations.join(","), "[create] #,[awake] #,[create] #screen1,[awake] #screen1", "The navigation map is correct"); // +1

            start();
        });
    
    });

    asyncTest("Navigate to a screen at level 2", function() {

        expect(7);

        iris.welcome("test/advanced_navigation/welcome.js"); // +1 create, +1 awake

        var navigationHash = "#screen1/screen1_1";

        // this will make an async call
        iris.navigate(navigationHash); // +2 create, +2 awake

        iris.on(iris.AFTER_NAVIGATION, function () {

            if ( document.location.hash === navigationHash ) {
                strictEqual(window.navigations.join(","), "[create] #,[awake] #,[create] #screen1,[create] #screen1/screen1_1,[awake] #screen1,[awake] #screen1/screen1_1", "The navigation map is correct"); // +1
                start();
            }

        });

    });

    asyncTest("Navigate to a screen at level 3", function() {

        expect(9);

        iris.welcome("test/advanced_navigation/welcome.js"); // +1 create, +1 awake

        var navigationHash = "#screen1/screen1_1/screen1_1_1";

        // this will make an async call
        iris.navigate(navigationHash); // +3 create, +3 awake

        iris.on(iris.AFTER_NAVIGATION, function () {
            if ( document.location.hash === navigationHash ) {
                strictEqual(window.navigations.join(","), "[create] #,[awake] #,[create] #screen1,[create] #screen1/screen1_1,[create] #screen1/screen1_1/screen1_1_1,[awake] #screen1,[awake] #screen1/screen1_1,[awake] #screen1/screen1_1/screen1_1_1", "The navigation map is correct"); // +1
                start();
            }

        });

    });

    asyncTest("Navigate to a screen at level 3 and do history back", function() {

        expect(15);

        iris.welcome("test/advanced_navigation/welcome.js"); // +1 create, +1 awake

        var navigationHash = "#screen1/screen1_1/screen1_1_1";

        // this will make an async call
        iris.navigate(navigationHash); // +3 create, +3 awake

        iris.on(iris.AFTER_NAVIGATION, function () {

            if ( document.location.hash === navigationHash ) {
                window.history.back(); // return to #, then +3 of canSleep, +3 sleep

            } else if ( document.location.hash === "" ) {
                // +1
                strictEqual(window.navigations.join(","), "[create] #,[awake] #,[create] #screen1,[create] #screen1/screen1_1,[create] #screen1/screen1_1/screen1_1_1,[awake] #screen1,[awake] #screen1/screen1_1,[awake] #screen1/screen1_1/screen1_1_1,[canSleep] #screen1/screen1_1/screen1_1_1,[canSleep] #screen1/screen1_1,[canSleep] #screen1,[sleep] #screen1/screen1_1/screen1_1_1,[sleep] #screen1/screen1_1,[sleep] #screen1", "The navigation map is correct");
                start();
            }

        });

    });

    asyncTest("Navigate to a screen at level 3 and do history back but one screen cannot sleep", function() {
        expect(12);

        iris.welcome("test/advanced_navigation/welcome.js"); // +1 create, +1 awake

        var navigationHash = "#screen1/screen1_1?canSleep=false/screen1_1_1";

        // this will make an async call
        iris.navigate(navigationHash); // +3 create, +3 awake

        iris.on(iris.AFTER_NAVIGATION, function () {
            if ( document.location.hash === navigationHash ) {

                iris.off(iris.AFTER_NAVIGATION);

                iris.on(iris.AFTER_NAVIGATION, function () {
                    strictEqual(navigationHash, document.location.hash); // +1
                    strictEqual(window.navigations.join(","), "[create] #,[awake] #,[create] #screen1,[create] #screen1/screen1_1,[create] #screen1/screen1_1/screen1_1_1,[awake] #screen1,[awake] #screen1/screen1_1,[awake] #screen1/screen1_1/screen1_1_1,[canSleep] #screen1/screen1_1/screen1_1_1,[canSleep] #screen1/screen1_1", "The navigation map is correct");
                    start();
                });

                // async call
                window.history.back(); // return to #, then +3 of canSleep, +3 sleep, +1 awake #


            }
        });

    });

    asyncTest("Navigate to a screen at level 3 and go to other branch at level 1", function() {
        expect(19);

        iris.welcome("test/advanced_navigation/welcome.js"); // +1 create, +1 awake

        var navigationHash = "#screen1/screen1_1/screen1_1_1";

        // this will make an async call
        iris.navigate(navigationHash); // +3 create, +3 awake

        iris.on(iris.AFTER_NAVIGATION, function () {

            // +1
            strictEqual(window.navigations.join(","), "[create] #,[awake] #,[create] #screen1,[create] #screen1/screen1_1,[create] #screen1/screen1_1/screen1_1_1,[awake] #screen1,[awake] #screen1/screen1_1,[awake] #screen1/screen1_1/screen1_1_1", "The navigation map is correct"); // +1

            iris.off(iris.AFTER_NAVIGATION);

            // async
            navigationHash = "#screen2";
            iris.navigate(navigationHash);

            iris.on(iris.AFTER_NAVIGATION, function () {

                strictEqual(navigationHash, document.location.hash, "The final hash is right"); // +1
                strictEqual(window.navigations.join(","), "[create] #,[awake] #,[create] #screen1,[create] #screen1/screen1_1,[create] #screen1/screen1_1/screen1_1_1,[awake] #screen1,[awake] #screen1/screen1_1,[awake] #screen1/screen1_1/screen1_1_1,[canSleep] #screen1/screen1_1/screen1_1_1,[canSleep] #screen1/screen1_1,[canSleep] #screen1,[sleep] #screen1/screen1_1/screen1_1_1,[sleep] #screen1/screen1_1,[sleep] #screen1,[create] #screen2,[awake] #screen2", "The navigation map is correct"); // +1

                start();
            });

        });

    });

    asyncTest("Navigate to a screen at level 1 and go to other branch at the same level and check awake & sleep of children", function() {
        expect(24);

        iris.welcome("test/advanced_navigation/welcome.js"); // +1 create, +1 awake

        var navigationHash = "#screen2/screen2_1";

        // this will make an async call
        iris.navigate(navigationHash); // +3 create, +3 awake, +2 create-ui, +2 awake-ui

        iris.on(iris.AFTER_NAVIGATION, function () {

            // +1
            strictEqual(window.navigations.join(","), "[create] #,[awake] #,[create] #screen2,[create] #screen2/screen2_1,[create-ui] screens_ createOtherUI=true,[create-ui] screens_ createOtherUI=false,[awake-ui] screens_ createOtherUI=false,[awake-ui] screens_ createOtherUI=true,[awake] #screen2,[awake] #screen2/screen2_1", "The navigation map is correct");

            start();

            iris.off(iris.AFTER_NAVIGATION);

            navigationHash = "#screen2/screen2_2";
            iris.navigate(navigationHash); // +2 canSleep, +2 sleep-ui, +1 sleep, +1 create +1 awake

            iris.on(iris.AFTER_NAVIGATION, function () {

                // +1
                strictEqual(window.navigations.join(","), "[create] #,[awake] #,[create] #screen2,[create] #screen2/screen2_1,[create-ui] screens_ createOtherUI=true,[create-ui] screens_ createOtherUI=false,[awake-ui] screens_ createOtherUI=false,[awake-ui] screens_ createOtherUI=true,[awake] #screen2,[awake] #screen2/screen2_1,[canSleep] #screen2/screen2_1,[sleep-ui] screens_ createOtherUI=false,[sleep-ui] screens_ createOtherUI=true,[sleep] #screen2/screen2_1,[create] #screen2/screen2_2,[awake] #screen2/screen2_2", "Navigation map right");

                iris.off(iris.AFTER_NAVIGATION);

                iris.on(iris.AFTER_NAVIGATION, function () {
                    strictEqual(window.navigations.join(","), "[create] #,[awake] #,[create] #screen2,[create] #screen2/screen2_1,[create-ui] screens_ createOtherUI=true,[create-ui] screens_ createOtherUI=false,[awake-ui] screens_ createOtherUI=false,[awake-ui] screens_ createOtherUI=true,[awake] #screen2,[awake] #screen2/screen2_1,[canSleep] #screen2/screen2_1,[sleep-ui] screens_ createOtherUI=false,[sleep-ui] screens_ createOtherUI=true,[sleep] #screen2/screen2_1,[create] #screen2/screen2_2,[awake] #screen2/screen2_2,[canSleep] #screen2/screen2_2,[sleep] #screen2/screen2_2,[awake] #screen2/screen2_1,[awake-ui] screens_ createOtherUI=true,[awake-ui] screens_ createOtherUI=false", "Final Navigation map right");
                    start();
                });

                navigationHash = "#screen2/screen2_1";
                // async
                iris.navigate(navigationHash); // +1 sleep, +3 awakes

                


            });
            
        });

    });

}(jQuery));
