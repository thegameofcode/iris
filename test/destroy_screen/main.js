
iris.screen(
    function (self) {
        self.create = function () {
            iris.log("Main Screen Created");
            self.tmpl("test/destroy_screen/main.html");
            //window.ok(true, "Main Screen Created");
        };
        
        
        self.awake = function () {
            iris.log("Main Screen Awaked");
        };
        
    },
    
    iris.path.main);
    