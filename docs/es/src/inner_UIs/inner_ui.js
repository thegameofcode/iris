iris.ui(
    function (self) {
        self.create = function () {
            console.log("inner_ui UI Created");
            self.tmpl(iris.path.inner_ui.html);
        };

        self.awake = function () {   
            console.log("inner_ui UI Awakened");
        };

        self.sleep = function () {
            console.log("inner_ui UI Asleep");
        };

        self.destroy = function () {
            console.log("inner_ui UI Destroyed");
        };
    },
    iris.path.inner_ui.js
);