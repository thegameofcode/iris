
iris.screen(
    function (self) {
        self.create = function () {
            window.console.log("Welcome Screen Created");
            self.tmpl("test/ui_replacement/welcome.html");
            self.screens("screens", [[
                "#main","test/ui_replacement/main.js"
            ]]);
        };

    }
    );