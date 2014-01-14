iris.path = {
    welcome: {js: "welcome.js", html: "welcome.html"},
    my_ui: {js: "my_ui.js", html: "my_ui.html"}
};

$(document).ready(
    function () {
        iris.baseUri("./");
        iris.welcome(iris.path.welcome.js);
    }
);