var model = {}; 

(function($) {
    
    model.initialized = false; 
    model.categories = {};
    model.products = {};
    model.event = {
        
        PRODUCTS: {
            ADD: "shopping:products:add",
            REMOVE: "shopping:products:remove",
            REMOVED: "shopping:products:removed"
        },
        
        SHOPPING: {
            CHECK: "shopping:products:check",
            UNCHECK: "shopping:products:uncheck",
            CHANGE_STATE: "shopping:products:change_state",
            REMOVE_ALL: "shopping:products:remove_all",
            CHECK_ALL: "shopping:products:check_all",
            UNCHECK_ALL: "shopping:products:uncheck_all",
            INVERT_CHECK: "shopping:products:invert_check",
            REMOVE_CHECKED: "shopping:products:remove_checked"
        }
    };
    
    
    function _init (force, next) {
        if (typeof force  === "function") {
            next = force;
            force = false;
        }
        if (force || !model.initialized) {
            model.shoppingList = new model.ShoppingList();

            model.resource = iris.resource(iris.path.resource.js);

            model.resource.app = (function() {
                return {
                    getCategories: function(success, error) {
                        model.resource.load("/json/categories.json", success, error);
                    },
                    getProducts: function(idCategory, success, error) {
                        model.resource.load("/json/products_" + idCategory + ".json", success, error);
                    } ,
                    getAllProducts: function(success, error) {
                        model.resource.load("/json/products.json", success, error);
                    }
                };

            })();


            iris.on(model.event.PRODUCTS.REMOVE, model.shoppingList.removeShoppingProduct);
            iris.on(model.event.PRODUCTS.ADD, model.shoppingList.addShoppingProduct);
            iris.on(model.event.SHOPPING.CHANGE_STATE, model.shoppingList.changeStateShoppingProduct);        
            iris.on(model.event.SHOPPING.REMOVE_ALL, model.shoppingList.removeAll);
            iris.on(model.event.SHOPPING.CHECK_ALL, model.shoppingList.checkAll);
            iris.on(model.event.SHOPPING.UNCHECK_ALL, model.shoppingList.uncheckAll);        
            iris.on(model.event.SHOPPING.INVERT_CHECK, model.shoppingList.invertCheck);
            iris.on(model.event.SHOPPING.REMOVE_CHECKED, model.shoppingList.removePurchased);
            
            model.resource.app.getCategories(function(categories){
                model.categories = categories;
                model.resource.app.getAllProducts(function(products){
                    model.products = products;
                    model.initialized = true;
                    if (next) {
                        next();
                    }

                });
            });
        } else {
            if (next) {
                next();
            }
        }
    }
    
    function _destroy () {
        model.initialized = false;
        iris.off(this.event.PRODUCTS.REMOVE, this.shoppingList.removeShoppingProduct);
        iris.off(this.event.PRODUCTS.ADD, this.shoppingList.addShoppingProduct);
        iris.off(this.event.SHOPPING.CHANGE_STATE, this.shoppingList.changeStateShoppingProduct);
        this.shoppingList = null;
        model.categories = {};
        model.products = {};
    }
    
    model.init = _init;
    model.destroy = _destroy;
    
    
    model.ShoppingList =  function () {    
       
        var _shoppingProducts = [];
        var _order = 1;
    
        function _getShoppingProducts () {
            return _shoppingProducts;
        }
        
        function _getSortedShoppingProducts() {        
            var sortedShoppingProducts = [];
            var index = 0;
            var posPurchased = 0;
            
            for (; index < _shoppingProducts.length; index++) {
                var product = _shoppingProducts[index];                
                var purchased = product.purchased === true;
                var i = 0;
                var j = posPurchased;
                if (purchased) {
                    i = posPurchased;
                    j = sortedShoppingProducts.length;
                }
                
                while (i < j && sortedShoppingProducts[i].order < product.order) {
                    i++;
                }
                
                if (i < j) {
                    sortedShoppingProducts.splice(i, 0, product);                    
                } else {
                    if (purchased) {
                        sortedShoppingProducts.push(product);
                    } else {
                        sortedShoppingProducts.splice(posPurchased, 0, product);
                    }
                }
                if (!purchased) {
                    posPurchased++;
                }
            }
            
            
            return sortedShoppingProducts;
        }
        
        function _getShoppingProduct(idProduct) {
            var i = _getShoppingProductIndex(idProduct);            
            if (i === -1) {
                return null;
            } else {
                return _shoppingProducts[i];
            }
        }
        
        function _getShoppingProductIndex(idProduct) {
            var found = false;
            var i = 0;
            while ( !found && i < _shoppingProducts.length ) {
                if (_shoppingProducts[i].idProduct === idProduct) {
                    found = true;
                } else {
                    i++;
                }
            }
            
            if (found) {
                return i;
            } else {
                return -1;
            }
        }
        
        function _addShoppingProduct (product) {
            if (_getShoppingProduct(product.idProduct) === null) {
                if (product.order) {
                    if (product.order > _order) {
                        _order = product.order;
                    }
                }
                var shoppingProduct = new model.ShoppingProduct(product);
                shoppingProduct.order = _order;                
                _order++;
                _shoppingProducts.push(shoppingProduct);
                
            } else {
                throw "The product is already in the shopping list.";
            }
        }
        
        
        function _removeShoppingProduct (idProduct) {
            var i = _getShoppingProductIndex(idProduct);
            if (i >= 0) {
                _shoppingProducts.splice(i, 1);
            }
        }
        
        function _removeAll () {
            _order = 1;
            _shoppingProducts = [];
        }
        
        
        function _changeStateShoppingProduct(idProduct, purchased) {            
            var shoppingProduct = _getShoppingProduct(idProduct);
            if (shoppingProduct !== null) {
                if (purchased === undefined) {
                    shoppingProduct.changeState(!shoppingProduct.purchased);
                } else {               
                    shoppingProduct.changeState(purchased === true);
                }
            }
        }
        
        function _changeStateAllShoppingProducts(purchased) {                    
            for (var i = 0; i < _shoppingProducts.length; i++) {
                var product = _shoppingProducts[i];             
                
                if (purchased === true || purchased === false) {                   
                    product.purchased = purchased;
                } else {
                    product.purchased = !product.purchased;
                }
            }
        }
        
        function _removePurchased() {            
            var i = 0;
            while (i < _shoppingProducts.length) {
                var product = _shoppingProducts[i];                
                if (product.hasOwnProperty("purchased") && product.purchased === true) {
                    _shoppingProducts.splice(i, 1);
                } else {
                    i++;
                }
            }
        }
        
        function _hasProducts(purchased) {
            var found = false;
            var i = 0;
            while ( !found && i < _shoppingProducts.length ) {
                if (_shoppingProducts[i].purchased === purchased) {
                    found = true;
                } else {
                    i++;
                }
            }
            
            return found;
        }
        
        function _countProducts(purchased) {
            var number = 0;
            for (var i = 0; i < _shoppingProducts.length; i++) {
                if (_shoppingProducts[i].purchased === purchased) {
                    number++;
                }
            }
            return number;
        }
             
        model.ShoppingList.prototype.getShoppingProducts = _getShoppingProducts;
        model.ShoppingList.prototype.getSortedShoppingProducts = _getSortedShoppingProducts;
        model.ShoppingList.prototype.getShoppingProduct = _getShoppingProduct;
        model.ShoppingList.prototype.addShoppingProduct = _addShoppingProduct;
        model.ShoppingList.prototype.removeShoppingProduct = _removeShoppingProduct;
        model.ShoppingList.prototype.changeStateShoppingProduct = _changeStateShoppingProduct;
        model.ShoppingList.prototype.removeAll = _removeAll;
        model.ShoppingList.prototype.checkAll = function() {
            _changeStateAllShoppingProducts(true);
        };
        model.ShoppingList.prototype.uncheckAll = function() {
            _changeStateAllShoppingProducts(false);
        };
        model.ShoppingList.prototype.invertCheck = function() {
            _changeStateAllShoppingProducts();
        };
        model.ShoppingList.prototype.removePurchased = _removePurchased;
        
        model.ShoppingList.prototype.hasPurchasedProducts = function() {
            return _hasProducts(true);
        };
        
        model.ShoppingList.prototype.hasNoPurchasedProducts = function() {            
            return _hasProducts(false);
        };
        
        model.ShoppingList.prototype.countPurchased = function() {            
            return _countProducts(true);
        };
        
    };
    
    
    
    model.ShoppingProduct = function (product) {
    
        this.order = -1;
        this.idProduct = product.idProduct;
        this.nameProduct = product.nameProduct;
        this.purchased = product.purchased === true;
        
        this.changeState = function(purchased) {
            this.purchased = purchased === true;
        };
        
    };
    
})(jQuery);