iris.resource(function (self) {
	
    var todos = iris.resource(iris.path.todoResource);

    function checkTodoFilter (chain, component_params, filter_params) {
		if (!component_params || component_params[0].length < 5 || component_params[0].length > 30) {
			var msg = "The todo length must be between 5 and 30";
			console.error(msg);
			alert(msg);
		} else {
			chain.doFilter();
		}
    }

    function addCheckTodoFilter() {
		iris.addFilter(todos, 'add', checkTodoFilter);
		iris.addFilter(todos, 'setText', checkTodoFilter);
    }

    self.init = addCheckTodoFilter;
	
}, iris.path.checkTodoFilter);