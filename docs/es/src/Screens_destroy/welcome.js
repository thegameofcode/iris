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

            self.get("create_home_screen").click(
                function() {   
                    iris.navigate("#/home");
                }
            );

            self.get("destroy_home_screen").click(
                function() {   
                    iris.destroyScreen("#/home");
                }
            );
        };

    },
    iris.path.welcome.js  
);