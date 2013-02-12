iris.path = {
	screen : {
	    todo : { 
	    	js: "app/screen/todo_screen.js",
	    	html: "app/screen/todo_screen.html"
	    }
    },ui: {
    	todo : { 
	    	js: "app/ui/todo_item.js",
	    	html : "app/ui/todo_item.html"
	    }
    },res : {
    	todo : "app/resource/todo.js"
    }
};


$(document).ready(
    function () {
    	iris.baseUri("./");
        iris.welcome(iris.path.screen.todo.js);
    }
);
