iris.screen(
    function (self) {
        self.create = function () {   
            console.log("Home Screen Created");
            self.tmpl(iris.path.home.html);
            self.get("my_ui_loader").click(
                function() {
                    self.ui("ui_container", iris.path.my_ui.js);
                }
            );
        };
        self.awake = function () {   
            console.log("Home Screen Awakened");
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