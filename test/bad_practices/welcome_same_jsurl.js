
iris.screen(
    function (self) {
        self.create = function () {
            iris.log("Welcome7 Screen Created: Same URL");

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
    iris.path.welcome_same_jsurl);