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
            
        self.create = function () {
            self.tmpl(iris.path.screen.shopping.html);
            self.ui("shoppingList_products", iris.path.ui.product_shopping_list.js);
            //_createShoppingTable();
            model.init(false, function() {
                ko.applyBindings(model.shoppingList, self.get("div_shopping").get(0));
            });
            
        };
                
        
    }, iris.path.screen.shopping.js);
    