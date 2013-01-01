
iris.screen(
    function (self) {
        self.create = function () {
            window.console.log("Home3 Screen Created");
            self.tmpl("test/destroy_screen/home3.html");
            self.get("destroy_home").click(
                function() {
                    iris.destroyScreen("#home");
                }
                );
        };
        
        
        self.awake = function () {
            window.console.log("Home3 Screen Awaked");
            iris.deferred_home3.resolve();
        };
        
        
        self.destroy = function () {
            window.console.log("Home3 Screen Destroyed");
            window.ok(true, "Home3 Screen Destroyed");
        };

    }
    );