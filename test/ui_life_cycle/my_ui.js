iris.ui(
    function (self) {
        self.create = function () {   
            window.console.log("my_ui UI Created");  
            self.tmpl("test/ui_life_cycle/my_ui.html");
            window.ok(true, "my_ui UI Created");
        };

        self.awake = function (params) {  
            window.console.log("my_ui UI Awakened");
            window.ok(true, "my_ui UI Awakened");
        };
    },
    "test/ui_life_cycle/my_ui.js");