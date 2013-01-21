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
            //irisGeneratedCode.remove();
        }
    }
    
    
    function createDeferred() {
        window.deferred = {};
        window.deferred.main = new $.Deferred();
        window.deferred.home = new $.Deferred();
        window.deferred.help = new $.Deferred();
        window.deferred.home2 = new $.Deferred();
        window.deferred.home3 = new $.Deferred();
    }
    
    function destroyDeferred() {
        window.deferred = {};
    }
    
    function gotoMain() {
        iris.welcome("test/destroy_screen/welcome.js");
        iris.navigate("#main");
        
    }
    
    
    module( "Module Destroy Screen", {
        setup: function() {
            iris.notify("iris-reset");
            createDeferred();
            gotoMain();
        },
        teardown: function () {
            destroyDeferred();
            clearBody();
        }
    });
    
    
    
    asyncTest("Test Destroy #home after goto #home, then goto #help", function() {
        window.expect(3);
        
        window.deferred.main.done(
            function() {
                iris.navigate("#home"); // +1 Home Screen Created
            }
            );
        
        window.deferred.home.done(
            function() {
                iris.log("home DONE");
                iris.navigate("#help"); // +1 Home Screen asleep
            }
            );
            
        window.deferred.help.done(
            function() {
            iris.log("help DONE");
                setTimeout(function () {
                    iris.destroyScreen("#home"); // +1 Home Screen Destroyed
                    window.start();
                }, 100);
            }
        );
    }
    );
    
    asyncTest("Test Destroy #home after goto #help", function() {
      
        window.expect(0);
        
        window.deferred.main.done(
            function() {
                iris.navigate("#help");
            }
            );
        
        
        window.deferred.help.done(
            function() {
                setTimeout(function () {
                    iris.destroyScreen("#home");
                    window.start();
                }, 10);
            }
            );
        
        
    }
    );
        
    asyncTest("Test Destroy #home after goto #home", function() {
      
        window.expect(2);
        
        window.deferred.main.done(
            function() {
                iris.navigate("#home");
            }
            );
        
        
        window.deferred.home.done(
            function() {
                setTimeout(function () {
                    window.throws(function() {
                        iris.destroyScreen("#home");
                    },"It is impossible to destroy the current Screen");
                    window.start();
                }, 10);
            }
            );
        
        
    }
    );
        

    asyncTest("Test Destroy #home after goto #home, then goto #home2, then goto #help", function() {
        window.expect(4);
        
        window.deferred.main.done(
            function() {
                iris.navigate("#home"); // +1 Home Screen Created
            }
            );
        
        window.deferred.home.done(
            function() {
                iris.navigate("#home2"); // +1 Home Screen asleep
            }
            );
        
        
        window.deferred.home2.done(
            function() {
                iris.navigate("#help"); // +1 Home2 Screen asleep
            }
            );
            
        window.deferred.help.done(
            function() {
                setTimeout(function () {
                    iris.destroyScreen("#home"); // +1 Home Screen Destroyed
                    window.start();
                }, 10);
            }
            );
        
        
    }
    );
        
    asyncTest("Test Destroy #home after goto #home, then goto #home2, then goto #home3, then goto #help", function() {
        window.expect(5);
        
        window.deferred.main.done(
            function() {
                iris.navigate("#home"); // +1 Home Screen Created
            }
            );
        
        window.deferred.home.done(
            function() {
                iris.navigate("#home2"); // +1 Home Screen asleep
            }
            );
        
        
        window.deferred.home2.done(
            function() {
                iris.navigate("#home3"); // +1 Home2 Screen asleep
            }
            );
        
        window.deferred.home3.done(
            function() {
                iris.navigate("#help"); // +1 Home3 Screen asleep
            }
            );
        
        
        window.deferred.help.done(
            function() {
                setTimeout(function () {
                    iris.destroyScreen("#home"); // +1 Home Screen Destroyed
                    window.start();
                }, 100);
            }
            );
        
        
    }
    );
        
    asyncTest("Test Destroy #home2 after goto #home, then goto #home2, then goto #home3, then goto #home", function() {
        window.expect(5);
        
        window.deferred.main.done(
            function() {
                iris.navigate("#home"); // +1 Home Screen Created
            }
            );
        
        window.deferred.home.done(
            function() {
                iris.navigate("#home2"); // +1 Home Screen asleep
            }
            );
        
        
        window.deferred.home2.done(
            function() {
                iris.navigate("#home3"); // +1 Home2 Screen asleep
            }
            );
        
        window.deferred.home3.done(
            function() {
                iris.navigate("#help"); // +1 Home3 Screen asleep
            }
            );
        
        
        window.deferred.help.done(
            function() {
                setTimeout(function () {
                    iris.destroyScreen("#home2"); // +1 Home2 Screen Destroyed
                    window.start();
                }, 10);
            }
            );
        
        
    }
    );

    /*asyncTest("Test goto #home after destroy #home", function() {
        window.expect(4);
        
        window.deferred.main.done(
            function() {
                iris.navigate("#home");
            }
            );
        
        window.deferred.home.done(
            function() {
                iris.navigate("#help");
            }
            );
       
        window.deferred.home2.done(
            function() {
                window.ok(window.location.hash === "#home2", "We are in #home2");
            }
            );
       
        
        window.deferred.help.done(
            function() {
                    iris.destroyScreen("#home");

                    try {
                            iris.navigate("#home"); // real async call
                        } catch (e) {
                            start();
                        }
                    
            }
            );
    }
    );*/

    

    asyncTest("Test Destroy #home after goto #home, then goto #home2, then goto #home3", function() {
        window.expect(4);
        
        window.deferred.main.done(
            function() {
                iris.navigate("#home"); // +1 Home Screen Created
            }
            );
        
        window.deferred.home.done(
            function() {
                iris.navigate("#home2"); // +1 Home Screen asleep
            }
            );
        
        
        window.deferred.home2.done(
            function() {
                iris.navigate("#home3"); // +1 Home2 Screen asleep
            }
            );
        
        
        
        window.deferred.home3.done(
            function() {
                setTimeout(function () {

                    window.throws(function() {                        
                        iris.destroyScreen("#home");
                    },"It is impossible to destroy the parent screen"); // +1 It is impossible to destroy the parent screen

                    window.start();

                }, 10);
            }
            );
        
    }
    );

}(jQuery));