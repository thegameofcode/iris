/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/
(function($) {

  var iris = window.iris;

  var testService = iris.service(function(self){

      self.path = "http://localhost:8080/";

      self.load = function (id, success, error) {
        self.get("test/service/" + id, success, error);
      };

      self.create = function (params, success, error) {
        self.post("echo/create", params, success, error);
      };

      self.update = function (id, params, success, error) {
        self.put("echo/put/" + id, params, success, error);
      };

      self.remove = function (id, success, error) {
        self.del("echo/delete/" + id, success, error);
      };

  });


  asyncTest("Service Get Success", function () {
      expect(2);

      testService.load("test.json", function (json) {
          strictEqual(1, json.id);
          strictEqual("book title", json.title);
          start();
      }, function (p_request, p_textStatus, p_errorThrown) {
          ok(false, "Error callback unexpected: " + p_errorThrown);
          start();
      });

  });

  asyncTest("Service Get Error", function () {
      expect(1);

      testService.load("no_valid", function (json) {
          ok(false, "Success callback unexpected: " + json);
          start();
      }, function (p_request, p_textStatus, p_errorThrown) {
          ok(true);
          start();
      });

  });


  asyncTest("Service Put Success", function () {
      expect(1);

      var id = 1;
      var params = 'param1=1&param2=2';

      var expectedResponse = {
        "method":"PUT",
        "url":"/echo/put/" + id,
        "data" : params
      };

      testService.update(id, params, function (json) {
          deepEqual(json, expectedResponse, "the json response is not valid");
          start();
      }, function (p_request, p_textStatus, p_errorThrown) {
          ok(false, "Error callback unexpected: " + p_errorThrown);
          start();
      });

  });


  asyncTest("Service Post Success", function () {
      expect(1);

      var params = 'param1=1&param2=example';

      var expectedResponse = {
        "method":"POST",
        "url":"/echo/create",
        "data" : params
      };
      
      testService.create(params, function (json) {
          deepEqual(json, expectedResponse, "the json response is not valid");
          start();
      }, function (p_request, p_textStatus, p_errorThrown) {
          ok(false, "Error callback unexpected: " + p_errorThrown);
          start();
      });

  });

  asyncTest("Service Delete Success", function () {
      expect(1);

      var id = 1;

      var expectedResponse = {
        "method":"DELETE",
        "url":"/echo/delete/" + id
      };

      testService.remove(id, function (json) {
          deepEqual(json, expectedResponse, "the json response is not valid");
          start();
      }, function (p_request, p_textStatus, p_errorThrown) {
          ok(false, "Error callback unexpected: " + p_errorThrown);
          start();
      });

  });
}(jQuery));
