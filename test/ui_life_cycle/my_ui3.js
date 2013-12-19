iris.ui(
    function (self) {
        self.create = function () {   
            iris.log("my_ui3 UI Created");  
            self.tmpl("test/ui_life_cycle/my_ui2.html");
            window.ok(true, "my_ui3 UI Created");
            self.ui("inner_ui_container", "test/ui_life_cycle/inner_ui.js");
        };

        self.awake = function (params) {  
            iris.log("my_ui3 UI Awakened");
            window.ok(true, "my_ui3 UI Awakened");
        };
        
        self.sleep = function () {  
            iris.log("my_ui3 UI Sleeping");
            window.ok(true, "my_ui3 UI Sleeping");
        };
        
        self.destroy = function () {  
            iris.log("my_ui3 UI Destroyed");
            window.ok(true, "my_ui3 UI Destroyed");
        };

    },
    "test/ui_life_cycle/my_ui3.js");