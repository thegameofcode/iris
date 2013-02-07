iris.resource(function(self){
    self.load = function (path, success, error) {
        self.get(iris.baseUri() + path, success, error);
    };
}, "/shopping/resource.js");