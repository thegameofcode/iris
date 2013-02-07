iris.path = {
    welcome : "app/screen/welcome.js",
    welcome_tmpl : "app/screen/welcome.html",
    todo_item : "app/ui/todo_item.js",
    todo_item_tmpl : "app/ui/todo_item.html"
};


$(document).ready(
    function () {
        iris.welcome(iris.path.welcome);
    }
);
