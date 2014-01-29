iris.resource(function (self) {

    var todoResource = iris.resource(iris.path.todoResource);
    
    function localStorageFilter(chain) {
		chain.doFilter();
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


    function addLocalStorageFilter() {
		iris.addFilter(todoResource, ['add', 'remove', 'removeCompleted', 'setAll', 'toggle', 'setText'], localStorageFilter);
    }
    

    self.init = function () {
        if (window.localStorage) {
            load();
            addLocalStorageFilter();
        }
    };
    
	
}, iris.path.localStorageFilter);