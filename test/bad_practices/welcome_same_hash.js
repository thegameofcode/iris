
iris.screen(
    function (self) {
        self.create = function () {
            iris.log("Welcome8 Screen Created");

            self.tmpl("test/bad_practices/welcome.html");

            window.raises(function () {
                self.screens("home_screen", [
                    ["home", "test/bad_practices/home.js"],
                    ["home", "test/bad_practices/help.js"]
                ]);
            }, "Thrown an exception when two Screens have the same #hash");
            window.start();
        };

    },
    iris.path.welcome_same_hash);