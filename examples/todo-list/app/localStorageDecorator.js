iris.resource(function (self) {

    var todoResource = iris.resource(iris.path.todoResource);
    var decoratorService = iris.resource(iris.path.decoratorService);

    function localStorageDecorator() {
        localStorage.todos = JSON.stringify(todoResource.toJSON());
    }


    function load() {
        if (window.localStorage.todos) {
            var todos = JSON.parse(window.localStorage.todos);
            for (var i = 0; i < todos.length; i++) {
                var todo = todos[i];
                todoResource.add(todo.text, todo.completed);
            }
        }
    }


    function addLocalStorageDecorator() {
        decoratorService.decoreFunctions(todoResource, [
            'add', 'remove', 'removeCompleted', 'setAll', 'toggle', 'setText'
        ], {post: localStorageDecorator});
    }
    

    self.init = function () {
        if (window.localStorage) {
            load();
            addLocalStorageDecorator();
        }
    }
    
	
}, iris.path.localStorageDecorator);