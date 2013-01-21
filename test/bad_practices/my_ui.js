//In myUI.js

iris.ui(
    function (self) {
        self.create = function () {
            window.console.log("my_ui UI Created");
            self.tmpl("test/bad_practices/my_ui.html");
        };
        self.awake = function () {   
            window.console.log("my_ui UI Awakened");
        };
        self.sleep = function () {
            window.console.log("my_ui UI Sleeping");
        };

        self.destroy = function () {
            window.console.log("my_ui UI Destroyed");
        };
    },
    "test/bad_practices/my_ui.js");