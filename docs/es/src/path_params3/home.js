//In home.js
iris.screen(
    function (self) {
        self.create = function () {   
            console.log("Home Screen Created");
            self.tmpl(iris.path.home.html);
        };

        self.awake = function (params) {  
            console.log("Home Screen Awakened");
            self.get("year_parameter").text("The value of the year parameter is: " + self.params.year);
            self.get("month_parameter").text("The value of the month parameter is: " + self.params.month);
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