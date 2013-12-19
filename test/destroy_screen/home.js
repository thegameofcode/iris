
iris.screen(
    function (self) {
        self.create = function () {
            iris.log("Home Screen Created");

            self.tmpl("test/destroy_screen/home.html");

            self.screens("home2_container", [[
                "home2", "test/destroy_screen/home2.js"
            ]]);

            self.get("destroy_home").click(
                function() {
                    iris.destroyScreen("#/home");
                }
                );
            
            self.get("goto_home2").click(
                function() {
                    iris.navigate("#/home2");
                }
                );

            window.ok(true, "Home Screen Created");
        };
        
        self.awake = function () {
            iris.log("Home Screen Awaked");
        };
        
        self.sleep = function () {
            iris.log("Home Screen asleep");
            window.ok(true, "Home Screen asleep");
        };
        
        self.destroy = function () {
            iris.log("Home Screen Destroyed");
            window.ok(true, "Home Screen Destroyed");
        };

    },
    iris.path.home);