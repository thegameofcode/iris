
iris.screen(
    function (self) {
        self.create = function () {
            window.console.log("Home Screen Created");
            self.tmpl("test/bad_practices/home.html");
        };

    },
    "test/bad_practices/home.js");