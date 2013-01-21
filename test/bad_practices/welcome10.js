
iris.screen(
    function (self) {
        self.create = function () {
            window.console.log("Welcome10 Screen Created");

            self.tmpl("test/bad_practices/welcome.html");
            
            self.screens("home_screen", [[
                "home", "test/bad_practices/home2bisbis.js"
            ]]);
        };

    },
    "test/bad_practices/welcome10.js");