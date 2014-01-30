iris.resource(function (self) {
	
    var todos = iris.resource(iris.path.todoResource);

    function loggerFilter (chain, component_params, filter_params) {
        chain.doFilter();
		console.log(filter_params.replace(/\[params\]/, component_params[0]));
    }

    function addLoggerFilter() {
		iris.addFilter(todos, 'add', {fn : loggerFilter, params: 'Todo added'});
		iris.addFilter(todos, 'remove', {fn : loggerFilter, params: 'Todo removed'});
		iris.addFilter(todos, 'removeCompleted', {fn : loggerFilter, params: 'Completed todos removed'});
		iris.addFilter(todos, 'setAll', {fn : loggerFilter, params: 'All todos all change their state to [params]'});
		iris.addFilter(todos, 'setFilter', {fn : loggerFilter, params: 'Visibility filter changed to [params]'});
		iris.addFilter(todos, 'toggle', {fn : loggerFilter, params: 'Todo\'s state toggled'});
		iris.addFilter(todos, 'setText', {fn : loggerFilter, params: 'Todo text changed'});
    }

    self.init = addLoggerFilter;
	
}, iris.path.loggerFilter);