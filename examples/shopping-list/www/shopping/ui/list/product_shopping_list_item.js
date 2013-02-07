iris.ui(function(self) {	
    self.create = function() {
        self.tmplMode(self.APPEND);
        var product = self.setting("product");                
        self.tmpl(iris.path.ui.product_shopping_list_item.html, product);
        if (product.purchased === true) {
            self.get("order").addClass("purchased");
            self.get("nameProduct").addClass("purchased");
            self.get("icon-shopping-cart").removeClass("icon-shopping-cart").addClass("icon-shopping-cart-remove");
        }
        self.get("remove").on("click", self.setting("removeProduct"));
        self.get("buy").on("click",
            function () {
                (self.setting("buyProduct"))();
                self.get("order").toggleClass("purchased");
                self.get("nameProduct").toggleClass("purchased");
                self.get("icon-shopping-cart").toggleClass("icon-shopping-cart icon-shopping-cart-remove");
            }
            );
    };
    
    self.destroy = function () {
        self.get("remove").off("click");
        self.get("buy").off("click");
    };
}, iris.path.ui.product_shopping_list_item.js);