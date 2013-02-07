iris.screen(
    function (self) {
        
        iris.translations("es_ES", {                
            HOME: {
                TITLE: "Ejemplo de lista de la compra",
                DESC: "Este es un ejemplo de uso de"
            }
        });
            
        iris.translations("en_US", {                
            HOME: {
                TITLE: "Shopping List Iris Example",
                DESC: "This a simple example of using"
            }
        });
            
        self.create = function () {    
            self.tmpl(iris.path.screen.home.html);
        };
        
    }, iris.path.screen.home.js);