iris.resource(function(self){

    self.settings({path : "http://localhost:8081/"});

    self.load = function (id, success, error) {
      self.get("test/resource/" + id, success, error);
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

}, iris.path.resource);
