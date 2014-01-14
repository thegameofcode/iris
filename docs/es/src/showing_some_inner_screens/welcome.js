//In welcome.js
iris.screen(

    function (self) {

        self.create = function () {
            console.log("Welcome Screen Created");
            self.tmpl(iris.path.welcome.html);
            self.screens("screens", [
                ["home", iris.path.home.js]
            ]);
            //The get method returns de JQuery element associated with the data-id parameter
            self.get("navigate_home").click( function() {
                iris.navigate("#/home"); //It browses to the Hash-URL
            });
        };

    },
    iris.path.welcome.js  
);