
iris.screen(
    function (self) {
        self.create = function () {
            window.console.log("Help Screen Created");
            self.tmpl("test/destroy_screen/help.html");
            self.get("destroy_home").click(
                function() {
                    iris.destroyScreen("#home");
                }
            );
            
        };
        
        self.awake = function () {
            window.console.log("Help Screen Awaked");
            if (window.deferred && window.deferred.help !== undefined) {
                window.deferred.help.resolve();
            }
            
        };
    }
    
    
    );