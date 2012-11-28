/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/
(function($) {

  var iris = window.iris;

  var testService = iris.service(function(self){

      self.path = "http://localhost:8080/";

      self.loadSimple = function (success, error) {
        self.get("test/service/test.json", null, success, error);
      };

      self.loadPathParam = function (name, ext, success, error) {
        self.get("test/service/{name}.{ext}", {"name" : name, "ext" : ext}, success, error);
      };

      self.create = function (params, success, error) {
        self.post("echo/example", params, success, error);
      };

      self.update = function (params, success, error) {
        self.put("echo/example", params, success, error);
      };

      self.remove = function (id, success, error) {
        self.del("{id}", {"id" : id}, success, error);
      };

  });

  asyncTest("Get Success Simple", function () {
      expect(2);

      testService.loadSimple(function (json) {
          strictEqual(1, json.id);
          strictEqual("book title", json.title);

          start();

      }, function (p_request, p_textStatus, p_errorThrown) {
          ok(false, "Error callback unexpected: " + p_errorThrown);
          start();
      });

  });

  asyncTest("Get Success Path Param", function () {
      expect(2);

      testService.loadPathParam("test", "json", function (json) {
          strictEqual(1, json.id);
          strictEqual("book title", json.title);

          start();

      }, function (p_request, p_textStatus, p_errorThrown) {
          ok(false, "Error callback unexpected: " + p_errorThrown);
          start();
      });

  });

  asyncTest("Get Error Path Param", function () {
      expect(1);

      testService.loadPathParam("no_valid", "id", function (json) {
          ok(false, "Success callback unexpected: " + json);
          start();
      }, function (p_request, p_textStatus, p_errorThrown) {
          ok(true);
          start();
      });

  });

  asyncTest("Put Success Simple", function () {
      expect(2);

      var params = 'param1=1&param2=example';
      testService.update(params, function (json) {
          strictEqual('PUT', json.method);
          strictEqual('param1=1&param2=example', json.data);

          start();
      }, function (p_request, p_textStatus, p_errorThrown) {
          ok(false, "Error callback unexpected: " + p_errorThrown);
          start();
      });

  });

  asyncTest("Post Success Simple", function () {
      expect(2);

      var params = 'param1=1&param2=example';
      testService.create(params, function (json) {
          strictEqual('POST', json.method);
          strictEqual('param1=1&param2=example', json.data);

          start();
      }, function (p_request, p_textStatus, p_errorThrown) {
          ok(false, "Error callback unexpected: " + p_errorThrown);
          start();
      });

  });

  asyncTest("Delete Success Simple", function () {
      expect(2);

      testService.remove(1, function (json) {
          strictEqual('DELETE', json.method);
          strictEqual('', json.data);

          start();
      }, function (p_request, p_textStatus, p_errorThrown) {
          ok(false, "Error callback unexpected: " + p_errorThrown);
          start();
      });

  });
}(jQuery));
