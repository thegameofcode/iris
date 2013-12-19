iris.screen(
    function (self) {
        self.create = function () {
            iris.log("Main Screen Created");
            self.tmpl("test/ui_life_cycle/main.html");
            self.ui("ui_container", "test/ui_life_cycle/my_ui.js");
            self.get("create_my_ui").click(
                function () {
                    self.ui("ui_container", "test/ui_life_cycle/my_ui.js");
                }
            );
        };
        
        self.awake = function () {
            iris.log("Main Screen Awaked");
            window.start();
        };
    },
    "test/ui_life_cycle/main.js");