
iris.screen(
    function (self) {
        self.create = function () {
            iris.log("Welcome Screen Created");
            self.tmpl(iris.path.welcome_tmpl);
            
            window.raises(function () {
                self.tmpl("test/bad_practices/welcome.html");
            }, "Thrown an exception when multiple calls happen");

            window.start();
        };

    },
    iris.path.welcome_calls_tmpl);