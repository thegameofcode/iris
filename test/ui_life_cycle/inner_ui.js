iris.ui(
    function (self) {
        self.create = function () {   
            window.console.log("inner_ui UI Created");  
            self.tmplMode(self.APPEND);
            self.tmpl("test/ui_life_cycle/inner_ui.html");
            window.ok(true, "inner_ui UI Created");
        };

        self.awake = function (params) {  
            window.console.log("inner_ui UI Awakened");
            window.ok(true, "inner_ui UI Awakened");
        };
        
        
        self.sleep = function () {  
            window.console.log("inner_ui UI Sleeping");
            window.ok(true, "inner_ui UI Sleeping");
        };
        
        self.destroy = function () {  
            window.console.log("inner_ui UI Destroyed");
            window.ok(true, "inner_ui UI Destroyed");
        };
    }
    );