//In welcome.js
iris.screen(

    function (self) {

        self.create = function () {
            console.log("Welcome Screen Created");
            self.tmpl(iris.path.welcome.html);
            self.screens("screens", [
                ["home", iris.path.home.js],
                ["help", iris.path.help.js]
            ]);
        };

    },
    iris.path.welcome.js  
);