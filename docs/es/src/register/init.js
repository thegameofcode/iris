iris.path = {
    welcome: {js: "welcome.js", html: "welcome.html"},
    home: {js: "home.js", html: "home.html"}
};

$(document).ready(
    function () {
        iris.baseUri("./");
        iris.welcome(iris.path.welcome.js);
    }
);