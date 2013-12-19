iris.screen(
    function (self) {
        self.create = function () {
            iris.log("Main3 Screen Created");
            self.tmpl("test/ui_life_cycle/main.html");
            self.get("create_my_ui").on("click",
                function () {
                    self.ui("ui_container", "test/ui_life_cycle/my_ui.js");
                }
                );
        };
        
        self.awake = function () {
            iris.log("Main3 Screen Awaked");
            window.setTimeout(
                function () {
                    self.get("create_my_ui").trigger("click");
                    window.start();
                }, 500);
        };
    },
    "test/ui_life_cycle/main3.js");