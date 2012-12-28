
iris.screen(
    function (self) {
        self.create = function () {
            window.console.log("Welcome Screen Created");
            self.tmpl("test/bad_practices/welcome.html");
            
            self.screens("home_screen", [{
                "#home": "test/bad_practices/home.js"
            }, {
                "#help": "test/bad_practices/help.js"
            }]);
            
            window.throws(function () {
                self.ui("home_screen", "test/bad_practices/my_ui.js");
            }, "Thrown an exception when a container is reused");
            
            
            try {
                self.ui("help_screen", "test/bad_practices/my_ui.js");
                window.ok(true, "There is no problem the UI uses a diferent container");
            } catch (err) {
                window.ok(false, "An error occured"); 
            }
            
            window.start();
            
            
        };

    }
    );