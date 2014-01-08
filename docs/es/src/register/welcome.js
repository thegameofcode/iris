//In welcome.js
iris.screen(

    function (self) {

        self.create = function () {
            console.log("Welcome Screen Created");
            self.tmpl(iris.path.welcome.html);
            self.screens("screens", [
                ["home", iris.path.home.js]
            ]
        )};

        self.awake = function () {
            console.log("Welcome Screen Awakened");
        };

        self.sleep = function () {
            console.log("Welcome Screen Asleep"); //Never called
        };

        self.destroy = function () {
            console.log("Welcome Screen Destroyed");//Never called
        };

    },
    iris.path.welcome.js  
);