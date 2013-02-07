iris.ui(function(self) {	
    self.create = function() {
        self.tmplMode(self.APPEND);               
        self.tmpl("/shopping/ui/list/product_shopping_list.html");
    };
}, "/shopping/ui/list/product_shopping_list.js");