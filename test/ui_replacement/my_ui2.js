//In myUI.js

iris.ui(
 function (self) {
  self.create = function () {
   iris.log("my_ui2 UI Created");
   self.tmplMode(self.APPEND);
   self.tmpl("test/ui_replacement/my_ui2.html");
  };
  self.awake = function () {   
   iris.log("my_ui2 UI Awakened");
  };
  self.sleep = function () {
   iris.log("my_ui2 UI Sleeping");
  };

  self.destroy = function () {
   iris.log("my_ui2 UI Destroyed");
  };
 },
iris.path.my_ui2);