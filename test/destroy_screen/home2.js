
iris.screen(
    function (self) {
        self.create = function () {
            window.console.log("Home2 Screen Created");
            self.tmpl("test/destroy_screen/home2.html");
            self.screens("home3_container", [[
                "home3", "test/destroy_screen/home3.js"
            ]]);
            self.get("destroy_home").click(
                function() {
                    iris.destroyScreen("#home");
                }
                );
            self.get("goto_home3").click(
                function() {
                    iris.navigate("#home3");
                }
                );
        };
        
        self.awake = function () {
            window.console.log("Home2 Screen Awaked");
        };
        
        self.sleep = function () {
            window.console.log("Home2 Screen asleep");
            window.ok(true, "Home2 Screen asleep");
        };
        
        
        self.destroy = function () {
            window.console.log("Home2 Screen Destroyed");
            window.ok(true, "Home2 Screen Destroyed");
        };

    },
    "test/destroy_screen/home2.js");