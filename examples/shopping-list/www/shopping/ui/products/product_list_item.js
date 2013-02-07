iris.ui(function(self) {	
    var product;
    self.create = function() {  
        self.tmplMode(self.APPEND);
        product = self.setting("product");
        self.tmpl(iris.path.ui.product_list_item.html, product);
        self.get("product").change(function (event) {
            if (this.checked) {
                iris.notify(model.event.PRODUCTS.ADD, product);
            } else {
                iris.notify(model.event.PRODUCTS.REMOVE, product.idProduct);
            }
        });
    };
    
    self.awake = function() {
        var p = model.shoppingList.getShoppingProduct(product.idProduct);
        if (p) {
            self.get("product").prop('checked', true);
        } else {
            self.get("product").prop('checked', false);
        }
    };
}, iris.path.ui.product_list_item.js);