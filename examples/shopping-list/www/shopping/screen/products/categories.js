iris.screen(
    function (self) {
        
        function _inflate(categories) {
            $.each(categories,
                function(index, category) {						
                    self.ui("list_categories", iris.path.ui.category_list_item.js, {
                        "category": category
                    });
                }
                );
        }
        
        self.create = function () {
            self.tmpl(iris.path.screen.categories.html);
            model.init(false, function(){
                _inflate(model.categories); 
            });
        };
        
        
    }, iris.path.screen.categories.js);