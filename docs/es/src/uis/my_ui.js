//In my_ui.js
iris.ui(
    function (self) {
        self.create = function () {
            console.log("my_ui UI Created");
            self.tmpl(iris.path.my_ui.html);
        };
        self.awake = function () {   
            console.log("my_ui UI Awakened");
        };
        self.sleep = function () {
            console.log("my_ui UI Asleep");
        };

        self.destroy = function () {
            console.log("my_ui UI Destroyed");
        };
    },
    iris.path.my_ui.js
);