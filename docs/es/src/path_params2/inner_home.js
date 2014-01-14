//In inner_home.js
iris.screen(
    function (self) {
        self.create = function () {   
            console.log("Inner Home Screen Created");
            self.tmpl(iris.path.inner_home.html);
        };

        self.awake = function (params) {  
            console.log("Inner Home Screen Awakened");
            self.get("year_parameter").text("The value of the year parameter is: " + self.params.year);
        };

        self.sleep = function () {
            console.log("Inner Home Screen Asleep");
        };

        self.destroy = function () {
            console.log("Inner Home Screen Destroyed");
        };
    },
    iris.path.inner_home.js
);