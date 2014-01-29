/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/
(function($) {

  module('Module Data', {
      setup: function() {
          iris.notify("iris-reset");
          iris.path = {
            resource : "test/data/resource.js",
            empty_tmpl : "test/data/empty.html",
            welcome : "test/data/welcome.js"
          };
          iris.enableLog(false);
          iris.welcome(iris.path.welcome);
      },
      teardown: function () {
          clearBody();
      }
  });

  function clearBody() {
      var irisGeneratedCode = $("#start_iris").nextAll();
      if (irisGeneratedCode !== undefined) {
          irisGeneratedCode.remove();
      }
  }


  asyncTest("Simple event trigger", function () {
      expect(1);

      iris.on(iris.AFTER_NAVIGATION,function () {
        var resource = iris.resource(iris.path.resource);
        
        resource.on('test-event', function(msg) {
          strictEqual('test-event', msg);
          start();
        });
        
        resource.trigger();
        
      });

  });
}(jQuery));
