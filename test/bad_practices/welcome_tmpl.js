
iris.screen(
    function (self) {
        self.create = function () {
            window.console.log("Welcome Screen Created");
            self.tmpl("test/bad_practices/welcome.html");
            
            window.raises(function () {
                self.tmpl("test/bad_practices/welcome.html");
            }, "Thrown an exception when multiple calls happen");

            window.start();
        };

    },
    iris.path.welcome_tmpl);