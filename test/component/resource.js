iris.resource(function(self){

    self.test = function () {
      window.ok(true, "Test function on loaded resource");
      window.start();
    };

}, "test/component/resource.js");
