iris.screen(
    function (self) {
        
        iris.translations("es_ES", {                
            PRODUCTS: {
                MISSING_CATEGORY: "Falta el parámetro <i>idCategoria</i>.",
                CHOOSE_PRODUCTS: "Elige los productos que te interesen"
            }
        });
            
        iris.translations("en_US", {                
            PRODUCTS: {
                MISSING_CATEGORY: "Missing <i>idCategory</i> parameter.",
                CHOOSE_PRODUCTS: "Choose some products"
            }
        });
        
        function _inflate(products) {
            
            self.get("msg").html(iris.translate("PRODUCTS.CHOOSE_PRODUCTS") + ":"); 
            $.each(products,
                function(index, product) {
                    self.ui("list_products", iris.path.ui.product_list_item.js, {
                        "product": product
                    });
                }
                );					
        }
        
        
        self.create = function () { 
            self.tmpl(iris.path.screen.products.html);
        };
       
        self.awake = function (params) {
            self.destroyUIs("list_products");
            model.resource.app.getProducts(params.idCategory, _inflate,
                function (request, textStatus, error) {
                    self.get("msg").html(iris.translate("ERROR") + ": <i>" + error + "</i>");
                }
                );

        };
    }, iris.path.screen.products.js);