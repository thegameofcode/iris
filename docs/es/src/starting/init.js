//Mandatory: It maps application URLs to iris.path object
iris.path = {
    welcome: {js: "welcome.js", html: "welcome.html"}
};

//In any Javascrit file or in a <script> section of an HTML file ... 
$(document).ready(
    function () {
        iris.baseUri("./"); //Optional: It sets de base directory of the application
        iris.welcome(iris.path.welcome.js); //It loads the behavior file of the welcome Screen
    }
);