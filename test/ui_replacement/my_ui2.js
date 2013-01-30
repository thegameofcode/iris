//In myUI.js

iris.ui(
 function (self) {
  self.create = function () {
   window.console.log("my_ui2 UI Created");
   self.tmplMode(self.APPEND);
   self.tmpl("test/ui_replacement/my_ui2.html");
  };
  self.awake = function () {   
   window.console.log("my_ui2 UI Awakened");
  };
  self.sleep = function () {
   window.console.log("my_ui2 UI Sleeping");
  };

  self.destroy = function () {
   window.console.log("my_ui2 UI Destroyed");
  };
 },
iris.path.my_ui2);