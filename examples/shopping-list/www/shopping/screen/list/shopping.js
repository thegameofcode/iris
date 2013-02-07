iris.screen(
    function (self) {
        iris.translations("es_ES", {                
            SHOPPING_LIST: {
                EMPTY: "La cesta está vacía.",
                REFRESH: "Actualizar",
                REMOVE_ALL: "Borrar todos",
                CHECK_ALL: "Marcar todos",
                UNCHECK_ALL: "Desmarcar todos",
                INVERT_ALL: "Invertir",
                REMOVE_PURCHASED: "Borrar marcados",
                ORDER: "Orden",
                PRODUCT: "Producto",
                ACTION: "Acción",
                BUY: "Cambiar estado",
                REMOVE: "Borrar"
            }
        });
            
        iris.translations("en_US", {                
            SHOPPING_LIST: {
                EMPTY: "The Shopping list is empty.",
                REFRESH: "Refresh",
                REMOVE_ALL: "Remove All",
                CHECK_ALL: "Check All",
                UNCHECK_ALL: "Uncheck All",
                INVERT_ALL: "Invert checks",
                REMOVE_PURCHASED: "Remove purchased",
                ORDER: "Order",
                PRODUCT: "Product",
                ACTION: "Action",
                BUY: "Change state",
                REMOVE: "Remove"
            }
        });
            
        self.create = function () {
            
            self.tmpl(iris.path.screen.shopping.html);
            self.get("div_shopping").hide();            
            _asignEvents();
        };
                
        self.awake = function (params) {
            model.init(false, function(){
                _inflate(); 
            });
        };
        
        function _asignEvents() {
            iris.on(model.event.PRODUCTS.REMOVE, _changeVisibilityShoppingTable);
            iris.on(model.event.SHOPPING.CHANGE_STATE, _changeStateButtons);            
            
            self.get("btn_refresh").on("click", function () {
                _inflate();
            }
            );
                
            self.get("btn_remove_all").on("click", function () {
                iris.notify(model.event.SHOPPING.REMOVE_ALL);
                _inflate();
            }
            );
                
            self.get("btn_check_all").on("click", function () {
                iris.notify(model.event.SHOPPING.CHECK_ALL);
                _inflate();
            }
            );
                
            self.get("btn_uncheck_all").on("click", function () {
                iris.notify(model.event.SHOPPING.UNCHECK_ALL);
                _inflate();
            }
            );
                
            self.get("btn_invert_check").on("click", function () {
                iris.notify(model.event.SHOPPING.INVERT_CHECK);
                _inflate();
            }
            );
                
            self.get("btn_remove_checked").on("click", function () {
                iris.notify(model.event.SHOPPING.REMOVE_CHECKED);
                _inflate();
            }
            );
             
        }
        
        function _inflate() {
            self.destroyUIs("shoppingList_products");
            _destroyShoppingTable();
            _loadShoppingProducts();
            _createShoppingTable();
            _changeVisibilityShoppingTable();
        }
                        
        function _loadShoppingProducts() {
            var products = model.shoppingList.getSortedShoppingProducts();
            if (products.length > 0) {                
                $.each(products,
                    function(index, product) {
                        var ui = self.ui("shoppingList_products", iris.path.ui.product_shopping_list_item.js, {
                            "product": product,
                            "removeProduct": function() {
                                var idProduct = product.idProduct;
                                var table = self.get("shopping_table");
                                var row = $(this).closest("tr").get(0);
                                table.fnDeleteRow(table.fnGetPosition(row));
                                self.destroyUI(ui);
                                iris.notify(model.event.PRODUCTS.REMOVE, idProduct);
                            },
                            "buyProduct": function() {
                                var idProduct = product.idProduct;
                                iris.notify(model.event.SHOPPING.CHANGE_STATE, idProduct);
                            }
                        });
                    }
                    );
            }
        }
        
        function _destroyShoppingTable() {
            var table = self.get("shopping_table");
            if (table.hasOwnProperty("fnClearTable")) {
                table.fnClearTable();
                table.fnDestroy();
            }
        }
        
        function _createShoppingTable() {
            var table = self.get("shopping_table");            
            table.dataTable(
            {
                "bPaginate": true,
                "bInfo" : false,
                "bAutoWidth": false,
                "oLanguage": {
                    "sSearch": iris.translate("JQUERY.DATATABLES.SEARCH") + ":",
                    "sZeroRecords": iris.translate("SHOPPING_LIST.EMPTY"),
                    "sLengthMenu": iris.translate("JQUERY.DATATABLES.SHOW"),
                    "oPaginate": {
                        "sNext": iris.translate("JQUERY.DATATABLES.NEXT"),
                        "sPrevious": iris.translate("JQUERY.DATATABLES.PREVIOUS")
                    }
                },
                "aoColumnDefs": [
                {
                    "bSortable": false, 
                    "aTargets": [ 2 ]
                },
                {
                    "sType": "html" , 
                    "aTargets": [0]
                }
                ],
                "aaSorting": []
            }   
            );
        }
        
        function _changeVisibilityShoppingTable() {
            var products = model.shoppingList.getSortedShoppingProducts();
            if (products.length > 0) {
                self.get("div_shopping").show();
                self.get("msg").hide();
                _changeStateButtons();
            } else {
                self.get("div_shopping").hide();
                self.get("msg").show();
            }
        }
        
        function _changeStateButtons() {            
            self.get("btn_check_all").toggleClass("disabled", !model.shoppingList.hasNoPurchasedProducts()).prop("disabled", !model.shoppingList.hasNoPurchasedProducts());
            self.get("btn_uncheck_all").toggleClass("disabled", !model.shoppingList.hasPurchasedProducts()).prop("disabled", !model.shoppingList.hasPurchasedProducts());
            self.get("btn_remove_checked").toggleClass("disabled", !model.shoppingList.hasPurchasedProducts()).prop("disabled", !model.shoppingList.hasPurchasedProducts());
        }
    
        self.destroy = function () {
            iris.off(model.event.PRODUCTS.REMOVE, _changeVisibilityShoppingTable);
            iris.off(model.event.SHOPPING.CHANGE_STATE, _changeStateButtons);                
        };
        
    }, iris.path.screen.shopping.js);