iris.screen(
    function (self) {
        self.create = function () {
            window.console.log("Main4 Screen Created");
            self.tmpl("test/ui_life_cycle/main.html");
            self.get("create_my_ui").on("click",
                function () {
                    self.ui("ui_container", "test/ui_life_cycle/my_ui2.js");
                }
                );
        };
        
        self.awake = function () {
            window.console.log("Main4 Screen Awaked");
            window.setTimeout(
                function () {
                    self.get("create_my_ui").trigger("click");
                }, 500);
        };
    },
    "test/ui_life_cycle/main4.js");