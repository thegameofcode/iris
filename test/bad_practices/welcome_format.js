
iris.screen(
    function (self) {
        self.create = function () {
            iris.log("Welcome Screen Created");
            self.tmpl("test/bad_practices/welcome.html");

            self.screens("home_screen", [[
                "home", "test/bad_practices/home.js"
            ]]);
            window.ok(true, "Correct Format");
            window.start();
        };

    },
    iris.path.welcome_format);