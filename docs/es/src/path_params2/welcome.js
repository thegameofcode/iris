iris.screen(
    function (self) {
        self.create = function () {
            console.log("Welcome Screen Created");
            self.tmpl(iris.path.welcome.html); 
            self.screens("screens", [
                ["home/:year", iris.path.home.js]
            ]);
        };

        self.awake= function (params) {
            console.log("Welcome Screen Awaked");
        };

        self.sleep = function () {
            console.log("Welcome Screen Asleep");
        };

        self.destroy = function () {
            console.log("Welcome Screen Destroyed");
        };
    },
    iris.path.welcome.js
);