iris.resource(function (self) {

    var todos = iris.resource(iris.path.todoResource);
    var decoratorService = iris.resource(iris.path.decoratorService);

    function loggerDecorator (message, params) {
        console.log(message[0].replace(/\[params\]/, params[0]));
    }

    function addLoggerDecorator() {
        todos.add = decoratorService.addDecorator(todos.add, {post: loggerDecorator}, 'Todo added');
        todos.remove = decoratorService.addDecorator(todos.remove, {post: loggerDecorator}, 'Todo removed');
        todos.removeCompleted = decoratorService.addDecorator(todos.removeCompleted, {post: loggerDecorator}, 'Completed todos removed');
        todos.setAll = decoratorService.addDecorator(todos.setAll, {post: loggerDecorator}, 'All todos all change their state to [params]');
        todos.setFilter = decoratorService.addDecorator(todos.setFilter, {post: loggerDecorator}, 'Visibility filter changed to [params]');
        todos.toggle = decoratorService.addDecorator(todos.toggle, {post: loggerDecorator}, 'Todo\'s state toggled');
        todos.setText = decoratorService.addDecorator(todos.setText, {post: loggerDecorator}, 'Todo text changed');
    }
    

    self.init = addLoggerDecorator;
	
}, iris.path.loggerDecorator);