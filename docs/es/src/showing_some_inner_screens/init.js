iris.path = {
    welcome: {js: "welcome.js", html: "welcome.html"},
    home: {js: "home.js", html: "home.html"},
    help: {js: "help.js", html: "help.html"},
    inner_home: {js: "inner_home.js", html: "inner_home.html"}
};

$(document).ready(
    function () {
        iris.baseUri("./");
        iris.welcome(iris.path.welcome.js);
    }
);