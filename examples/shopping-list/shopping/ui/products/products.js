iris.ui(function(self) {	
    self.create = function() {  
        self.tmplMode(self.APPEND);
        self.tmpl("/shopping/ui/products/products.html");
        
        /*Alternative to data-bind in products.html
        *   $("[data-id='product']").live("click", function(event) {
        *        return model.shoppingList.addOrRemoveShoppingProduct(ko.dataFor(this), event.target.checked);
        *    });
        */
    };
}, "/shopping/ui/products/products.js");