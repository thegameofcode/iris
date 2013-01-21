
iris.screen(
    function (self) {
        self.create = function () {
            window.console.log("Help Screen Created");
            self.tmpl("test/destroy_screen/help.html");
            self.get("destroy_home").click(
                function() {
                    iris.destroyScreen("home");
                }
            );
            
        };
        
        self.awake = function () {
            window.console.log("Help Screen Awaked");
            
        };
    },
    
    
    "test/destroy_screen/help.js");