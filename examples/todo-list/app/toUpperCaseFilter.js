iris.resource(function (self) {
	
    var todos = iris.resource(iris.path.todoResource);

    function toUpperCaseFilter (chain, component_params, filter_params) {
		component_params[0] = component_params[0].toUpperCase();
		chain.doFilter();
    }

    function addToUpperCaseFilter() {
		iris.addFilter(todos, 'add', toUpperCaseFilter);
		iris.addFilter(todos, 'setText', toUpperCaseFilter);
    }

    self.init = addToUpperCaseFilter;
	
}, iris.path.toUpperCaseFilter);