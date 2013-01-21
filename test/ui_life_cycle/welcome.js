
iris.screen(
    function (self) {
        self.create = function () {
            window.console.log("Welcome Screen Created");
            self.tmpl("test/ui_life_cycle/welcome.html");
            self.screens("screens", [[
                "main","test/ui_life_cycle/main.js"
            ], [
                "main2","test/ui_life_cycle/main2.js"
            ], [
                "main3","test/ui_life_cycle/main3.js"
            ], [
                "main4","test/ui_life_cycle/main4.js"
            ], [
                "main5","test/ui_life_cycle/main5.js"
            ], [
                "main6","test/ui_life_cycle/main6.js"
            ], [
                "help","test/ui_life_cycle/help.js"
            ], [
                "help2","test/ui_life_cycle/help2.js"
            ]]);
        };
        
        self.awake = function () {
            window.console.log("Welcome Screen Awaked");
        };

    },
    "test/ui_life_cycle/welcome.js");