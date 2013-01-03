
iris.screen(
    function (self) {
        self.create = function () {
            window.console.log("Welcome Screen Created");
            self.tmpl("test/destroy_screen/welcome.html");
            self.screens("screens", [{
                "#home": "test/destroy_screen/home.js"
            }, {
                "#help": "test/destroy_screen/help.js"
            }, {
                "#main": "test/destroy_screen/main.js"
            }]);
            self.get("destroy_home").click(
                function() {
                    iris.destroyScreen("#home");
                }
                );
        };

    }
    );