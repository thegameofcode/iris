iris.screen(
    function (self) {
        var myUI = null;
        self.create = function () {
            window.console.log("Main6 Screen Created");
            self.tmpl("test/ui_life_cycle/main.html");
            myUI = self.ui("ui_container", "test/ui_life_cycle/my_ui3.js");
        };
        
        self.awake = function () {
            window.console.log("Main6 Screen Awaked");
            self.destroyUI(myUI);
            window.start();
        };
    },
    "test/ui_life_cycle/main6.js");