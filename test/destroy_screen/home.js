
iris.screen(
    function (self) {
        self.create = function () {
            window.console.log("Home Screen Created");
            self.tmpl("test/destroy_screen/home.html");
            self.screens("home2_container", [{
                "#home2": "test/destroy_screen/home2.js"
            }]);
            self.get("destroy_home").click(
                function() {
                    iris.destroyScreen("#home");
                }
                );
            self.get("goto_home2").click(
                function() {
                    iris.goto("#home2");
                }
                );
            window.ok(true, "Home Screen Creared");
        };
        
        self.awake = function () {
            window.console.log("Home Screen Awaked");
            iris.deferred_home.resolve();
        };
        
        self.sleep = function () {
            window.console.log("Home Screen asleep");
            window.ok(true, "Home Screen asleep");
        };
        
        self.destroy = function () {
            window.console.log("Home Screen Destroyed");
            window.ok(true, "Home Screen Destroyed");
        };

    }
    );