iris.resource(function(self){

    self.settings({path : "http://localhost:8081/"});

    self.load = function (id, success, error) {
      self.get("test/resource/" + id).done(success).fail(error);
    };

    self.create = function (params, success, error) {
      self.post("echo/create", params).done(success).fail(error);
    };

    self.update = function (id, params, success, error) {
      self.put("echo/put/" + id, params).done(success).fail(error);
    };

    self.remove = function (id, success, error) {
      self.del("echo/delete/" + id).done(success).fail(error);
    };

}, iris.path.resource);
