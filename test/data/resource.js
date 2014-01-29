iris.resource(function(self){
  
  self.trigger = function() {
    self.notify("test-event", "test-event");
  }

}, iris.path.resource);
