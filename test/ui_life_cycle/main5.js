iris.screen(
    function (self) {
        self.create = function () {
            window.console.log("Main5 Screen Created");
            self.tmpl("test/ui_life_cycle/main.html");
            self.ui("ui_container", "test/ui_life_cycle/my_ui3.js");
        };
        
        self.awake = function () {
            window.console.log("Main5 Screen Awaked");
        };
    },
    "test/ui_life_cycle/main5.js");