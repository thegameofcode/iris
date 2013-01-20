iris.screen(
    function (self) {
        self.create = function () {
            window.console.log("Main2 Screen Created");
            self.tmpl("test/ui_life_cycle/main.html");
            self.get("create_my_ui").click(
                function () {
                    self.ui("ui_container", "test/ui_life_cycle/my_ui.js");
                }
                );
        };
        
        self.awake = function () {
            window.console.log("Main2 Screen Awaked");
            self.ui("ui_container", "test/ui_life_cycle/my_ui.js");
            window.start();
        };
    },
    "test/ui_life_cycle/main2.js");