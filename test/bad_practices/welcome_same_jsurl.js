
iris.screen(
    function (self) {
        self.create = function () {
            window.console.log("Welcome7 Screen Created: Same URL");

            self.tmpl("test/bad_practices/welcome.html");

            window.raises(function () {
                self.screens("home_screen", [
                    ["home", "test/bad_practices/home.js"],
                    ["help", "test/bad_practices/home.js"]
                ]);
            }, "The screens has the same file js URL");


            window.start();
        };

    },
    "test/bad_practices/welcome_same_jsurl.js");