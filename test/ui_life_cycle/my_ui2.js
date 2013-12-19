iris.ui(
    function (self) {
        self.create = function () {   
            iris.log("my_ui2 UI Created");  
            self.tmpl("test/ui_life_cycle/my_ui2.html");
            window.ok(true, "my_ui2 UI Created");
            self.ui("inner_ui_container", "test/ui_life_cycle/inner_ui.js");
            self.get("create_inner_ui").on("click",
                function () {
                    self.ui("inner_ui_container", "test/ui_life_cycle/inner_ui.js");
                }
                );
        };

        self.awake = function (params) {  
            iris.log("my_ui2 UI Awakened");
            window.ok(true, "my_ui2 UI Awakened");
            self.ui("inner_ui_container", "test/ui_life_cycle/inner_ui.js");
            window.setTimeout(
                function () {
                    self.get("create_inner_ui").trigger("click");
                    window.start();
                }, 500);
        };
        
        self.sleep = function () {  
            iris.log("my_ui2 UI Sleeping");
            window.ok(true, "my_ui2 UI Sleeping");
        };
        
        self.destroy = function () {  
            iris.log("my_ui2 UI Destroyed");
            window.ok(true, "my_ui2 UI Destroyed");
        };

    },
    "test/ui_life_cycle/my_ui2.js");