
iris.screen(
    function (self) {
        self.create = function () {
            window.console.log("Welcome8bis Screen Created");

            self.tmpl("test/bad_practices/welcome.html");

            self.screens("home_screen", [[
                "#home", "test/bad_practices/home.js"
            ],[
                "#help", "test/bad_practices/home.js"
            ]]);
        };

    }
    );