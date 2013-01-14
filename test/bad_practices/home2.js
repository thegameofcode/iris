
iris.screen(
    function (self) {
        self.create = function () {
            window.console.log("Home Screen Created");
            self.tmpl("test/bad_practices/home.html");
            window.throws(function () {
                self.screens("help_container", [[
                    "#help", "test/bad_practices/help.js"
                ]]);
            }, "This works even when the duplicated #hash is registered in a different Screen.");
            window.start();
        };

    }
    );