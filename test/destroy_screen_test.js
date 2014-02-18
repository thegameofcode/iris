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
    
    module( "Module Destroy Screen", {
        setup: function() {
            window.resetIris();
            iris.path = {
                welcome : "test/destroy_screen/welcome.js",
                welcome_tmpl : "test/destroy_screen/welcome.html",
                home : "test/destroy_screen/home.js",
                home_tmpl : "test/destroy_screen/home.html",
                home2 : "test/destroy_screen/home2.js",
                home2_tmpl : "test/destroy_screen/home2.html",
                home3 : "test/destroy_screen/home3.js",
                home3_tmpl : "test/destroy_screen/home3.html",
                help : "test/destroy_screen/help.js",
                help_tmpl : "test/destroy_screen/help.html",
                main : "test/destroy_screen/main.js",
                main_tmpl : "test/destroy_screen/main.html"
            };
            iris.cache(false);
            iris.enableLog(false);
            iris.welcome(iris.path.welcome);
        },
        teardown: function () {
            $("#start_iris").empty();
        }
    });
    
    
    
    asyncTest("Test Destroy #home after goto #home, then goto #help", function() {
        window.expect(3);

        iris.on(iris.AFTER_NAVIGATION, function () {
            iris.off(iris.AFTER_NAVIGATION);
            iris.navigate("#/main");

            iris.on(iris.AFTER_NAVIGATION, function () {
                iris.off(iris.AFTER_NAVIGATION);

                iris.navigate("#/home");

                iris.on(iris.AFTER_NAVIGATION, function () {
                    iris.off(iris.AFTER_NAVIGATION);

                    iris.navigate("#/help");


                    iris.on(iris.AFTER_NAVIGATION, function () {
                        iris.off(iris.AFTER_NAVIGATION);

                        iris.destroyScreen("#/home"); // +1 Home Screen Destroyed
                        start();

                    });

                });
            });
        });

    });
    
    asyncTest("Test Destroy #home after goto #help", function() {
      
        window.expect(1);

        iris.on(iris.AFTER_NAVIGATION, function () {
            iris.off(iris.AFTER_NAVIGATION);
            iris.navigate("#/main");


            iris.on(iris.AFTER_NAVIGATION, function () {
                iris.off(iris.AFTER_NAVIGATION);
            
                iris.navigate("#/help"); // +1 Home Screen Created

                iris.on(iris.AFTER_NAVIGATION, function () {
                    iris.off(iris.AFTER_NAVIGATION);

                    iris.destroyScreen("#/home");
                    iris.navigate("#/help"); // +1 Home Screen asleep

                    strictEqual(document.location.hash, "#/help", "The hash is #help");
                    start();

                });
            });
        });
        
    });
        
    asyncTest("Test Destroy #home after goto #home", function() {

        iris.on(iris.AFTER_NAVIGATION, function () {
            iris.off(iris.AFTER_NAVIGATION);
            iris.navigate("#/main");

            iris.on(iris.AFTER_NAVIGATION, function () {
                iris.off(iris.AFTER_NAVIGATION);

                iris.navigate("#/home"); // +1 Home Screen Created

                iris.on(iris.AFTER_NAVIGATION, function () {
                    iris.off(iris.AFTER_NAVIGATION);

                    raises(function() {
                        iris.destroyScreen("#/home");
                    }, "It is impossible to destroy the current Screen");

                    start();

                });
            });
        });
        
    });
        

    asyncTest("Test Destroy #home after goto #home, then goto #home/home2, then goto #help", function() {
        window.expect(5);

        iris.on(iris.AFTER_NAVIGATION, function () {
            iris.off(iris.AFTER_NAVIGATION);
            iris.navigate("#/main");

            iris.on(iris.AFTER_NAVIGATION, function () {
                iris.off(iris.AFTER_NAVIGATION);

                iris.navigate("#/home"); // +1 Home Screen Created

                iris.on(iris.AFTER_NAVIGATION, function () {
                    iris.off(iris.AFTER_NAVIGATION);

                    iris.navigate("#/home/home2"); // +1 Home Screen asleep


                    iris.on(iris.AFTER_NAVIGATION, function () {
                        iris.off(iris.AFTER_NAVIGATION);

                        iris.navigate("#/help"); // +1 Home2 Screen asleep


                        iris.on(iris.AFTER_NAVIGATION, function () {
                            iris.off(iris.AFTER_NAVIGATION);

                            iris.destroyScreen("#/home"); // +1 Home Screen Destroyed, +1 destroy child screen

                            start();

                        });

                    });
                });
            });
        });
    });
        
    asyncTest("Test Destroy #home after goto #home, then goto #home/home2, then goto #home/home2/home3, then goto #help", function() {
        window.expect(7);

        iris.on(iris.AFTER_NAVIGATION, function () {
            iris.off(iris.AFTER_NAVIGATION);
            iris.navigate("#/main");

            iris.on(iris.AFTER_NAVIGATION, function () {
                iris.off(iris.AFTER_NAVIGATION);

                iris.navigate("#/home"); // +1 Home Screen Created

                iris.on(iris.AFTER_NAVIGATION, function () {
                    iris.off(iris.AFTER_NAVIGATION);

                    iris.navigate("#/home/home2"); // +1 Home Screen asleep


                    iris.on(iris.AFTER_NAVIGATION, function () {
                        iris.off(iris.AFTER_NAVIGATION);

                        iris.navigate("#/home/home2/home3"); // +1 Home2 Screen asleep


                        iris.on(iris.AFTER_NAVIGATION, function () {
                            iris.off(iris.AFTER_NAVIGATION);

                            iris.navigate("#/help"); // +1 Home3 Screen asleep

                            iris.on(iris.AFTER_NAVIGATION, function () {
                                iris.off(iris.AFTER_NAVIGATION);

                                iris.destroyScreen("#/home"); // +1 Home Screen Destroyed, +2 destroy screen childs

                                start();
                            });

                        });

                    });
                });

            });
        });
        
    }
    );
        
    asyncTest("Test Destroy #home/home2 after goto #home, then goto #home/home2, then goto #home/home2/home3, then goto #home", function() {
        window.expect(6);

        iris.on(iris.AFTER_NAVIGATION, function () {
            iris.off(iris.AFTER_NAVIGATION);
            iris.navigate("#/main");

            iris.on(iris.AFTER_NAVIGATION, function () {
                iris.off(iris.AFTER_NAVIGATION);

                iris.navigate("#/home"); // +1 Home Screen Created

                iris.on(iris.AFTER_NAVIGATION, function () {
                    iris.off(iris.AFTER_NAVIGATION);

                    iris.navigate("#/home/home2"); // +1 Home Screen asleep


                    iris.on(iris.AFTER_NAVIGATION, function () {
                        iris.off(iris.AFTER_NAVIGATION);

                        iris.navigate("#/home/home2/home3"); // +1 Home2 Screen asleep


                        iris.on(iris.AFTER_NAVIGATION, function () {
                            iris.off(iris.AFTER_NAVIGATION);

                            iris.navigate("#/help"); // +1 Home3 Screen asleep

                            iris.on(iris.AFTER_NAVIGATION, function () {
                                iris.off(iris.AFTER_NAVIGATION);

                                iris.destroyScreen("#/home/home2"); // +1 Home2 Screen Destroyed, +1 screen child

                                start();
                            });

                        });

                    });
                });

            });
        });
    });


    asyncTest("Test goto #home after destroy #home", function() {
        window.expect(4);

        iris.on(iris.AFTER_NAVIGATION, function () {
            iris.off(iris.AFTER_NAVIGATION);
            iris.navigate("#/main");

            iris.on(iris.AFTER_NAVIGATION, function () {
                iris.off(iris.AFTER_NAVIGATION);

                iris.navigate("#/home"); // +1 Home Screen Created

                iris.on(iris.AFTER_NAVIGATION, function () {
                    iris.off(iris.AFTER_NAVIGATION);

                    iris.navigate("#/help"); // +1 Home Screen asleep


                    iris.on(iris.AFTER_NAVIGATION, function () {
                        iris.off(iris.AFTER_NAVIGATION);

                        iris.navigate("#/home"); // +1 Current screen cannot be removed


                        iris.on(iris.AFTER_NAVIGATION, function () {
                            iris.off(iris.AFTER_NAVIGATION);

                            raises(function () {
                                iris.destroyScreen("#/home");
                                
                            },"Current screen cannot be removed");

                            window.strictEqual(window.location.hash, "#/home", "We are in #home");

                            start();

                            
                        });

                    });
                });
            });

        });
    });

    

    asyncTest("Test goto #home, then goto #home/home2, then goto #home/home2/home3 then destroy #home", function() {
        window.expect(3);

        iris.on(iris.AFTER_NAVIGATION, function () {
            iris.off(iris.AFTER_NAVIGATION);

            iris.navigate("#/home");

            iris.on(iris.AFTER_NAVIGATION, function () {
                iris.off(iris.AFTER_NAVIGATION);

                iris.navigate("#/home/home2");


                iris.on(iris.AFTER_NAVIGATION, function () {
                    iris.off(iris.AFTER_NAVIGATION);

                    iris.navigate("#/home/home2/home3");

                    iris.on(iris.AFTER_NAVIGATION, function () {
                        iris.off(iris.AFTER_NAVIGATION);

                        raises(function () {
                            iris.destroyScreen("#/home");
                        },"Cannot delete the current screen or its parents");

                        strictEqual(document.location.hash, "#/home/home2/home3", "The hash is #home/home2/home3"); // +1
                        start();
                    });

                });

            });
        });
        
    });

}(jQuery));