
iris.screen(
    function (self) {
        self.create = function () {
            iris.log("Welcome Screen Created");
            self.tmpl("test/destroy_screen/welcome.html");
            self.screens("screens", [[
                "home", iris.path.home
            ], [
                "help", iris.path.help
            ], [
                "main", iris.path.main
            ]]);
            self.get("destroy_home").click(
                function() {
                    iris.destroyScreen("#home");
                }
                );
        };

    },
    iris.path.welcome);