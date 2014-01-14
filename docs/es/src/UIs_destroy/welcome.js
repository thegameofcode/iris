//In welcome.js
iris.screen(

    function (self) {

        self.create = function () {
            console.log("Welcome Screen Created");
            self.tmpl(iris.path.welcome.html); 

            var my_ui = null;

            self.get("create_my_ui").click(

                function() {   
                    my_ui = self.ui("container", iris.path.my_ui.js);
                }
            );

            self.get("destroy_my_ui").click(
                function() {   
                    if (my_ui != null) {
                        self.destroyUI(my_ui);
                    }
                }
            );
        };

    },
    iris.path.welcome.js  
);