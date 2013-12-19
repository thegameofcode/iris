
iris.screen(
    function (self) {
        self.create = function () {
            iris.log("Welcome Screen Created");
            self.tmpl(iris.path.welcome_tmpl);
            window.start();
        };

    },
    iris.path.welcome);