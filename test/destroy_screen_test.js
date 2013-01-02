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
        iris.goto("#main");
        
    }
    
    
    module( "Module Destroy Screen", {
        setup: function() {
            window.location.hash = "";
            iris.init();
            clearBody();
            createDeferred();
            gotoMain();
        },
        teardown: function () {
            destroyDeferred();
        }
    });
    
    
    
    asyncTest("Test Destroy #home after goto #home, then goto #help", function() {
        window.expect(3);
        
        window.deferred.main.done(
            function() {
                iris.goto("#home");
            }
            );
        
        window.deferred.home.done(
            function() {
                iris.goto("#help");
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
    
    asyncTest("Test Destroy #home after goto #help", function() {
      
        window.expect(0);
        
        window.deferred.main.done(
            function() {
                iris.goto("#help");
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
                iris.goto("#home");
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
        window.expect(5);
        
        window.deferred.main.done(
            function() {
                iris.goto("#home");
            }
            );
        
        window.deferred.home.done(
            function() {
                iris.goto("#home2");
            }
            );
        
        
        window.deferred.home2.done(
            function() {
                iris.goto("#help");
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
        
    asyncTest("Test Destroy #home after goto #home, then goto #home2, then goto #home3, then goto #help", function() {
        window.expect(7);
        
        window.deferred.main.done(
            function() {
                iris.goto("#home");
            }
            );
        
        window.deferred.home.done(
            function() {
                iris.goto("#home2");
            }
            );
        
        
        window.deferred.home2.done(
            function() {
                iris.goto("#home3");
            }
            );
        
        window.deferred.home3.done(
            function() {
                iris.goto("#help");
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
        
        asyncTest("Test Destroy #home2 after goto #home, then goto #home2, then goto #home3, then goto #home", function() {
        window.expect(6);
        
        window.deferred.main.done(
            function() {
                iris.goto("#home");
            }
            );
        
        window.deferred.home.done(
            function() {
                iris.goto("#home2");
            }
            );
        
        
        window.deferred.home2.done(
            function() {
                iris.goto("#home3");
            }
            );
        
        window.deferred.home3.done(
            function() {
                iris.goto("#help");
            }
            );
        
        
        window.deferred.help.done(
            function() {
                setTimeout(function () {
                    iris.destroyScreen("#home2");    
                    window.start();
                }, 10);
            }
            );
        
        
    }
    );
        
    
    asyncTest("Test goto #home after destroy #home", function() {
        window.expect(4);
        
        window.deferred.main.done(
            function() {
                iris.goto("#home");
            }
            );
        
        window.deferred.home.done(
            function() {
                iris.goto("#help");
            }
            );
       
        window.deferred.home2.done(
            function() {
                window.ok(window.location.hash === "#home2", "We are in #home2");
            }
            );
       
        
        window.deferred.help.done(
            function() {
                setTimeout(function () {                    
                    iris.destroyScreen("#home");
                    iris.goto("#home");
                    window.start();
                }, 10);
            }
            );
    }
    );

    asyncTest("Test Destroy #home after goto #home, then goto #home2, then goto #home3", function() {
        window.expect(2);
        
        window.deferred.main.done(
            function() {
                iris.goto("#home");
            }
            );
        
        window.deferred.home.done(
            function() {
                iris.goto("#home2");
            }
            );
        
        
        window.deferred.home2.done(
            function() {
                iris.goto("#home3");
            }
            );
        
        
        
        window.deferred.home3.done(
            function() {
                setTimeout(function () {
                    window.throws(function() {                        
                        iris.destroyScreen("#home");
                    },"It is impossible to destroy the parent screen");
                    window.start();
                }, 10);
            }
            );
        
    }
    );

}(jQuery));