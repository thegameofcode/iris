iris.screen(function(self) {

  self.todos = [
    { text: 'learn iris', done: true },
    { text: 'build an iris app', done: false }
  ];
 
  self.create = function() {
    self.tmpl(iris.path.screen.welcome.html);

    self.get('archive').on('click', function (e) {
      for ( var i = self.todos.length - 1; i >= 0; i-- ) {
        if (self.todos[i].done) self.todos.splice(i, 1);
      }
      self.render();
    });

    self.get('add').on('click', function (e) {
      var todo = { text: self.get('todoText').val(), done: false };
      self.todos.push(todo);
      self.get('todoText').val('');
      self.render();
    });

    self.render();
  };

  self.render = function () {
    self.destroyUIs('list');

    var i, remaining = 0;
    for ( i = 0; i < self.todos.length; i++ ) {
      self.ui('list', iris.path.ui.todo.js, { index: i, parent: self }, self.APPEND);
      remaining += self.todos[i].done ? 0 : 1;
    }

    self.inflate({
      count: remaining + ' of ' + self.todos.length + ' remaining'
    });
  }
 
}, iris.path.screen.welcome.js);
