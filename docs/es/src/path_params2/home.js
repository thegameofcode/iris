//In home.js
iris.screen(
    function (self) {
        self.create = function () {   
            console.log("Home Screen Created");
            self.tmpl(iris.path.home.html);
            self.screens("inner_home_container", [
                ["inner_home/:year", iris.path.inner_home.js]
            ]);
        };

        self.awake = function (params) {  
            console.log("Home Screen Awakened");
            self.get("year_parameter").text("The value of the year parameter is: " + self.params.year);
        };

        self.sleep = function () {
            console.log("Home Screen Asleep");
        };

        self.destroy = function () {
            console.log("Home Screen Destroyed");
        };
    },
    iris.path.home.js
);