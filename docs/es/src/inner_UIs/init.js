iris.path = {
    welcome: {js: "welcome.js", html: "welcome.html"},
    home: {js: "home.js", html: "home.html"},
    help: {js: "help.js", html: "help.html"},
    my_ui: {js: "my_ui.js", html: "my_ui.html"},
    inner_ui: {js: "inner_ui.js", html: "inner_ui.html"}
};

$(document).ready(
    function () {
        iris.baseUri("./");
        iris.welcome(iris.path.welcome.js);
    }
);