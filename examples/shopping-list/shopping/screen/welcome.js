iris.screen(
    function (self) {	
        function _ajaxPrepare() {
            $.ajaxPrefilter(function( options, originalOptions, jqXHR ) {            
                //self.get("screens").hide();
                self.get("loading").show();                
                jqXHR.always(function() {
                    self.get("loading").hide();
                //self.get("screens").show();
                });            
            });                
        }
            
        function _createScreens() {
            self.screens("screens", [
                ["home", "/shopping/screen/home.js"],
                ["categories", "/shopping/screen/products/categories.js"],
                ["shopping", "/shopping/screen/list/shopping.js"]
                ]);
        }
        
        function _changeLang(link) {
            var regExp = /[?&]lang=[a-z][a-z][\-_][A-Z][A-Z]/;
            var lang = window.location.href.match(regExp);
            var url = window.location.href;
            var hash = window.location.hash;
            if ( lang === null) {
                lang = "lang=" + link.data("lang");
                if (window.location.href.match(/[?]/)) {
                    lang = "&" + lang;                            
                } else {
                    lang = "?" + lang;
                }
                url = url.substr(0, url.indexOf(hash));
                url += lang;
                url += hash;
            } else {
                var first = lang[0].substr(0,6);
                url = window.location.href.replace(regExp, first + link.data("lang"));                       
            }
            window.location.href = url;
        }
            
            
        iris.translations("es_ES", {    
            LOADING: "Cargando...",
            MENU: {
                WELCOME: "Ejemplo de lista de la compra",
                HOME: "Incio",
                PRODUCTS: "Productos",
                SHOPPING_LIST: "Lista de la compra"
            }
        });
            
        iris.translations("en_US", {
            LOADING: "Loading...",
            MENU: {
                WELCOME: "Shopping List Example",
                HOME: "Home",
                PRODUCTS: "Products",
                SHOPPING_LIST: "Shopping List"
            }
        });
        
        self.create = function () {
            
            self.tmpl("/shopping/screen/welcome.html");
            
            _ajaxPrepare();
            
            _createScreens();
            
            $("[data-lang]").click(
                function (event) {
                    _changeLang($(this));
                    event.preventDefault();
                }
                );
            
            
            if ( !document.location.hash ) {                
                iris.navigate("#/home"); //Default page
            }
        };
        
        
    } , "/shopping/screen/welcome.js");
