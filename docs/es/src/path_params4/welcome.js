iris.screen(
    function (self) {
        self.create = function () {
            console.log("Welcome Screen Created");
            self.tmpl(iris.path.welcome.html); 
            
            self.screens("screens", [
                ["home/:year/:month", iris.path.home.js]
            ]);
        };
    },
    iris.path.welcome.js
);