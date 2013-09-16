iris.ui(function(self) {	
    
    self.create = function() {
        self.tmplMode(self.APPEND);
        var category = self.setting("category");
        self.tmpl(iris.path.ui.category_list_item.html);
        category.url = '#/products?idCategory=' + category.idCategory;
        self.inflate(category);
    };	
    
}, iris.path.ui.category_list_item.js);