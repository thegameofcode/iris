iris.resource(function (self) {
	function addDecorator (fn, decorator) {
        var that = this;
        var decoratorArgs = Array.prototype.slice.call(arguments, 2); 
        return function() {
                decorator.pre && decorator.pre.call(that, decoratorArgs, arguments);
                var result = fn.apply(this, arguments);
                decorator.post && decorator.post.call(that, decoratorArgs, arguments, result);
                return result;
        };
    }

    function decoreFunctions(object, names, decorator, params) {
        names.forEach(function(name, i) {
            object[name] = addDecorator.apply(object, [].concat(object[name], decorator, params && params[i]));
        });
    }

    self.addDecorator = addDecorator;
    self.decoreFunctions = decoreFunctions;

}, iris.path.decoratorService);