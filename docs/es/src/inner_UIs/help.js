iris.screen(
    function (self) {
        self.create = function () {   
            self.tmpl(iris.path.help.html);
            console.log("Help Screen Created");
        };
        self.awake = function () {   
            console.log("Help Screen Awakened");
        };

        self.sleep = function () {
            console.log("Help Screen Asleep");
        };

        self.destroy = function () {
            console.log("Help Screen Destroyed");
        };
    },
    iris.path.help.js
);