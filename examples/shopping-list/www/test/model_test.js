/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/
(function($) {

    /*
    ======== A Handy Little QUnit Reference ========
    http://docs.jquery.com/QUnit

    Test methods:
      expect(numAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      raises(block, [expected], [message])
     */
 
    function init() {
        iris.baseUri("..");
        iris.cache(false);
        iris.enableLog("localhost");
    
        iris.path = {
            screen: {
                welcome: {
                    js: "/shopping/screen/welcome.js", 
                    html: "/shopping/screen/welcome.html"
                },
                home: {
                    js: "/shopping/screen/home.js", 
                    html: "/shopping/screen/home.html"
                },
                categories: {
                    js: "/shopping/screen/products/categories.js", 
                    html: "/shopping/screen/products/categories.html"
                },
                products: {
                    js: "/shopping/screen/products/products.js", 
                    html: "/shopping/screen/products/products.html"
                },
                shopping: {
                    js: "/shopping/screen/list/shopping.js", 
                    html: "/shopping/screen/list/shopping.html"
                }
            },
            ui: {
                category_list_item: {
                    js: "/shopping/ui/products/category_list_item.js", 
                    html: "/shopping/ui/products/category_list_item.html"
                },
                product_list_item: {
                    js: "/shopping/ui/products/product_list_item.js", 
                    html: "/shopping/ui/products/product_list_item.html"
                },
                product_shopping_list_item: {
                    js: "/shopping/ui/list/product_shopping_list_item.js", 
                    html: "/shopping/ui/list/product_shopping_list_item.html"
                }
            },
            resource: {
                js: "/shopping/resource.js"  
            }
        };
    }
    
    function clearBody() {
        var irisGeneratedCode = $("#start_iris").nextAll();
        if (irisGeneratedCode !== undefined) {
            irisGeneratedCode.remove();
        }
    }
    
    module( "Model Test", {
        setup: function() {
            iris.notify("iris-reset");
            init();
            iris.welcome(iris.path.screen.welcome.js);
        },
        teardown: function () {
            model.destroy();
            clearBody();
        }
    });
    
        asyncTest("Test addShoppingProduct() method", function() {
        window.expect(1);
        
        iris.on(iris.AFTER_NAVIGATION, function() {
            iris.off(iris.AFTER_NAVIGATION);
            model.init( function () {
                
                model.shoppingList.addShoppingProduct({
                    "idProduct":1 , 
                    "nameProduct":"Carrots"
                });
                model.shoppingList.addShoppingProduct({
                    "idProduct":15 , 
                    "nameProduct":"Bacon"
                });
                window.ok(model.shoppingList.getShoppingProducts().length === 2, "Two Prodcuts added to the Shopping List");
                window.start();
            });
        });
        
    }
    );
    
    asyncTest("Test removeShoppingProduct() method", function() {
        window.expect(1);
        
        iris.on(iris.AFTER_NAVIGATION, function() {
            iris.off(iris.AFTER_NAVIGATION);
            model.init( function () {
                model.shoppingList.addShoppingProduct({
                    "idProduct":1 , 
                    "nameProduct":"Carrots"
                });
                model.shoppingList.addShoppingProduct({
                    "idProduct":15 , 
                    "nameProduct":"Bacon"
                });
        
                model.shoppingList.removeShoppingProduct(1);
                model.shoppingList.removeShoppingProduct(20);
        
                window.ok(model.shoppingList.getShoppingProducts().length === 1, "One product removed from the Shopping List");
                window.start();
            });
        });
        
    }
    );
    
    
    asyncTest("Test getShoppingProduct() method", function() {
        window.expect(2);
        
        iris.on(iris.AFTER_NAVIGATION, function() {
            iris.off(iris.AFTER_NAVIGATION);
            model.init(function() {
                model.shoppingList.addShoppingProduct({
                    "idProduct":1 , 
                    "nameProduct":"Carrots"
                });
                model.shoppingList.addShoppingProduct({
                    "idProduct":15 , 
                    "nameProduct":"Bacon"
                });
        
        
                window.ok(model.shoppingList.getShoppingProduct(15).nameProduct === "Bacon", "Bacon product retrieved from the Shoppiing List");
                window.ok(model.shoppingList.getShoppingProduct(20) === null, "The idProduct 20 is not in the Shopping List");
                window.start();
            });
        });
        
    }
    );
        
        
    asyncTest("Test changeStateShoppingProduct() method", function() {
        window.expect(2);
        
        iris.on(iris.AFTER_NAVIGATION, function() {
            iris.off(iris.AFTER_NAVIGATION);
            model.init(function () {
                model.shoppingList.addShoppingProduct({
                    "idProduct":1 , 
                    "nameProduct":"Carrots"
                });
                model.shoppingList.addShoppingProduct({
                    "idProduct":15 , 
                    "nameProduct":"Bacon"
                });
        
                model.shoppingList.changeStateShoppingProduct(15);
        
                window.ok(model.shoppingList.getShoppingProduct(15).purchased === true, "Bacon has been purchased");
        
                model.shoppingList.changeStateShoppingProduct(15);
        
                window.ok(model.shoppingList.getShoppingProduct(15).purchased === false, "Bacon has not been purchased");
                window.start();
            });
        });
        
    }
    );
        
    

    asyncTest("Test getCategories() Method", function() {
        window.expect(1);
        iris.on(iris.AFTER_NAVIGATION, function() {
            iris.off(iris.AFTER_NAVIGATION);
            model.init(function () {
                model.resource.app.getCategories(
                    function(categories) {
                        window.ok(categories.length === 4, "Categories retrieved");
                        window.start();
                    }
                    );
            });
        }
        );
    });
        
    asyncTest("Test getProducts() Method", function() {
        window.expect(1);
        iris.on(iris.AFTER_NAVIGATION, function() {
            iris.off(iris.AFTER_NAVIGATION);
            model.init( function() {
                model.resource.app.getAllProducts(
                    function(products) {
                        window.ok(products.length === 28, "Products retrieved");
                        window.start();
                    }
                    );
            });
        }
        );
    });

    
}(jQuery));