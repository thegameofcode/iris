/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/
(function($) {

  module('Module Resource', {
      setup: function() {
          iris.notify("iris-reset");
          iris.path = {
            resource : "test/resource/resource.js",
            empty_tmpl : "test/resource/empty.html",
            welcome : "test/resource/welcome.js"
          };
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


  asyncTest("Resource Get Success", function () {
      expect(2);

      iris.on(iris.AFTER_NAVIGATION,function () {
        iris.resource(iris.path.resource).load("test.json", function (json) {
            strictEqual(1, json.id);
            strictEqual("book title", json.title);
            start();
        }, function (p_request, p_textStatus, p_errorThrown) {
            window.ok(false, "Error callback unexpected: " + p_errorThrown);
            start();
        });
      });

  });

  asyncTest("Resource Get Error", function () {
      expect(1);

      iris.on(iris.AFTER_NAVIGATION,function () {
        iris.resource(iris.path.resource).load("no_valid", function (json) {
            window.ok(false, "Success callback unexpected: " + json);
            start();
        }, function (p_request, p_textStatus, p_errorThrown) {
            window.ok(true);
            start();
        });
      });

  });


  asyncTest("Resource Put Success", function () {
      expect(1);

      iris.on(iris.AFTER_NAVIGATION,function () {

        var id = 1;
        var params = 'param1=1&param2=2';

        var expectedResponse = {
          "method":"PUT",
          "url":"/echo/put/" + id,
          "data" : params
        };

        iris.resource(iris.path.resource).update(id, params, function (json) {
            deepEqual(json, expectedResponse, "the json response is not valid");
            start();
        }, function (p_request, p_textStatus, p_errorThrown) {
            window.ok(false, "Error callback unexpected: " + p_errorThrown);
            start();
        });
      });

  });


  asyncTest("Resource Post Success", function () {
      expect(1);

      iris.on(iris.AFTER_NAVIGATION,function () {
        var params = 'param1=1&param2=example';

        var expectedResponse = {
          "method":"POST",
          "url":"/echo/create",
          "data" : params
        };
        
        iris.resource(iris.path.resource).create(params, function (json) {
            deepEqual(json, expectedResponse, "the json response is not valid");
            start();
        }, function (p_request, p_textStatus, p_errorThrown) {
            window.ok(false, "Error callback unexpected: " + p_errorThrown);
            start();
        });
      });

  });

  asyncTest("Resource Delete Success", function () {
      expect(1);

      iris.on(iris.AFTER_NAVIGATION,function () {

        var id = 1;

        var expectedResponse = {
          "method":"DELETE",
          "url":"/echo/delete/" + id
        };

        iris.resource(iris.path.resource).remove(id, function (json) {
            deepEqual(json, expectedResponse, "the json response is not valid");
            start();
        }, function (p_request, p_textStatus, p_errorThrown) {
            window.ok(false, "Error callback unexpected: " + p_errorThrown);
            start();
        });
      });

  });
}(jQuery));
