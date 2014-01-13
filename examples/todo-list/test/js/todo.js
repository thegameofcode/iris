//in todos.js
QUnit.testStart(function() {
	todos.reset();
	todos.add("Go to the class");
	todos.add("Go to the doctor");
});

test("addTodo Test", function() {
	var count = todos.count();
	todos.add("Do my homework");
	ok(todos.count().total === count.total + 1, "Added one todo");
	ok(todos.count().remaining === count.remaining + 1, "Added one remaining todo");
	ok(todos.count().completed === count.completed, "The completed todos stay the same");
});

test("getTodo Test", function() {
	var id = todos.add("Go to the cinema");
	ok(todos.getTodo(id).id === id, "Todo retrieved"); 
});

test("delTodo Test", function() {
	var id = todos.add("Go to the class");
	var count = todos.count();
	var todo = todos.getTodo(id);
	todos.remove(id);
	window.throws(function() {
		todos.getTodo(id);
	}, "Todo has been deleted");
	ok(todos.count().total === count.total - 1, "Deleted one todo");
	ok(todos.count().remaining === count.remaining - 1, "Deleted one remaining todo");
	ok(todos.count().completed === count.completed, "The completed todos stay the same");
	
});


test("updateTodo Test", function() {
	var id = todos.add("Go to the class");
	ok(todos.getTodo(id).text === "Go to the class", "Before: Todo has the correct text");
	todos.edit(id, "Snap");
	ok(todos.getTodo(id).text === "Snap", "After: Todo has the correct text");
});

test("checkTodo Test", function() {
	var id = todos.add("Go to the class");
	var count = todos.count();
	ok(todos.getTodo(id).completed === false, "Before: Todo has not been completed");
	todos.toggle(id);
	ok(todos.getTodo(id).completed === true, "After: Todo has been completed");
	ok(todos.count().total === count.total, "The todos number stay the same");
	ok(todos.count().remaining === count.remaining - 1, "There is one remaining todo less");
	ok(todos.count().completed === count.completed + 1, "There is one completed todo more");
	todos.toggle(id);
	ok(todos.getTodo(id).completed === false, "After: Todo has not been completed");
	ok(todos.count().total === count.total, "The todos number stay the same");
	ok(todos.count().remaining === count.remaining, "There is one remaining todo more");
	ok(todos.count().completed === count.completed, "There is one completed todo less");
});

test("checkAll Test", function() {
	var id = todos.add("Go to the class");
	var count = todos.count();
	ok(todos.getTodo(id).completed === false, "Before: Todo has not been completed");
	todos.setAll(true);
	ok(todos.getTodo(id).completed === true, "After: Todo has been completed");
	ok(todos.count().total === count.total, "The todos number stay the same");
	ok(todos.count().remaining === 0, "There are no remaining todos");
	ok(todos.count().completed === todos.count().total, "All todos are completed");
});

test("delChecked Test", function() {
	var id = todos.add("Go to the class");
	var id2 = todos.add("Go to the doctor");
	var count = todos.count();
	todos.toggle(id2);
	todos.removeCompleted();
	window.throws(function() {
		todos.getTodo(id2);
	}, "Todo has been deleted");
	ok(todos.count().total === count.total - 1, "There is one todo less");
	ok(todos.count().remaining === todos.count().total, "All todos are pending");
	ok(todos.count().completed === 0, "There are no completed todos");
});


test("filterTodos Test", function() {
	var id = todos.add("Go to the class");
	todos.setFilter('all');
	ok(todos.getTodo(id).visible === true, "Filter all: Any todo is visible");
	todos.toggle(id);
	ok(todos.getTodo(id).visible === true, "Filter all: Any todo is visible");
	todos.setFilter('completed');
	ok(todos.getTodo(id).visible === true, "Filter completed: Completed todos are visible");
	todos.toggle(id);
	ok(todos.getTodo(id).visible === false, "Filter completed: Remaining todos are invisible");
	todos.setFilter('active');
	ok(todos.getTodo(id).visible === true, "Filter active: Remaining todos are visible");
	todos.toggle(id);
	ok(todos.getTodo(id).visible === false, "Filter completed: Completed todos are invisible");	
	todos.setFilter('bad');
	ok(todos.getTodo(id).visible === false, "Filter bad: All todos are invisible");
	todos.toggle(id);
	ok(todos.getTodo(id).visible === false, "Filter bad: All todos are invisible");
});