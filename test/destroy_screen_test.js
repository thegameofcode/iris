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
        iris.deferred_main = new $.Deferred();
        iris.deferred_home = new $.Deferred();
        iris.deferred_help = new $.Deferred();
        iris.deferred_home2 = new $.Deferred();
        iris.deferred_home3 = new $.Deferred();
    }
    
    function gotoMain() {
        iris.welcome("test/destroy_screen/welcome.js");
        iris.goto("#main");
        
    }
    
    
    module( "Module Destroy Screen", {
        setup: function() {
            iris.init();
            clearBody();
            createDeferred();
            gotoMain();
        },
        teardown: function () {
        }
    });
    
    
    
    asyncTest("Test Destory #home after goto #home, then goto #help", function() {
        window.expect(3);
        
        iris.deferred_main.done(
            function() {
                iris.goto("#home");
            }
            );
        
        iris.deferred_home.done(
            function() {
                iris.goto("#help");
            }
            );
            
        iris.deferred_help.done(
            function() {
                setTimeout(function () {
                    iris.destroyScreen("#home");
                    window.start();
                }, 10);
            }
            );
        
        
    }
    );
    
    asyncTest("Test Destory #home after goto #help", function() {
      
        window.expect(0);
        
        iris.deferred_main.done(
            function() {
                iris.goto("#help");
            }
            );
        
        
        iris.deferred_help.done(
            function() {
                setTimeout(function () {
                    iris.destroyScreen("#home");
                    window.start();
                }, 10);
            }
            );
        
        
    }
    );
        
    asyncTest("Test Destory #home after goto #home", function() {
      
        window.expect(2);
        
        iris.deferred_main.done(
            function() {
                iris.goto("#home");
            }
            );
        
        
        iris.deferred_home.done(
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
        

    asyncTest("Test Destory #home after goto #home, then goto #home2, then goto #help", function() {
        window.expect(5);
        
        iris.deferred_main.done(
            function() {
                iris.goto("#home");
            }
            );
        
        iris.deferred_home.done(
            function() {
                iris.goto("#home2");
            }
            );
        
        
        iris.deferred_home2.done(
            function() {
                iris.goto("#help");
            }
            );
            
        iris.deferred_help.done(
            function() {
                setTimeout(function () {
                    iris.destroyScreen("#home");    
                    window.start();
                }, 10);
            }
            );
        
        
    }
    );
        
    asyncTest("Test Destory #home after goto #home, then goto #home2, then goto #home3, then goto #help", function() {
        window.expect(7);
        
        iris.deferred_main.done(
            function() {
                iris.goto("#home");
            }
            );
        
        iris.deferred_home.done(
            function() {
                iris.goto("#home2");
            }
            );
        
        
        iris.deferred_home2.done(
            function() {
                iris.goto("#home3");
            }
            );
        
        iris.deferred_home3.done(
            function() {
                iris.goto("#help");
            }
            );
        
        
        iris.deferred_help.done(
            function() {
                setTimeout(function () {
                    iris.destroyScreen("#home");    
                    window.start();
                }, 10);
            }
            );
        
        
    }
    );
        
    
    asyncTest("Test goto #home after destroy #home", function() {
        window.expect(4);
        
        iris.deferred_main.done(
            function() {
                iris.goto("#home");
            }
            );
        
        iris.deferred_home.done(
            function() {
                iris.goto("#help");
            }
            );
       
        iris.deferred_home2.done(
            function() {
                window.ok(window.location.hash === "#home2", "We are in #home2");
            }
            );
       
        
        iris.deferred_help.done(
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

    asyncTest("Test Destory #home after goto #home, then goto #home2, then goto #home3", function() {
        window.expect(2);
        
        iris.deferred_main.done(
            function() {
                iris.goto("#home");
            }
            );
        
        iris.deferred_home.done(
            function() {
                iris.goto("#home2");
            }
            );
        
        
        iris.deferred_home2.done(
            function() {
                iris.goto("#home3");
            }
            );
        
        
        
        iris.deferred_home3.done(
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