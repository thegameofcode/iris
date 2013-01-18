
iris.screen(
    function (self) {
        self.create = function () {
            window.console.log("Main Screen Created");
            self.tmpl("test/destroy_screen/main.html");
            //window.ok(true, "Main Screen Created");
        };
        
        
        self.awake = function () {
            window.console.log("Main Screen Awaked");
        };
        
    }
    
    
    );