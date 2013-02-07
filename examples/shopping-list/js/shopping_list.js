var Model = function() {
    
    var self = this;
    
    this.initialized = false;
    
    this.setCategories = function (categories) {
        this.categories = ko.observableArray(categories);
    };
    
    this.setProducts = function (products) {
        this.products = ko.observableArray(products);
    };
    
    this.event = {
        
        PRODUCTS: {
            REMOVE: "shopping:products:remove"
        },
        
        SHOPPING: {
            CHANGE_STATE: "shopping:products:change_state"
        }
    };
    
    
    function _init (force, next) {
        if (typeof force  === "function") {
            next = force;
            force = false;
        }
        if (force || !self.initialized) {
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


            iris.on(this.event.PRODUCTS.REMOVE, this.shoppingList.removeShoppingProduct);
            iris.on(this.event.PRODUCTS.ADD, this.shoppingList.addShoppingProduct);
            iris.on(this.event.SHOPPING.CHANGE_STATE, this.shoppingList.changeStateShoppingProduct);

            model.resource.app.getCategories(function(categories){
                model.setCategories(categories);
                model.resource.app.getAllProducts(function(products){
                    model.setProducts(products);
                    self.initialized = true;
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
        self.initialized = false;
        iris.off(this.event.PRODUCTS.REMOVE, this.shoppingList.removeShoppingProduct);
        iris.off(this.event.PRODUCTS.ADD, this.shoppingList.addShoppingProduct);
        iris.off(this.event.SHOPPING.CHANGE_STATE, this.shoppingList.changeStateShoppingProduct);
        this.shoppingList = null;
        model.setCategories(null);
        model.setProducts(null);
    }
    
    this.init = _init;
    this.destroy = _destroy;
    
    
    this.ShoppingList =  function () {    
       
        var _shoppingProducts = ko.observableArray([]);
        var _order = 1;
    
        function _getShoppingProducts () {
            return _shoppingProducts();
        }
        
        function _getSortedShoppingProducts() {        
            var sortedShoppingProducts = [];
            var index = 0;
            var posPurchased = 0;
            
            for (; index < _shoppingProducts().length; index++) {
                var product = _shoppingProducts()[index];                
                var purchased = product.purchased() === true;
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
                return _shoppingProducts()[i];
            }
        }
        
        function _getShoppingProductIndex(idProduct) {
            var found = false;
            var i = 0;
            while ( !found && i < _shoppingProducts().length ) {
                if (_shoppingProducts()[i].idProduct === idProduct) {
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
                var shoppingProduct = new self.ShoppingProduct(product);
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
        
        function _addOrRemoveShoppingProduct (product, isAddAction) {
            if (isAddAction) {
                _addShoppingProduct(product);
            } else {
                _removeShoppingProduct(product.idProduct);
            }
            return true;
        }
        
        function _removeAll () {
            _order = 1;
            _shoppingProducts.splice(0,_shoppingProducts().length);
        }
        
        
        function _changeStateShoppingProduct(idProduct, purchased) {
            var shoppingProduct = _getShoppingProduct(idProduct);
            if (shoppingProduct !== null) {
                if (purchased === undefined) {
                    shoppingProduct.changeState(!shoppingProduct.purchased());
                } else {               
                    shoppingProduct.changeState(purchased === true);
                }
            }
        }
        
        function _changeStateAllShoppingProducts(purchased) {                    
            for (var i = 0; i < _shoppingProducts().length; i++) {
                var product = _shoppingProducts()[i];             
                
                if (purchased === true || purchased === false) {                   
                    product.purchased (purchased);
                } else {
                    product.purchased (!product.purchased());
                }
            }
        }
        
        function _removePurchased() {            
            var i = 0;
            while (i < _shoppingProducts().length) {
                var product = _shoppingProducts()[i];                
                if (product.hasOwnProperty("purchased") && product.purchased() === true) {
                    _shoppingProducts.splice(i, 1);
                } else {
                    i++;
                }
            }
        }
        
        function _hasProducts(purchased) {
            var found = false;
            var i = 0;
            while ( !found && i < _shoppingProducts().length ) {
                if (_shoppingProducts()[i].purchased() === purchased) {
                    found = true;
                } else {
                    i++;
                }
            }
            
            return found;
        }
        
        function _countProducts(purchased) {
            var number = 0;
            for (var i = 0; i < _shoppingProducts().length; i++) {
                if (_shoppingProducts()[i].purchased() === purchased) {
                    number++;
                }
            }
            return number;
        }
        
        self.ShoppingList.prototype.getShoppingProduct = _getShoppingProduct;
        self.ShoppingList.prototype.getShoppingProducts = _getShoppingProducts;
        self.ShoppingList.prototype.getSortedShoppingProducts = _getSortedShoppingProducts;
        self.ShoppingList.prototype.getShoppingProduct = _getShoppingProduct;
        self.ShoppingList.prototype.addShoppingProduct = _addShoppingProduct;
        self.ShoppingList.prototype.removeShoppingProduct = _removeShoppingProduct;
        self.ShoppingList.prototype.addOrRemoveShoppingProduct = _addOrRemoveShoppingProduct;
        self.ShoppingList.prototype.changeStateShoppingProduct = _changeStateShoppingProduct;
        self.ShoppingList.prototype.removeAll = _removeAll;
        self.ShoppingList.prototype.checkAll = function() {
            _changeStateAllShoppingProducts(true);
        };
        self.ShoppingList.prototype.uncheckAll = function() {
            _changeStateAllShoppingProducts(false);
        };
        self.ShoppingList.prototype.invertCheck = function() {
            _changeStateAllShoppingProducts();
        };
        self.ShoppingList.prototype.removePurchased = _removePurchased;
        
        self.ShoppingList.prototype.hasPurchasedProducts = function() {
            return _hasProducts(true);
        };
        
        self.ShoppingList.prototype.hasNoPurchasedProducts = function() {            
            return _hasProducts(false);
        };
        
        self.ShoppingList.prototype.countPurchased = function() {            
            return _countProducts(true);
        };
        
    };
    
    
    
    this.ShoppingProduct = function (product) {
    
        this.order = -1;
        this.idProduct = product.idProduct;
        this.nameProduct = product.nameProduct;
        this.purchased = ko.observable(product.purchased === true);
        
        this.changeState = function(purchased) {
            this.purchased (purchased === true);
        };
        
    };
};

var model = new Model();
        
