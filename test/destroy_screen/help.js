
iris.screen(
    function (self) {
        self.create = function () {
            iris.log("Help Screen Created");
            self.tmpl("test/destroy_screen/help.html");
            self.get("destroy_home").click(
                function() {
                    iris.destroyScreen("home");
                }
            );
            
        };
        
        self.awake = function () {
            iris.log("Help Screen Awaked");
            
        };
    },
    
    
    iris.path.help);