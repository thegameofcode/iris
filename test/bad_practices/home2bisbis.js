
iris.screen(
    function (self) {
        self.create = function () {
            window.console.log("Home Screen Created");
            self.tmpl("test/bad_practices/home.html");
            try {
               
                self.screens("help_container", [[
                    "#help", "test/bad_practices/help.js"
                ]]);
                window.ok(true, "There is no problem when all the #hash are diferent in all Screens");
            } catch (err) {
                window.ok(false, "An error occured"); 
            }
            window.start();
        };

    }
    );