
iris.screen(
    function (self) {
        self.create = function () {
            window.console.log("Help Screen Created");
            self.tmpl("test/ui_life_cycle/help.html");
            
        };
        
        self.awake = function () {
            window.console.log("Help Screen Awaked");
            window.start();
        };
    },
    "test/ui_life_cycle/help.js");