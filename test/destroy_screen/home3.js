
iris.screen(
    function (self) {
        self.create = function () {
            iris.log("Home3 Screen Created");
            self.tmpl("test/destroy_screen/home3.html");
            self.get("destroy_home").click(
                function() {
                    iris.destroyScreen("#home");
                }
                );
        };
        
        
        self.awake = function () {
            iris.log("Home3 Screen Awaked");
        };
        
        self.sleep = function () {
            iris.log("Home3 Screen asleep");
            window.ok(true, "Home3 Screen asleep");
        };
        
        
        
        self.destroy = function () {
            iris.log("Home3 Screen Destroyed");
            window.ok(true, "Home3 Screen Destroyed");
        };

    },
    iris.path.home3);