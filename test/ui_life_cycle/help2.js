
iris.screen(
    function (self) {
        self.create = function () {
            iris.log("Help2 Screen Created");
            self.tmpl("test/ui_life_cycle/help.html");
        };
        
        self.awake = function () {
            iris.log("Help2 Screen Awaked");
        };
    },
    "test/ui_life_cycle/help2.js");