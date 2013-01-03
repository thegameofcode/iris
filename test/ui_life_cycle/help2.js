
iris.screen(
    function (self) {
        self.create = function () {
            window.console.log("Help2 Screen Created");
            self.tmpl("test/ui_life_cycle/help.html");
        };
        
        self.awake = function () {
            window.console.log("Help2 Screen Awaked");
            if (window.deferred && window.deferred.help) {
                window.deferred.help.resolve();
            }
        };
    }
    
    
    );