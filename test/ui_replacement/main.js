
iris.screen(
    function (self) {
        self.create = function () {
            var myUI = null;
            iris.log("Main Screen Created");
            self.tmpl("test/ui_replacement/main.html");
            self.get("create_my_ui").click(
                function() {
                    self.ui("container", iris.path.my_ui);
                }
                );
            try { 
                myUI = self.ui("container", "test/ui_replacement/my_ui.js");
                window.ok($("[data-id=container]").size() === 0, "my_ui UI created");
                
            } catch (e) {
                throw "my_ui not created because this error: " + e;
            }
            
            
            window.throws(function () {
                self.ui("container", "test/ui_replacement/my_ui.js");
            }, "It is impossible to create a second UI if the tmplMode is REPLACE.");
            
            window.throws(function () {
                self.ui("container3", "test/ui_replacement/my_ui.js");
            }, "It is impossible to create a UI if the container is not exists.");
            
            
            try { 
                myUI = self.ui("container2", "test/ui_replacement/my_ui2.js");
                myUI = self.ui("container2", "test/ui_replacement/my_ui2.js");
                
                window.ok($("[data-id=container2] > div").size() === 2, "Two my_ui2 UIs created");
                
            } catch (e) {
                throw "my_ui2 not created because this error: " + e;
            }
            
            window.start();
        };
        
        
        self.awake = function () {
            iris.log("Main Screen Awaked");
        };
        
    },
    
    
    iris.path.main);