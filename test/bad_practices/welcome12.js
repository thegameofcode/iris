
iris.screen(
    function (self) {
        self.create = function () {
            window.console.log("Welcome12 Screen Created :(");

            self.tmpl("test/bad_practices/welcome.html");
            
            self.screens("home_screen", [
                ["#home", "test/bad_practices/home.js"],
                ["#help", "test/bad_practices/help.js"]
            ]);

            // There is no problem the UI uses a diferent container
            self.ui("help_screen", "test/bad_practices/my_ui.js");
            
            window.throws(function () {
                self.ui("home_screen", "test/bad_practices/my_ui.js");
            }, "Thrown an exception when the screen container is reused");

            window.start();
            
        };
    }
);