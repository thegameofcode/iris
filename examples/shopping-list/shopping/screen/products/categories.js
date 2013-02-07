iris.screen(
function (self) {
    self.create = function () {
        self.tmpl("/shopping/screen/products/categories.html");
        model.init(false, function() {
            self.ui("list_products", "/shopping/ui/products/products.js");            
            ko.applyBindings(model, self.get("list_categories").get(0));
        });
    };  
}, "/shopping/screen/products/categories.js");