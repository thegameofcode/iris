//In inner_home.js
iris.screen(
    function (self) {
        self.create = function () {   
            self.tmpl(iris.path.inner_home.html);
            console.log("Inner_home Screen Created");
        };
        self.awake = function () {   
            console.log("Inner_home Screen Awakened");
        };

        self.sleep = function () {
            console.log("Inner_home Screen Asleep");
        };

        self.destroy = function () {
            console.log("Inner_home Screen Destroyed");
        };
    },
    iris.path.inner_home.js
);