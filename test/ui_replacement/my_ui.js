//In myUI.js

iris.ui(
 function (self) {
  self.create = function () {
   iris.log("my_ui UI Created");
   self.tmpl("test/ui_replacement/my_ui.html");
  };
  self.awake = function () {   
   iris.log("my_ui UI Awakened");
  };
  self.sleep = function () {
   iris.log("my_ui UI Sleeping");
  };

  self.destroy = function () {
   iris.log("my_ui UI Destroyed");
  };
 },
iris.path.my_ui);