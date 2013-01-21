
iris.screen(
    function (self) {
        self.create = function () {
            window.console.log("Welcome8 Screen Created");

            self.tmpl("test/bad_practices/welcome.html");

            window.raises(function () {
                self.screens("home_screen", [
                    ["#home", "test/bad_practices/home.js"],
                    ["#home", "test/bad_practices/help.js"]
                ]);
            }, "Thrown an exception when two Screens have the same #hash");
            window.start();
        };

    },
    "test/bad_practices/welcome8.js");